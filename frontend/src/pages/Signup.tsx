import { useMutation } from "@apollo/client";
import { redirect } from "react-router-dom";

import { SIGNUP } from "../gql/user";

const Signup = () => {
  const [signup, { error }] = useMutation(SIGNUP);

  const onSubmit = (values: { email: string; password: string }) => {
    const { email, password } = values;
    signup({
      variables: {
        email,
        password,
      },
    })
      .then((data) => {
        redirect(
          `/email-verification?email=${email}&token=${data.data.signup.token}`
        );
      })
      .catch((e) => {
        console.log("user exists");
      });
  };
  return <div>Signup</div>;
};

export default Signup;
