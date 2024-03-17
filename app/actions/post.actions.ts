"use server";

import { db } from "@/db/drizzle";
import { posts } from "@/db/schema";
import { getSession } from "../utils/auth-utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createPost = async () => {
  const session = await getSession();
  const userId = session?.user?.id;

  if (!userId) throw new Error("User not found");

  await db
    .insert(posts)
    .values({
      title: "New Post",
      content: "XD",
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
