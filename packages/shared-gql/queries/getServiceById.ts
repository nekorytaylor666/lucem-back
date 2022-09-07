import { gql } from "@apollo/client";

export const GET_SERVICE_BY_ID = gql`
query GetServicesById($serviceId: String!) {
	getServiceById(serviceId: $serviceId) {
		price
		name
	}
}
`;
