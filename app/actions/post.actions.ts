"use server";

import { z } from "zod";

import { db } from "@/db/drizzle";
import { posts } from "@/db/schema";
import { getSession } from "../utils/auth-utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const CreatePostSchema = z.object({
  title: z.string(),
  content: z.string(),
});

export const createPost = async (formData: FormData) => {
  const session = await getSession();
  const userId = session?.user?.id;

  if (!userId) throw new Error("User not found");

  const parsedData = CreatePostSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  });

  if (!parsedData.success) throw new Error("Invalid form data");

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
};

export const getPosts = async () => {
  return db.select().from(posts).all();
};
