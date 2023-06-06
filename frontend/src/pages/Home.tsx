import { useQuery } from "@apollo/client";
import { IPost, IReaction } from "../interfaces.tsx";
import { LIST_POSTS, LIST_POSTS_W_REACTIONS } from "../gql/post.ts";

import Post from "../components/Post.tsx";
import { useContext } from "react";
import { AuthContext } from "../context/auth.tsx";

interface IPostWithReactions extends IPost {
  reactions: IReaction[];
}

const HomePage = () => {
  const { loggedIn } = useContext(AuthContext);
  const query = loggedIn ? LIST_POSTS_W_REACTIONS : LIST_POSTS;
  const { loading, error, data } = useQuery(query);

  if (loading) return <div>Loading</div>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className="flex flex-col items-center mt-28">
      {data.posts.map((p: IPostWithReactions) => (
        <Post key={p.id} post={p} reactions={p.reactions} />
      ))}
    </div>
  );
};
export default HomePage;
