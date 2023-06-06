import { gql } from "@apollo/client";
import { REACTION_FRAGMENT } from "./fragments";

export const UPSERT_REACTION = gql`
  mutation upsert_reactions($postId: Int!, $type: reaction_type) {
    insert_reactions_one(
      object: { postId: $postId, type: $type }
      on_conflict: { constraint: reactions_pkey, update_columns: [type] }
    ) {
      ...reaction
    }
  }
  ${REACTION_FRAGMENT}
`;

export const DELETE_REACTION = gql`
  mutation delete_reactions($postId: Int!) {
    delete_reactions(where: { postId: { _eq: $postId } }) {
      affected_rows
    }
  }
`;
