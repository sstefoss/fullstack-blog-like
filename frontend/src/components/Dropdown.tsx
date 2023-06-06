import { useCallback, useEffect, useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import cn from "classnames";

interface DDProps {
  options: Array<DDOptionProps>;
  className?: string;
  icon?: React.ReactNode;
}

const Dropdown = ({ options, className, icon }: DDProps) => {
  const [open, setOpen] = useState(false);
  const [activeOption, setActiveOption] = useState(options[0]);

  return (
    <div className={cn("my-4 relative", className)}>
      <button
        className="text-gray-200 w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-4 py-3 flex justify-center items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={() => setOpen(!open)}
      >
        <div className="flex flex-1 items-center">
          {icon}
          {activeOption.label}
        </div>

        {open && <ChevronUpIcon className="h-4 w-4 text-gray-400" />}
        {!open && <ChevronDownIcon className="h-4 w-4 text-gray-400" />}
      </button>
      {open && (
        <div className="z-10 absolute top-[60px] w-full bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700">
          <ul className="py-2 w-full text-sm text-gray-700 dark:text-gray-200">
            {options.map((option: DDOptionProps, i: number) => (
              <DropdownOption
                key={i}
                label={option.label}
                onClick={() => {
                  setActiveOption(option);
                  setOpen(false);
                  option.onClick();
                }}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

interface DDOptionProps {
  label: string;
  onClick: () => void;
}

const DropdownOption = ({ label, onClick }: DDOptionProps) => {
  return (
    <li onClick={onClick}>
      <div className="block w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 hover:cursor-pointer dark:hover:text-white">
        {label}
      </div>
    </li>
  );
};

export default Dropdown;
