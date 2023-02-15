import { gql } from '@apollo/client';

export const SIGN_IN = gql`
  mutation authenticate(
    $username: String!
    $password: String!
  ) {
    authenticate(credentials: { username: $username, password: $password } ) {
      accessToken
    }
  }
`

export const POST_REVIEW = gql`
  mutation CreateReview($review: CreateReviewInput) {
    createReview(review: $review) {
      rating
      id
      text
      user {
        username
      }
      repositoryId
    }
  }
`;

export const SIGN_UP = gql`
  mutation CreateUser($user: CreateUserInput) {
    createUser(user: $user) {
      createdAt
      id
      username
    }
  }
`;

export const DELETE_REVIEW = gql`
  mutation DeleteReview($deleteReviewId: ID!) {
    deleteReview(id: $deleteReviewId)
  }
`