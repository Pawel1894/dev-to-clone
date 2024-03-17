"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export const Auth = () => {
  const { status } = useSession();
  
  if(status === "authenticated") {
    return (
      <button
        onClick={() => {
          signOut();
        }}
      >
        sign out
      </button>
    );
  }

  return (
    <button
      disabled={status === "loading"}
      aria-disabled={status === "loading"}
      onClick={() => {
        signIn("github");
      }}
    >
      sign in
    </button>
  );
};
