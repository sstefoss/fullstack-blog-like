import { gql } from "@apollo/client";

export const UPSERT_REACTION = gql`
  mutation upsertReaction($userId: Int!, $postId: Int!, $type: ReactionType) {
    upsertReaction(userId: $userId, postId: $postId, type: $type) {
      userId
    }
  }
`;

export const DELETE_REACTION = gql`
  mutation deleteReaction($userId: Int!, $postId: Int!) {
    deleteReaction(userId: $userId, postId: $postId) {
      userId
    }
  }
`;
