"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export const ClientComponent = () => {
  const { data: session } = useSession();

  return (
    <>
      <span>client: {session?.user?.email}</span>
      {session?.user ? (
        <button
          onClick={() => {
            signOut();
          }}
        >
          sign out
        </button>
      ) : (
        <button
          onClick={() => {
            signIn("github");
          }}
        >
          sign in
        </button>
      )}
    </>
  );
};
