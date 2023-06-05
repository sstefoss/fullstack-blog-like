import { PostInterface } from "../interfaces.tsx";

const Post = ({ post: { id, title, body } }: { post: PostInterface }) => {
  return (
    <div key={id} className="mb-4">
      <h3 className="font-bold">{title}</h3>
      <p>{body}</p>
    </div>
  );
};

export default Post;
