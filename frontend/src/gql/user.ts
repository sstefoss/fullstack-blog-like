import { gql } from "@apollo/client";
import { USER_FRAGMENT } from "./fragments";

export const ME = gql`
  query Me {
    me {
      ...user
    }
  }
  ${USER_FRAGMENT}
`;

export const VERIFY_EMAIL = gql`
  mutation verifyEmail($email: String!, $token: String!) {
    verifyEmail(email: $email, token: $token) {
      token
    }
  }
`;

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export const SIGNUP = gql`
  mutation Signup($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      token
    }
  }
`;
