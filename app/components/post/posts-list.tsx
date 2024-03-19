import { getPosts } from "@/app/actions/post.actions";
import Link from "next/link";

export const PostsList = async () => {
  const posts = await getPosts();

  if (!posts) {
    return <div>0 posts</div>;
  }

  if (!posts.length) {
    return <div>0 posts length</div>;
  }

  return (
    <div>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/post/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
