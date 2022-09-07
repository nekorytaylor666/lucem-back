import gql from "graphql-tag";

export const GET_APPOINTMENTS_INFO = gql`
    query getAppointmentInfoUser($userId: String!) {
        getComplaintsOfUser(userId: $userId) {
            _id
            complaint
            reason
            sicknessTimeDuration
            session {
                _id
                startDate
                count
            }
            doctor {
                fullName
            }
        }
        getDiagnoseOfUser(userId: $userId) {
            _id
            diagnose
            natureOfTheDesease
            preliminary
            session {
                _id
                startDate
                count
            }
            doctor {
                fullName
            }
        }
        getInspectionsOfUser(userId: $userId) {
            _id
            inspections
            session {
                _id
                startDate
                count
            }
            doctor {
                fullName
            }
        }
    }
`;
