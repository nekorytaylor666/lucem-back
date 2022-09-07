import { gql } from "@apollo/client";

export const MKB_SEARCH = gql`
    query MKBSearch($search: String!) {
        searchICD(query: $search) {
            code
            description
        }
    }
`;
