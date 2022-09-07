import { gql } from "@apollo/client/core";

export const GET_SESSIONS_BY_PERIOD = gql`
  query GetSessionsByPeriod($startTime: DateTime!, $endTime: DateTime!) {
    getSessionPeriodTime(startTime: $startTime, endTime: $endTime) {
      price
      startDate
      doctor {
        _id
        fullName
      }

      service {
        name
        _id
      }
      clinicPercnetage
    }
  }
`;
