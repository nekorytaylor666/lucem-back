import { gql } from "@apollo/client";

export const GET_ACTIVE_SESSION_PATIENT = gql`
    query GetActiveSessionByUserId($userId: String!) {
        getActiveSessionByUserId(userId: $userId) {
            _id
            count
            startDate
            booking {
                service {
                    name
                }
            }
        }
    }
`;
