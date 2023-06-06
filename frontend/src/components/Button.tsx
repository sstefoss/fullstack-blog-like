import cn from "classnames";

interface Props {
  children: React.ReactNode;
  className?: string;
  onClick: () => void;
}

const Button = ({ children, className, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center justify-center px-4 py-2 text-sm  text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
