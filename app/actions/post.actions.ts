"use server";

import { z } from "zod";

import { db } from "@/drizzle";
import { posts, postsRelations, users } from "@/schema";
import { getSession } from "../utils/auth-utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

const CreatePostSchema = z.object({
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

  const parsedData = CreatePostSchema.safeParse({
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
