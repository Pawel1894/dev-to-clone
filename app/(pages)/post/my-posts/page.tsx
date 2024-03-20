import { deletePost, getMyPosts } from "@/app/actions/post.actions";


export default async function MyPostsPage() {
  const posts = await getMyPosts();

  if (posts.length === 0) {
    return <div>0 posts</div>;
  }

  return (
    <div>
      <h3>My Posts</h3>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <a href={`/post/${post.id}`}>{post.title}</a>
            &nbsp;&nbsp;
            <button>Edit</button>
            &nbsp;
            <form
              style={{ display: "inline" }}
              action={async () => {
                'use server'
                await deletePost(post.id);
              }}
            >
              <button>Delete</button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}
