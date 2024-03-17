import { Suspense } from "react";

import { getSession } from "@/app/utils/auth-utils";
import { Auth } from "@/app/components/auth/auth";
import { PostsList } from "@/app/components/post/posts-list";
import Link from "next/link";

export default async function Home() {
  const session = await getSession();
  return (
    <main>
      <span>Logged in: {session?.user?.name}</span>
      <br />
      <Auth />
      <br />
      <br />
      <Link href="/post/create">Add new post</Link>
      <br />
      <Suspense fallback="loading posts...">
        <PostsList />
      </Suspense>
    </main>
  );
}
