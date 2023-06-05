import { useMutation } from "@apollo/client";
import { Navigate } from "react-router-dom";
import AuthForm from "../components/AuthForm.tsx";

import { LOGIN } from "../gql/user";

const Login = () => {
  const [login, { error, data }] = useMutation(LOGIN);

  const onSubmit = (e: any) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    login({ variables: { email, password } });
  };

  if (data.login) {
    localStorage.setItem("token", data.login.token);
    return <Navigate to="/" />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
        <h3 className="text-2xl font-bold text-center">Login</h3>
        <AuthForm onSubmit={onSubmit} error={error} />
      </div>
    </div>
  );
};

export default Login;
