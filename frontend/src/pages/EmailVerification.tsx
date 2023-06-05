import { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { useSearchParams, useNavigate } from "react-router-dom";
import { VERIFY_EMAIL } from "../gql/user";

const EmailVerification = () => {
  const [verifyEmail, { error, data }] = useMutation(VERIFY_EMAIL);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const email = searchParams.get("email");
    const token = searchParams.get("token");
    verifyEmail({ variables: { email, token } });
  }, [searchParams, verifyEmail]);

  if (error && error.message === "no_such_token") {
    return <div>No such token</div>;
  }

  if (data?.verifyEmail) {
    localStorage.setItem("token", data.verifyEmail.token);
    setTimeout(() => {
      navigate("/");
    }, 3000);
  }

  return <div>Verifying email...</div>;
};

export default EmailVerification;
