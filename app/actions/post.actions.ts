"use server";

import { z } from "zod";

import { db } from "@/db/drizzle";
import { posts } from "@/db/schema";
import { getSession } from "../utils/auth-utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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

  try {
    await db
      .insert(posts)
      .values({
        ...parsedData.data,
        userId,
        id: crypto.randomUUID(),
      })
      .run();

    revalidatePath("/");
    redirect("/");
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Post.",
      status: "error",
    };
  }
}

export const getPosts = async () => {
  return db.select().from(posts).all();
};
