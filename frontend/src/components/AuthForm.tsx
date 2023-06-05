import { ApolloError } from "@apollo/client";

const AuthForm = ({
  onSubmit,
  error,
  header,
  submit,
}: {
  onSubmit: React.FormEventHandler;
  error: ApolloError | undefined;
  header: React.ReactNode;
  submit: React.ReactNode;
}) => {
  const parseErrorMessage = (error: ApolloError) => {
    if (error.message === "user_exists") {
      return "User already exists";
    }
  };

  return (
    <form className="space-y-6 mx-auto" onSubmit={onSubmit}>
      {header}
      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          placeholder="name@company.com"
          required
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="••••••••"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          required
        />
      </div>

      {error && (
        <span className="text-xs tracking-wide text-red-600">
          {parseErrorMessage(error)}
        </span>
      )}
      {submit}
    </form>
  );
};

export const AuthFormHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <h5 className="text-xl font-medium text-gray-900 dark:text-white">
      {children}
    </h5>
  );
};

export const AuthFormSubmit = ({ children }: { children: React.ReactNode }) => {
  return (
    <button
      type="submit"
      className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      {children}
    </button>
  );
};

export default AuthForm;
