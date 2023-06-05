import { gql, useQuery } from "@apollo/client";
import { PostInterface } from "../interfaces.tsx";

import Post from "../components/Post.tsx";

const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      title
      body
    }
  }
`;

const Home = () => {
  const { loading, error, data } = useQuery(GET_POSTS);

  if (loading) return <div>Loading</div>;
  if (error) return <p>Error : {error.message}</p>;

  return data.posts.map((p: PostInterface) => <Post post={p} />);
};
export default Home;
