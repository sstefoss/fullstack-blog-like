import { useQuery, useMutation } from "@apollo/client";
import { useCallback, useEffect, useState, SetStateAction } from "react";
import { isEmpty } from "lodash";

import { MY_POSTS } from "@/gql/user.ts";
import { UPDATE_REACTIONS_MANY } from "@/gql/reaction.ts";
import { IPostWithReactions } from "@/interfaces.tsx";
import Post from "@/components/posts/Post.tsx";
import EmptyState from "@/components/posts/PostsEmptyState.tsx";
import Filters, {
  SHOW_POST_TYPE,
  REACTION_TYPE,
} from "@/components/posts/PostsFilter.tsx";
import Loading from "@/components/Loading.tsx";

const makeSearchQuery = (text: string): SetStateAction<ISearchWhere> => ({
  post: {
    _or: [{ title: { _like: `%${text}%` } }, { body: { _like: `%${text}%` } }],
  },
});

const makeTypeQuery = (type: REACTION_TYPE) => ({
  type: {
    _eq: type,
  },
});

interface ITypeWhere {
  type: {
    _eq: string;
  };
}
interface ISearchWhere {
  post: {
    _or: [{ title: { _like: string } }, { body: { _like: string } }];
  };
}
const makeWhereCondition = (
  typeWhere: ITypeWhere,
  searchWhere: ISearchWhere
) => ({
  _and: [typeWhere, searchWhere],
});

const makeBatchReactionUpdates = (postIds: number[], type: REACTION_TYPE) =>
  postIds.map((id) => ({
    _set: { type },
    where: { postId: { _eq: id } },
  }));

const Profile = () => {
  const [searchWhere, setSearchWhere] = useState({} as ISearchWhere);
  const [typeWhere, setTypeWhere] = useState({} as ITypeWhere);

  const [where, setWhere] = useState(
    makeWhereCondition(typeWhere, searchWhere)
  );

  useEffect(() => {
    setWhere(makeWhereCondition(typeWhere, searchWhere));
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

  const searchPosts = (text: string) => setSearchWhere(makeSearchQuery(text));
  const showPosts = useCallback(
    (type: SHOW_POST_TYPE) => {
      switch (type) {
        case SHOW_POST_TYPE.ALL:
          setTypeWhere({} as ITypeWhere);
          break;
        case SHOW_POST_TYPE.LIKED:
          setTypeWhere(makeTypeQuery(REACTION_TYPE.LIKE));
          break;
        case SHOW_POST_TYPE.DISLIKED:
          setTypeWhere(makeTypeQuery(REACTION_TYPE.DISLIKE));
          break;
      }
    },
    [setTypeWhere]
  );

  const reactions = data?.me?.User?.reactions;

  return (
    <div className="flex justify-center mt-28">
      <div className="flex justify-center items-center mr-10 flex-col min-w-[576px]">
        {error && <p>Error : {error.message}</p>}
        {loading && <Loading />}
        {!loading && reactions.length === 0 && (
          <EmptyState searchEnabled={!isEmpty(searchWhere)} />
        )}
        {!loading &&
          reactions.map((r: { post: IPostWithReactions }) => (
            <Post key={r.post.id} post={r.post} reactions={r.post.reactions} />
          ))}
      </div>
      <div className="sticky top-[112px] self-start">
        <Filters
          searchPosts={searchPosts}
          setReactionToPosts={setReactionToPosts}
          showPosts={showPosts}
        />
      </div>
    </div>
  );
};

export default Profile;
