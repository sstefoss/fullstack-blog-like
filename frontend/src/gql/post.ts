import { gql } from "@apollo/client";
import { REACTION_FRAGMENT, POST_FRAGMENT } from "./fragments";

export const LIST_POSTS = gql`
  query Posts {
    posts {
      ...post
    }
  }
  ${POST_FRAGMENT}
`;

export const LIST_POSTS_W_REACTIONS = gql`
  query Posts {
    posts {
      ...post
      reactions {
        ...reaction
      }
    }
  }
  ${POST_FRAGMENT}
  ${REACTION_FRAGMENT}
`;
