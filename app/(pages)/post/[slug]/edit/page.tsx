import { PostFormState, getPost, updatePost } from "@/app/actions/post.actions";
import { useFormState } from "react-dom";
import { UpdatePostForm } from "./form";

type EditPostPage = {
  params: {
    slug: string;
  };
};


export default async function EditPostPage({ params }: EditPostPage) {
  // fetch post by slug
  const post = await getPost(params.slug);
  

  if(!post) {
    return <div>Post not found</div>;
  }

  return <UpdatePostForm post={post} />
  
}