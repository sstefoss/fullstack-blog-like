import { ThumbUpIcon, ThumbDownIcon } from "@heroicons/react/solid";
import { Tooltip } from "react-tooltip";
import { PostInterface } from "../interfaces.tsx";
import { isLoggedIn } from "../utils.tsx";
import cn from "classnames";

const Post = ({ post: { id, title, body } }: { post: PostInterface }) => {
  const like = (e) => {
    e.stopPropagation();
  };

  const dislike = (e) => {
    e.stopPropagation();
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
                !isLoggedIn()
                  ? "Reactions are disabled for non-logged-in users."
                  : ""
              }
            >
              <ThumbUpIcon
                onClick={like}
                className={cn(
                  "h-6 w-6 text-gray-400 hover:text-gray-200 hover:text-green-600 mr-2",
                  {
                    "hover:cursor-not-allowed": !isLoggedIn(),
                    "hover:cursor-pointer": isLoggedIn(),
                  }
                )}
              />
              <ThumbDownIcon
                onClick={dislike}
                className="h-6 w-6 text-gray-400 hover:text-gray-200 hover:text-red-600 hover:cursor-pointer"
              />
              {!isLoggedIn() && <Tooltip id="auth-warning" />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
