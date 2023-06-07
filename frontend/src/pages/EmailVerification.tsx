import { useEffect, useContext } from "react";
import { useMutation } from "@apollo/client";
import { useSearchParams, useNavigate } from "react-router-dom";
import { VERIFY_EMAIL } from "@/gql/user";
import { AuthContext } from "@/context/auth.tsx";

const EmailVerificationPage = () => {
  const authContext = useContext(AuthContext);
  const [verifyEmail, { error, data }] = useMutation(VERIFY_EMAIL);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const email = searchParams.get("email");
    const token = searchParams.get("token");
    verifyEmail({ variables: { email, token } }).then((res) =>
      authContext.login?.(res.data.verifyEmail.token)
    );
  }, [authContext, searchParams, verifyEmail]);

  if (error && error.message === "no_such_token") {
    return <div>No such token</div>;
  }

  if (data?.verifyEmail) {
    setTimeout(() => {
      navigate("/");
    }, 3000);
  }

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-1/3 p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <h5 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
          Verifying email...
        </h5>
        <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">
          Sit tight while we confirm your email address, we'll have you up and
          running in no time!
        </p>
      </div>
    </div>
  );
};

export default EmailVerificationPage;
