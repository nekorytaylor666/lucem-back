import { gql } from "@apollo/client";

export const GET_SPECIALIZATIONS = gql`
    query GetSpecializations {
        getSpecializations {
            _id
            name
            colorCodeGradient {
                start
                finish
            }
            services {
                _id
                price
                durationInMinutes
                name
            }
            photoURL {
                xl
            }
            description
        }
    }
`;
