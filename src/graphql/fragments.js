import { gql } from '@apollo/client';

export const CORE_REPOSITORIES_FIELDS = gql`
  fragment CoreRepositoriesFields on Repository {
    createdAt
    description
    forksCount
    fullName
    id
    language
    name
    ownerAvatarUrl
    ownerName
    ratingAverage
    reviewCount
    stargazersCount
    url
  }
`;