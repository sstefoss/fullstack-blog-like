import { ApolloError } from "@apollo/client";

const AuthForm = ({
  onSubmit,
  error,
}: {
  onSubmit: React.FormEventHandler;
  error: ApolloError | undefined;
}) => {
  const parseErrorMessage = (error: ApolloError) => {
    if (error.message === "user_exists") {
      return "User already exists";
    }
  };

  return (
    <form onSubmit={onSubmit} className="min-w-[320px]">
      <div className="mt-4">
        <div>
          <label className="block" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="text"
            placeholder="Email"
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
          />
          <span className="text-xs tracking-wide text-red-600">
            {/* Email field is required{" "} */}
          </span>
        </div>
        <div className="mt-4">
          <label className="block">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
          />
        </div>
        {error && (
          <span className="text-xs tracking-wide text-red-600">
            {parseErrorMessage(error)}
          </span>
        )}
        <button className="px-6 py-2 mt-6 text-white bg-blue-600 rounded-lg hover:bg-blue-900 w-full">
          Signup
        </button>
      </div>
    </form>
  );
};

export default AuthForm;
