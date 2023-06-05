import { useQuery } from "@apollo/client";
import { PostInterface } from "../interfaces.tsx";
import { LIST_POSTS } from "../gql/post.ts";

import Post from "../components/Post.tsx";

const HomePage = () => {
  const { loading, error, data } = useQuery(LIST_POSTS);

  if (loading) return <div>Loading</div>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className="flex flex-col items-center">
      {data.posts.map((p: PostInterface) => (
        <Post post={p} />
      ))}
    </div>
  );
};
export default HomePage;
