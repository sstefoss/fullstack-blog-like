import { useQuery } from "@apollo/client";
import { MY_POSTS } from "../gql/user.ts";
import { IPostWithReactions } from "../interfaces.tsx";
import Post from "../components/Post.tsx";
import Loading from "../components/Loading.tsx";

const Profile = () => {
  const { loading, error, data } = useQuery(MY_POSTS);

  if (loading) return <div>Loading</div>;
  if (error) return <p>Error : {error.message}</p>;

  const reactions = data?.me?.User?.reactions;

  return (
    <div className="flex flex-col items-center mt-28">
      {loading && <Loading />}
      {reactions.map((r: { post: IPostWithReactions }) => (
        <Post key={r.post.id} post={r.post} reactions={r.post.reactions} />
      ))}
    </div>
  );
};

export default Profile;
