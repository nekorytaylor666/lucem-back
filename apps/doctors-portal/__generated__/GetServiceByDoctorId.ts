/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetServiceByDoctorId
// ====================================================

export interface GetServiceByDoctorId_getServicesByDoctorId {
    __typename: "Service";
    _id: string;
    name: string;
}

export interface GetServiceByDoctorId {
    getServicesByDoctorId: GetServiceByDoctorId_getServicesByDoctorId[];
}

export interface GetServiceByDoctorIdVariables {
    doctorId: string;
}
