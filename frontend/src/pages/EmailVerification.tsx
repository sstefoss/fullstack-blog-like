import { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { redirect, useSearchParams } from "react-router-dom";
import { VERIFY_EMAIL } from "../gql/user";

const EmailVerification = () => {
  const [verifyEmail, { error }] = useMutation(VERIFY_EMAIL);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const { email, token } = searchParams;
    verifyEmail({ variables: { email, token } })
      .then((data) => {
        localStorage.setItem("token", data.data.verifyEmail.token);
        setTimeout(() => {
          redirect("/");
        }, 3000);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [searchParams, verifyEmail]);

  if (error && error.message === "no_such_token") {
    return <div>No such token</div>;
  }
  return <div>Verifying email...</div>;
};

export default EmailVerification;
