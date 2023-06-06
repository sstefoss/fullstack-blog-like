import { gql } from "@apollo/client";
import { REACTION_FRAGMENT, POST_FRAGMENT, USER_FRAGMENT } from "./fragments";

export const ME = gql`
  query Me {
    me {
      User {
        ...user
      }
    }
  }
  ${USER_FRAGMENT}
`;

export const MY_POSTS = gql`
  query {
    me {
      User {
        reactions {
          post {
            ...post
            reactions {
              ...reaction
            }
          }
        }
      }
    }
  }
  ${POST_FRAGMENT}
  ${REACTION_FRAGMENT}
`;

export const VERIFY_EMAIL = gql`
  mutation verifyEmail($email: String!, $token: String!) {
    verifyEmail(email: $email, token: $token) {
      token
      email
    }
  }
`;

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      email
    }
  }
`;

export const SIGNUP = gql`
  mutation Signup($email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      token
      email
    }
  }
`;
