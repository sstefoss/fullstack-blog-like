import { useQuery, useMutation } from "@apollo/client";
import { useCallback, useEffect, useState } from "react";
import {
  CheckIcon,
  ThumbUpIcon,
  ThumbDownIcon,
  DocumentSearchIcon,
  EyeIcon,
} from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import { isEmpty } from "lodash";

import { MY_POSTS } from "../gql/user.ts";
import { UPDATE_REACTIONS_MANY } from "../gql/reaction.ts";
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
const makeWhereCondition = (typeWhere: any, searchWhere: any) => ({
  _and: [typeWhere, searchWhere],
});

const makeBatchReactionUpdates = (postIds: number[], type: REACTION_TYPE) => {
  return postIds.map((id) => ({
    _set: { type },
    where: { postId: { _eq: id } },
  }));
};

const Profile = () => {
  const [searchWhere, setSearchWhere] = useState({});
  const [typeWhere, setTypeWhere] = useState({});

  const [where, setWhere] = useState(
    makeWhereCondition(searchWhere, typeWhere)
  );

  useEffect(() => {
    setWhere(makeWhereCondition(searchWhere, typeWhere));
  }, [searchWhere, typeWhere]);

  const [updateReactionsMany] = useMutation(UPDATE_REACTIONS_MANY);
  const { loading, error, data } = useQuery(MY_POSTS, {
    variables: {
      where,
    },
    fetchPolicy: "network-only",
  });

  const setReactionToPosts = (type: REACTION_TYPE) => {
    const reactions = data?.me?.User?.reactions;
    if (!reactions) {
      return null;
    }

    const postIds = reactions.map(
      (r: { post: IPostWithReactions }) => r.post.id
    );
    updateReactionsMany({
      variables: {
        updates: makeBatchReactionUpdates(postIds, type),
      },
      update: (cache, { data: { update_reactions_many } }) => {
        update_reactions_many.forEach((resp: any) => {
          // every post can only have one reaction
          const reaction = resp.returning[0];
          cache.modify({
            id: cache.identify({ id: reaction.postId, __typename: "posts" }),
            fields: {
              reactions() {
                return [reaction];
              },
            },
          });
        });
      },
    });
  };

  const show = useCallback(
    (type: SHOW_TYPE) => {
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
    },
    [setTypeWhere]
  );

  const searchPosts = (text: string) => setSearchWhere(makeSearchQuery(text));

  if (loading) return <div>Loading</div>;
  if (error) return <p>Error : {error.message}</p>;

  const reactions = data?.me?.User?.reactions;

  return (
    <div className="flex justify-center mt-28">
      <div className="flex justify-center items-center mr-10 flex-col">
        {loading && <Loading />}
        {reactions.length === 0 && (
          <EmptyState searchEnabled={!isEmpty(searchWhere)} />
        )}
        {reactions.map((r: { post: IPostWithReactions }) => (
          <Post key={r.post.id} post={r.post} reactions={r.post.reactions} />
        ))}
      </div>
      <div className="sticky top-[112px] self-start">
        <Card className="w-[22rem]">
          <SearchBar onSearch={(text) => searchPosts(text)} />
          <Dropdown
            className="w-full"
            icon={<EyeIcon className="h-4 w-4 text-gray-400 mr-2.5" />}
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
              className="dark:border-green-800 dark:border dark:border-2 dark:hover:bg-green-800 mr-4 flex-1"
              onClick={() => setReactionToPosts(REACTION_TYPE.LIKE)}
            >
              <div className="flex items-center">
                <ThumbUpIcon className="h-4 w-4 text-gray-100 mr-2" />
                <span>Like all</span>
              </div>
            </Button>
            <Button
              className="dark:border-red-900 dark:hover:bg-red-900 dark:border dark:border-2 flex-1"
              onClick={() => setReactionToPosts(REACTION_TYPE.DISLIKE)}
            >
              <div className="flex items-center">
                <ThumbDownIcon className="h-4 w-4 text-gray-100 mr-2" />
                <span>Dislike all</span>
              </div>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

interface EmptyStateProps {
  searchEnabled: boolean;
}

const EmptyState = ({ searchEnabled }: EmptyStateProps) => {
  return (
    <div className="min-w-[574px] flex items-center flex-col justify-center block min-w-lg p-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-gray-300">
      {searchEnabled ? (
        <DocumentSearchIcon className="h-16 w-16 text-gray-400 mb-4" />
      ) : (
        <CheckIcon className="h-16 w-16 text-gray-400 mb-4" />
      )}
      <div className="flex items-center flex-col justify-center ">
        <h3 className="font-bold text-lg mb-4 text-center">
          {searchEnabled ? (
            <>
              We couldn't find any posts <br /> that meet your search criteria.
            </>
          ) : (
            <>
              There are currently no liked
              <br /> or disliked posts to show!
            </>
          )}
        </h3>
        <p className="text-center">
          {searchEnabled ? (
            <>
              Try modifying the filters to find posts
              <br /> that match your preferences.
            </>
          ) : (
            <>
              Please head over to the{" "}
              <Link className="underline" to="/">
                Home Page
              </Link>
              <br />
              and react to new content.
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Profile;
