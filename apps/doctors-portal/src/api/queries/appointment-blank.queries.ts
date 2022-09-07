import gql from "graphql-tag";

// export const GET_APPOINTMENTS_INFO = gql`
//     query getAppointmentInfoUser($userId: String!) {
//         getComplaintsOfUser(userId: $userId) {
//             _id
//             complaint
//             reason
//             sicknessTimeDuration
//             session {
//                 _id
//                 startDate
//                 count
//             }
//             doctor {
//                 fullName
//                 avatar {
//                     m
//                 }
//                 specializations {
//                     name
//                     _id
//                 }
//             }
//         }
//         getDiagnoseOfUser(userId: $userId) {
//             _id
//             diagnose
//             natureOfTheDesease
//             preliminary
//             session {
//                 _id
//                 startDate
//                 count
//             }
//             doctor {
//                 fullName
//                 avatar {
//                     m
//                 }
//                 specializations {
//                     name
//                     _id
//                 }
//             }
//         }
//         getInspectionsOfUser(userId: $userId) {
//             _id
//             descriptions
//             images {
//                 m
//             }
//             doctor {
//                 fullName
//                 avatar {
//                     m
//                 }
//                 specializations {
//                     name
//                     _id
//                 }
//             }
//             session {
//                 _id
//                 startDate
//                 count
//             }
//             doctor {
//                 fullName
//             }
//         }
//     }
// `;
