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
      <h3>title: {post.title}</h3>
      <p>content: {post.content}</p>
      <p>author: {post.author.name}</p>
      <p>created at: {post.createdAt}</p>
    </div>
  );
}
