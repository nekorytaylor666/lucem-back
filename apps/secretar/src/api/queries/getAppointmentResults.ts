import { gql } from "@apollo/client";

export const GET_APPOINTMENT_BLANKS_OF_USER = gql`
    query GetAppointmentBlanksOfUser($userId: String!) {
        getAppointmentBlanksOfUser(userId: $userId, page: 1) {
            _id
            appointmentResults {
                _id
                description
                doctor {
                    fullName
                    avatar {
                        m
                    }
                }
                photoURL {
                    xl
                }
            }
            complaint {
                complaint
                sicknessTimeDuration
                reason
            }
            diagnose {
                diagnose
                deseaseDBCode
                natureOfTheDesease
                preliminary
            }
            inspections {
                description
                images {
                    m
                }
                _id
            }
        }
    }
`;
