import { gql } from '@apollo/client';

import { CORE_REPOSITORIES_FIELDS } from './fragments';

export const GET_REPOSITORIES = gql`
  ${CORE_REPOSITORIES_FIELDS}
  query {
    repositories {
      edges {
        node {
          ...CoreRepositoriesFields
        }
      }
    }
  }
`;

export const GET_CURRENTUSER = gql`
  query {
    me {
      id
      username
    }
  }
`