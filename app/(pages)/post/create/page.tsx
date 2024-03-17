import { createPost } from "@/app/actions/post.actions";

const PostCreate = async () => {
  return (
    <div className="window">
      <div className="title-bar">
        <div className="title-bar-text">Create new form</div>
      </div>
      <form action={createPost}>
        <div className="field-row-stacked">
          <label>Title</label>
          <input type="text" />
        </div>
        <div className="field-row-stacked">
          <label>Content</label>
          <textarea></textarea>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default PostCreate;
