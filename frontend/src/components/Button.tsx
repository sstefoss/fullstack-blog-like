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
        "flex items-center justify-center px-4 py-2.5 text-sm font-semibold text-center text-white transition-colors rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800",
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
