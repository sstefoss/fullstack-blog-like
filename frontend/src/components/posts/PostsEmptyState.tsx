import { CheckIcon, DocumentSearchIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";

interface Props {
  searchEnabled: boolean;
}

const PostsEmptyState = ({ searchEnabled }: Props) => {
  return (
    <div className="w-full flex items-center flex-col justify-center block min-w-lg p-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-gray-300">
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

export default PostsEmptyState;
