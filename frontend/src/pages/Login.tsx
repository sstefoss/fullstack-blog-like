import { useMutation } from "@apollo/client";
import { Link, redirect } from "react-router-dom";

import { LOGIN } from "../gql/user";

const Login = () => {
  const [login, { error }] = useMutation(LOGIN);

  const onSubmit = (values: { email: string; password: string }) => {
    const { email, password } = values;
    login({ variables: { email, password } })
      .then((data) => {
        localStorage.setItem("token", data.data.login.token);
        redirect("/");
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
  return <div>Login</div>;
};

export default Login;
