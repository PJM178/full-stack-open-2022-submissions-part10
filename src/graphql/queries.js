import { gql } from '@apollo/client';

import { CORE_REPOSITORIES_FIELDS } from './fragments';

export const GET_REPOSITORIES = gql`
  ${CORE_REPOSITORIES_FIELDS}
  query Repositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection) {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection) {
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
`;

export const GET_REPOSITORY = gql`
  ${CORE_REPOSITORIES_FIELDS}
  query ($repositoryId: ID!)  {
    repository(id: $repositoryId) {
      ...CoreRepositoriesFields
    }
}
`;

export const GET_REVIEWS = gql`
query Reviews($repositoryId: ID!) {
  repository(id: $repositoryId) {
    id
    fullName
    reviews {
      edges {
        node {
          id
          text
          rating
          createdAt
          user {
            id
            username
          }
        }
      }
    }
  }
}
`