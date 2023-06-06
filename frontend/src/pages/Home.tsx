import { useContext } from "react";
import { useQuery } from "@apollo/client";
import { IPostWithReactions } from "../interfaces.tsx";

import Post from "../components/Post.tsx";
import Loading from "../components/Loading.tsx";

import { LIST_POSTS, LIST_POSTS_W_REACTIONS } from "../gql/post.ts";
import { AuthContext } from "../context/auth.tsx";

const HomePage = () => {
  const { loggedIn } = useContext(AuthContext);
  const query = loggedIn ? LIST_POSTS_W_REACTIONS : LIST_POSTS;
  const { loading, error, data } = useQuery(query);

  if (loading) return <div>Loading</div>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className="flex flex-col items-center mt-28">
      {loading && <Loading />}
      {data.posts.map((p: IPostWithReactions) => (
        <Post key={p.id} post={p} reactions={p.reactions} />
      ))}
    </div>
  );
};
export default HomePage;
