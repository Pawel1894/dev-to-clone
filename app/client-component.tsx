'use client'

import { useSession } from "next-auth/react";

export const ClientComponent = () => {
  const { data: session, status } = useSession();

  return <span>client: {session?.user?.email}</span>
};