'use client';

import { PostFormState, createPost } from "@/app/actions/post.actions";
import { useFormState } from "react-dom";

const initialState: PostFormState = { message: null,  errors: {}, status: "idle"}

const PostCreate = () => {
  const [state, dispatch] = useFormState(createPost, initialState);

  return (
    <div className="window">
      <div className="title-bar">
        <div className="title-bar-text">Create new form</div>
      </div>
      <form action={dispatch}>
        <div className="field-row-stacked">
          <label>Title</label>
          <input name="title" type="text" />
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
          <textarea name="content"></textarea>
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
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default PostCreate;
