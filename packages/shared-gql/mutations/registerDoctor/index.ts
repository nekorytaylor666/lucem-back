import { gql } from "@apollo/client";

export const REGISTER_DOCTOR_MUTATION = gql`
  mutation RegisterDoctor(
    $fullName: String!
    $email: String!
    $description: String!
    $acceptableAgeGroup: AcceptableAgeGroup!
    $dateOfBirth: DateTime!
    $avatar: Upload
    $experience: [ExperienceInput!]
    $languages: [LanguageInput!]!
    $password: String!
    $phoneNumber: String!
    $startingExperienceDate: DateTime!
    $workTimes: [WorkTimeInput!]
    $cabinet: String!
    $specializationIds: [String!]
  ) {
    registerDoctor(
      acceptableAgeGroup: $acceptableAgeGroup
      avatar: $avatar
      dateOfBirth: $dateOfBirth
      description: $description
      email: $email
      experience: $experience
      fullName: $fullName
      languages: $languages
      password: $password
      phoneNumber: $phoneNumber
      startingExperienceDate: $startingExperienceDate
      workTimes: $workTimes
      cabinet: $cabinet
      specializationIds: $specializationIds
    ) {
      doctor {
        _id
        description
      }
    }
  }
`;
