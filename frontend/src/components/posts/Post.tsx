import { useContext } from "react";
import { ThumbUpIcon, ThumbDownIcon } from "@heroicons/react/solid";
import { useMutation } from "@apollo/client";
import cn from "classnames";
import { Tooltip } from "react-tooltip";

import { IPost, IReaction } from "@/interfaces.tsx";
import { AuthContext } from "@/context/auth.tsx";
import { UPSERT_REACTION, DELETE_REACTION } from "@/gql/reaction.ts";

enum REACTION_TYPE {
  LIKE = "LIKE",
  DISLIKE = "DISLIKE",
}

const Post = ({
  post: { id, title, body },
  reactions,
}: {
  post: IPost;
  reactions: IReaction[];
}) => {
  const { loggedIn } = useContext(AuthContext);
  const [upsertReaction] = useMutation(UPSERT_REACTION, {
    update: (cache, d) => {
      cache.modify({
        id: cache.identify({ id, __typename: "posts" }),
        fields: {
          reactions() {
            return [d.data.insert_reactions_one];
          },
        },
      });
    },
  });
  const [deleteReaction] = useMutation(DELETE_REACTION, {
    update: (cache) => {
      cache.modify({
        id: cache.identify({ id, __typename: "posts" }),
        fields: {
          reactions() {
            return [];
          },
        },
      });
    },
  });
  const reaction = reactions?.length > 0 ? reactions[0] : null;

  const react = (type: REACTION_TYPE) => {
    if (!loggedIn) {
      return;
    }

    // check if reaction should be removed
    if (reaction?.type == type) {
      return deleteReaction({
        variables: {
          postId: id,
        },
      });
    }

    return upsertReaction({
      variables: {
        postId: id,
        type,
      },
    });
  };

  return (
    <div key={id} className="mb-4">
      <div className="flex block items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <div className="flex flex-col justify-between px-6 py-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {body}
          </p>
          <div className="flex items-center justify-end">
            <div
              className="flex items-center"
              data-tooltip-id="auth-warning"
              data-tooltip-content={
                !loggedIn
                  ? "Reactions are disabled for non-logged-in users."
                  : ""
              }
            >
              <ThumbUpIcon
                onClick={() => react(REACTION_TYPE.LIKE)}
                className={cn(
                  "h-6 w-6 text-gray-400 hover:text-gray-200 hover:text-green-600 mr-2",
                  {
                    "hover:cursor-not-allowed": !loggedIn,
                    "hover:cursor-pointer": loggedIn,
                    "text-green-600": reaction?.type == REACTION_TYPE.LIKE,
                  }
                )}
              />
              <ThumbDownIcon
                onClick={() => react(REACTION_TYPE.DISLIKE)}
                className={cn(
                  "h-6 w-6 text-gray-400 hover:text-gray-200 hover:text-red-600",
                  {
                    "hover:cursor-not-allowed": !loggedIn,
                    "hover:cursor-pointer": loggedIn,
                    "text-red-600": reaction?.type == REACTION_TYPE.DISLIKE,
                  }
                )}
              />
              {!loggedIn && <Tooltip id="auth-warning" />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
