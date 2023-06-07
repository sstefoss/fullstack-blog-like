import { useContext } from "react";
import { useMutation } from "@apollo/client";
import { Link, Navigate } from "react-router-dom";

import AuthForm, {
  AuthFormHeader,
  AuthFormSubmit,
} from "@/components/AuthForm.tsx";
import { AuthContext } from "@/context/auth.tsx";
import { LOGIN } from "@/gql/user";

const LoginPage = () => {
  const authContext = useContext(AuthContext);
  const [login, { error, data }] = useMutation(LOGIN);

  const onSubmit = (e: any) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    login({ variables: { email, password } }).then((res) => {
      authContext.login?.(res.data.login.token);
    });
  };

  if (data?.login) {
    return <Navigate to="/" />;
  }

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <AuthForm
          onSubmit={onSubmit}
          error={error}
          header={<AuthFormHeader>Sign in to our platform</AuthFormHeader>}
          submit={<AuthFormSubmit>Login</AuthFormSubmit>}
        />
        <div className="text-sm font-medium mt-4 text-gray-500 dark:text-gray-300">
          Not registered?{" "}
          <Link
            to="/signup"
            className="text-blue-700 hover:underline dark:text-blue-500"
          >
            Create account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
