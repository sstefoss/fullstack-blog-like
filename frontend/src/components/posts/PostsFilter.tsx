import { ThumbUpIcon, ThumbDownIcon, EyeIcon } from "@heroicons/react/solid";
import Card from "@/components/Card.tsx";
import Button from "@/components/Button.tsx";
import SearchBar from "@/components/SearchBar.tsx";
import Dropdown from "@/components/Dropdown.tsx";

export enum SHOW_POST_TYPE {
  ALL = "ALL",
  LIKED = "LIKED",
  DISLIKED = "DISLIKED",
}

export enum REACTION_TYPE {
  LIKE = "LIKE",
  DISLIKE = "DISLIKE",
}

interface Props {
  searchPosts: (text: string) => void;
  showPosts: (type: SHOW_POST_TYPE) => void;
  setReactionToPosts: (type: REACTION_TYPE) => void;
}

const PostsFilter = ({ searchPosts, showPosts, setReactionToPosts }: Props) => {
  return (
    <Card className="w-[22rem]">
      <SearchBar onSearch={(text) => searchPosts(text)} />
      <Dropdown
        className="w-full"
        icon={<EyeIcon className="h-4 w-4 text-gray-400 mr-2.5" />}
        options={[
          { label: "Show all", onClick: () => showPosts(SHOW_POST_TYPE.ALL) },
          {
            label: "Liked only",
            onClick: () => showPosts(SHOW_POST_TYPE.LIKED),
          },
          {
            label: "Disliked only",
            onClick: () => showPosts(SHOW_POST_TYPE.DISLIKED),
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
  );
};

export default PostsFilter;
