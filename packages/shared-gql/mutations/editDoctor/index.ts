import { gql } from "@apollo/client";

export const EDIT_DOCTOR_MUTATION = gql`
  mutation EditDoctor(
    $doctorId: String!
    $fullName: String
    $email: String
    $description: String
    $acceptableAgeGroup: AcceptableAgeGroup
    $dateOfBirth: DateTime
    $avatar: Upload
    $experiences: [ExperienceInput!]
    $languages: [LanguageInput!]
    $password: String
    $phoneNumber: String
    $startingExperienceDate: DateTime
    $workTimes: [WorkTimeInput!]
    $cabinet: String
  ) {
    editDoctor(
      doctorId: $doctorId
      acceptableAgeGroup: $acceptableAgeGroup
      avatar: $avatar
      dateOfBirth: $dateOfBirth
      description: $description
      email: $email
      experiences: $experiences
      fullName: $fullName
      languages: $languages
      password: $password
      phoneNumber: $phoneNumber
      startingExperienceDate: $startingExperienceDate
      workTimes: $workTimes
      cabinet: $cabinet
    ) {
      _id
    }
  }
`;
