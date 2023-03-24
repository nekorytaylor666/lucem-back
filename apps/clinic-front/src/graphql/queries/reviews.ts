import { gql } from "@apollo/client";

export const GET_REVIEW_OF_DOCTOR_QUERY = gql`
    query GetReviewByDoctorId($doctorId: String!) {
        getCommentsOfDoctor(page: 1, doctorId: $doctorId) {
            _id
            dateCreated
            fakeName
            rating
            text
            user {
                fullName
            }
        }
    }
`;

export const LEAVE_REVIEW_OF_DOCTOR_MUTATION = gql`
    mutation LeaveComment($doctorId: String!, $rating: Int!, $text: String!) {
        leaveComment(doctorId: $doctorId, rating: $rating, text: $text) {
            _id
        }
    }
`;
