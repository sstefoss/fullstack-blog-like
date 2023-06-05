import { gql, useQuery } from "@apollo/client";

const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      title
      body
    }
  }
`;

const App = () => {
  const { loading, error, data } = useQuery(GET_POSTS);
  console.log(data, error, loading);
  if (loading) return <div>Loading</div>;
  if (error) return <p>Error : {error.message}</p>;
  return data.posts.map(({ id, title, body }) => (
    <div key={id} className="mb-4">
      <h3 className="font-bold">{title}</h3>
      <p>{body}</p>
    </div>
  ));
};
export default App;
