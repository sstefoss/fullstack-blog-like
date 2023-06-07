import { useMutation } from "@apollo/client";
import { Navigate } from "react-router-dom";

import { SIGNUP } from "@/gql/user";
import AuthForm, {
  AuthFormHeader,
  AuthFormSubmit,
} from "@/components/AuthForm.tsx";

const SignupPage = () => {
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
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <AuthForm
          onSubmit={onSubmit}
          error={error}
          header={<AuthFormHeader>Sign up in our platform</AuthFormHeader>}
          submit={<AuthFormSubmit>Signup</AuthFormSubmit>}
        />
      </div>
    </div>
  );
};

export default SignupPage;
