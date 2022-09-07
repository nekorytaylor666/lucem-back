import { gql } from "@apollo/client";

export const GET_MAINPAGE = gql`
    query GetMainPage {
        getSpecializations {
            _id
            name
            description
            colorCodeGradient {
                start
                finish
            }
            photoURL {
                xl
            }
        }
        getAllDoctors {
            _id
            fullName
            description
            specializations {
                name
            }
            rating
            acceptableAgeGroup
            avatar {
                xl
            }
        }
    }
`;
