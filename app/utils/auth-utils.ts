import { getServerSession } from "next-auth";
import { authOptions } from "@/auth.config";

export const getSession = async () => {
  return await getServerSession(authOptions);
};
