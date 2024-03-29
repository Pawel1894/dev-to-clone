"use server";

import { z } from "zod";

import { db } from "@/drizzle";
import { posts, postsRelations, users } from "@/schema";
import { getSession } from "../utils/auth-utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

const PostSchema = z.object({
  title: z.string().min(1, "Title must be at least 1 character long"),
  content: z.string().min(1, "Content must be at least 1 character long"),
});

export type PostFormState = {
  errors?: {
    title?: string[];
    content?: string[];
  };
  message?: string | null;
  status: "success" | "error" | "idle";
};

export async function createPost(prevState: PostFormState, formData: FormData): Promise<PostFormState> {
  const session = await getSession();
  const userId = session?.user?.id;

  if (!userId) throw new Error("User not found");

  const parsedData = PostSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  });

  if (!parsedData.success) {
    return {
      errors: parsedData.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Post.",
      status: "error",
    };
  }

  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });

  if (!user) {
    return {
      message: "User not found",
      status: "error",
    };
  }

  try {
    await db
      .insert(posts)
      .values({
        ...parsedData.data,
        author: user.id,
        id: crypto.randomUUID(),
      })
      .run();
  } catch (error) {
    console.error("Database Error: Failed to Create Post.", error);
    return {
      message: "Database Error: Failed to Create Post.",
      status: "error",
    };
  }

  revalidatePath("/");
  redirect("/");
}

export const getPosts = async () => {
  return db.select().from(posts).all();
};

export const getPost = async (id: string) => {
  return await db.query.posts.findFirst({
    where: eq(posts.id, id),
    with: {
      author: true,
    },
  });
};

export const getMyPosts = async () => {
  const session = await getSession();
  const userId = session?.user?.id;

  if (!userId) {
    return [];
  }

  return db.query.posts.findMany({
    where: eq(posts.author, userId),
  });
};

export const deletePost = async (id: string) => {
  await db.delete(posts).where(eq(posts.id, id)).run();

  revalidatePath("/post/my-posts");
};

export async function updatePost(
  postId: string,
  prevState: PostFormState,
  formData: FormData
): Promise<PostFormState> {
  const session = await getSession();
  const userId = session?.user?.id;

  if (!userId) throw new Error("User not found");

  const parsedData = PostSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  });

  if (!parsedData.success) {
    return {
      errors: parsedData.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update Post.",
      status: "error",
    };
  }

  try {
    await db
      .update(posts)
      .set({
        ...parsedData.data,
      })
      .where(eq(posts.id, postId))
      .run();
  } catch (error) {
    return {
      message: "Database Error: Failed to Update Post.",
      status: "error",
    };
  }

  revalidatePath("/post/my-posts");
  redirect("/post/my-posts");
}
