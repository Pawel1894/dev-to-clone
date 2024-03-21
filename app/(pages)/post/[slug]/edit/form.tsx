'use client';

import { PostFormState, updatePost } from "@/app/actions/post.actions";
import { SelectPost } from "@/schema";
import { useFormState } from "react-dom";

const initialState: PostFormState = { message: null,  errors: {}, status: "idle"}

export const UpdatePostForm = ({ post } : {post: SelectPost}) => {
  const updatePostWithId = updatePost.bind(null, post.id);
  const [state, dispatch] = useFormState(updatePostWithId, initialState);

  return (
    <div className="window">
      <div className="title-bar">
        <div className="title-bar-text">Create new form</div>
      </div>
      <form action={dispatch}>
        <div className="field-row-stacked">
          <label>Title</label>
          <input name="title" type="text" defaultValue={post.title} />
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.title &&
              state.errors.title.map((error: string) => (
                <p key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="field-row-stacked">
          <label>Content</label>
          <textarea name="content" defaultValue={post.content} />
          {state.errors?.content &&
            state.errors.content.map((error: string) => (
              <p key={error}>
                {error}
              </p>
          ))}
        </div>
        <div aria-live="polite" aria-atomic="true">
          {state.message ? (
            <p>{state.message}</p>
          ) : null}
        </div>
        <button type="submit">update</button>
      </form>
    </div>
  );
}