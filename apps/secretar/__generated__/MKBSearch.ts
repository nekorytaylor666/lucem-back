/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MKBSearch
// ====================================================

export interface MKBSearch_searchICD {
  __typename: "ICD";
  code: string;
  description: string;
}

export interface MKBSearch {
  searchICD: MKBSearch_searchICD[];
}

export interface MKBSearchVariables {
  search: string;
}
