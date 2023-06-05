import { useMutation } from "@apollo/client";
import { Navigate } from "react-router-dom";

import { SIGNUP } from "../gql/user";
import AuthForm from "../components/AuthForm.tsx";

const Signup = () => {
  const [signup, { error, data }] = useMutation(SIGNUP);

  const onSubmit = (e: any) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    signup({
      variables: {
        email,
        password,
      },
    });
  };

  if (data?.signup) {
    const { token, email } = data.signup;
    return (
      <Navigate to={`/email-verification?email=${email}&token=${token}`} />
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
        <h3 className="text-2xl font-bold text-center">Sign Up</h3>
        <AuthForm onSubmit={onSubmit} error={error} />
      </div>
    </div>
  );
};

export default Signup;
