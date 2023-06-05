import { gql } from "@apollo/client";
import { POST_FRAGMENT } from "./fragments";

export const LIST_POSTS = gql`
  query Posts {
    posts {
      ...post
    }
  }
  ${POST_FRAGMENT}
`;

export const FETCH_POST = gql`
  query Post($id: Int!) { {
    posts(where: { id: { _eq: $id } }) {
      ...post
    }
  }
  ${POST_FRAGMENT}
`;
