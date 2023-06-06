import { useCallback, useState } from "react";
import { debounce } from "lodash";
import { SearchIcon } from "@heroicons/react/solid";

interface Props {
  onSearch: (val: string) => void;
}

const SearchBar = ({ onSearch }: Props) => {
  const [inputVal, setInputVal] = useState("");

  const debouncedFilter = useCallback(
    debounce((query) => onSearch(query), 500),
    []
  );

  const handleChange = (e: any) => {
    const newValue = e.target.value;
    setInputVal(newValue);
    debouncedFilter(newValue);
  };

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
        <SearchIcon className="h-4 w-4 text-gray-400" />
      </div>
      <input
        type="search"
        value={inputVal}
        onChange={handleChange}
        className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-800 focus:border-blue-800 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-200 dark:text-white dark:focus:ring-blue-800 dark:focus:border-blue-800"
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchBar;
