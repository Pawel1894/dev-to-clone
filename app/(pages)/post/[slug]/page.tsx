import { getPost } from "@/app/actions/post.actions";

type PostPage = {
  params: {
    slug: string;
  };
};

export default async function PostPage({ params }: PostPage) {
  // fetch post by slug
  const post = await getPost(params.slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <p>{post.author.name}</p>
    </div>
  );
}
