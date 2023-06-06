import cn from "classnames";

interface Props {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const Card = ({ title, className, children }: Props) => {
  return (
    <div
      className={cn(
        "block p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700",
        className
      )}
    >
      {title && (
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
      )}

      <div className="font-normal text-gray-700 dark:text-gray-400">
        {children}
      </div>
    </div>
  );
};

export default Card;
