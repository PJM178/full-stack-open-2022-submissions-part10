import { useQuery } from '@apollo/client';
import { GET_REVIEWS } from '../graphql/queries';

const useReviews = (repositoryId) => {
  const { loading, error, data } = useQuery(GET_REVIEWS, {
    variables: { repositoryId: repositoryId },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return { loading };
  if (error) return { error };

  const reviews = data.repository.reviews;

  return { reviews };
};

export default useReviews;