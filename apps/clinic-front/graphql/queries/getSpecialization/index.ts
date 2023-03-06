import { gql } from "@apollo/client";

export const GET_SPECIALIZATION = gql`
    query GetSpecializations {
        getSpecializations {
            _id
            name
            description
            colorCodeGradient {
                start
                finish
            }

            doctors {
                _id
                fullName
                acceptableAgeGroup
                description
                email
                fullName
                numOfRatings
                phoneNumber
                rating

                avatar {
                    xl
                }
                specializations {
                    name
                }
                workTimes {
                    endTime
                    startTime
                }
            }
            photoURL {
                xl
            }
        }
    }
`;

export const GET_SPECIALIZATION_BY_ID = gql`
    query GetSpecializationById($id: String!) {
        getSpecializationById(specializationId: $id) {
            _id
            name
            description
            colorCodeGradient {
                start
                finish
            }

            doctors {
                _id
                fullName
                acceptableAgeGroup
                description
                email
                fullName
                numOfRatings
                phoneNumber
                rating

                avatar {
                    xl
                }
                specializations {
                    name
                }
                workTimes {
                    endTime
                    startTime
                }
            }
            photoURL {
                xl
            }
        }
    }
`;
