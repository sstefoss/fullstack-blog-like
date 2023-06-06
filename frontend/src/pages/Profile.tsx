import StickyBox from "react-sticky-box";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { ThumbUpIcon, ThumbDownIcon, EyeIcon } from "@heroicons/react/solid";

import { MY_POSTS } from "../gql/user.ts";
import { IPostWithReactions } from "../interfaces.tsx";
import Post from "../components/Post.tsx";
import Loading from "../components/Loading.tsx";
import Card from "../components/Card.tsx";
import Button from "../components/Button.tsx";
import SearchBar from "../components/SearchBar.tsx";
import Dropdown from "../components/Dropdown.tsx";

enum SHOW_TYPE {
  ALL = "ALL",
  LIKED = "LIKED",
  DISLIKED = "DISLIKED",
}

enum REACTION_TYPE {
  LIKE = "LIKE",
  DISLIKE = "DISLIKE",
}

const makeSearchQuery = (text: string) => ({
  post: {
    _or: [{ title: { _like: `%${text}%` } }, { body: { _like: `%${text}%` } }],
  },
});

const makeTypeQuery = (type: REACTION_TYPE) => ({
  type: {
    _eq: type,
  },
});
const makeWhereCondition = (typeWhere, searchWhere) => ({
  _and: [typeWhere, searchWhere],
});

const Profile = () => {
  const [searchWhere, setSearchWhere] = useState({});
  const [typeWhere, setTypeWhere] = useState({});

  const [where, setWhere] = useState(
    makeWhereCondition(searchWhere, typeWhere)
  );

  useEffect(() => {
    setWhere(makeWhereCondition(searchWhere, typeWhere));
  }, [searchWhere, typeWhere]);

  const { loading, error, data } = useQuery(MY_POSTS, {
    variables: {
      where,
    },
  });

  const setReactionToPosts = (reaction: REACTION_TYPE) => {
    console.log("set reaction: ", reaction);
  };

  const searchPosts = (text: string) => setSearchWhere(makeSearchQuery(text));

  if (loading) return <div>Loading</div>;
  if (error) return <p>Error : {error.message}</p>;

  const show = (type: SHOW_TYPE) => {
    switch (type) {
      case SHOW_TYPE.ALL:
        setTypeWhere({});
        break;
      case SHOW_TYPE.LIKED:
        setTypeWhere(makeTypeQuery(REACTION_TYPE.LIKE));
        break;
      case SHOW_TYPE.DISLIKED:
        setTypeWhere(makeTypeQuery(REACTION_TYPE.DISLIKE));
        break;
    }
  };

  const reactions = data?.me?.User?.reactions;

  return (
    <div className="flex justify-center mt-28">
      <div className="flex justify-center items-center mr-10 flex-col">
        {loading && <Loading />}
        {reactions.map((r: { post: IPostWithReactions }) => (
          <Post key={r.post.id} post={r.post} reactions={r.post.reactions} />
        ))}
      </div>
      <StickyBox offsetTop={100} offsetBottom={20}>
        <Card className="w-[22rem]">
          <SearchBar onSearch={(text) => searchPosts(text)} />
          <Dropdown
            className="w-full"
            icon={<EyeIcon className="h-4 w-4 text-gray-400 mr-3" />}
            options={[
              { label: "Show all", onClick: () => show(SHOW_TYPE.ALL) },
              { label: "Liked only", onClick: () => show(SHOW_TYPE.LIKED) },
              {
                label: "Disliked only",
                onClick: () => show(SHOW_TYPE.DISLIKED),
              },
            ]}
          />
          <div className="w-full flex">
            <Button
              className="dark:bg-green-400 dark:hover:bg-green-600 mr-4 flex-1"
              onClick={() => setReactionToPosts(REACTION_TYPE.LIKE)}
            >
              <div className="flex items-center">
                <ThumbUpIcon className="h-4 w-4 text-gray-100 hover:text-gray-200 hover:text-green-600 mr-2" />
                <span>Like all</span>
              </div>
            </Button>
            <Button
              className="dark:bg-red-400 dark:hover:bg-red-600 flex-1"
              onClick={() => setReactionToPosts(REACTION_TYPE.DISLIKE)}
            >
              <div className="flex items-center">
                <ThumbDownIcon className="h-4 w-4 text-gray-100 mr-2" />
                <span>Dislike all</span>
              </div>
            </Button>
          </div>
        </Card>
      </StickyBox>
    </div>
  );
};

export default Profile;
