"use server";

import { db } from "../../db/drizzle";
import { InsertUser, users } from "../../db/schema";

export const insertUser = async (user: InsertUser) => {
  try {
    return await db.insert(users).values(user).returning();
  } catch (error) {
    console.error(error);
  }
};
