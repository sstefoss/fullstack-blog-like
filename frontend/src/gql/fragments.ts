import gql from "graphql-tag";

export const USER_FRAGMENT = gql`
  fragment user on users {
    id
    email
  }
`;

export const POST_FRAGMENT = gql`
  fragment post on posts {
    id
    body
    title
  }
`;

export const REACTION_FRAGMENT = gql`
  fragment reaction on reactions {
    post {
      ...post
    }
    user {
      ...user
    }
    type
  }
  ${POST_FRAGMENT}
  ${USER_FRAGMENT}
`;
