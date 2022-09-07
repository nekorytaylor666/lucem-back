/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUserById
// ====================================================

export interface GetUserById_getUserByID {
    __typename: "User";
    fullName: string;
    phoneNumber: string;
}

export interface GetUserById {
    getUserByID: GetUserById_getUserByID;
}

export interface GetUserByIdVariables {
    userId: string;
}
