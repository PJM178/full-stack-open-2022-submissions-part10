import { gql } from '@apollo/client';

import { CORE_REPOSITORIES_FIELDS } from './fragments';

export const GET_REPOSITORIES = gql`
  ${CORE_REPOSITORIES_FIELDS}
  query Repositories(
    $orderBy: AllRepositoriesOrderBy,
    $orderDirection: OrderDirection,
    $searchKeyword: String,
    $after: String,
    $first: Int
    ){
    repositories(
      orderBy: $orderBy,
      orderDirection: $orderDirection,
      searchKeyword: $searchKeyword,
      after: $after,
      first: $first
      ){
      edges {
        node {
          ...CoreRepositoriesFields
        }
        cursor
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
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
query Reviews($repositoryId: ID!, $reviewsFirst2: Int, $reviewsAfter2: String) {
  repository(id: $repositoryId) {
    id
    fullName
    reviews(first: $reviewsFirst2, after: $reviewsAfter2) {
      totalCount
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
        cursor
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
}
`