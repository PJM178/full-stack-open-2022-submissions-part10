import { useQuery } from '@apollo/client';
import { GET_REVIEWS } from '../graphql/queries';

const useReviews = (first, repositoryId) => {
  const { loading, error, data, fetchMore } = useQuery(GET_REVIEWS, {
    variables: { ...first, repositoryId: repositoryId },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return { loading };
  if (error) return { error };

  const handleFetchMore = () => {
    const canFetchMore = !loading && data.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        reviewsAfter2: data.repository.reviews.pageInfo.endCursor,
      },
    });
  };

  const reviews = data.repository.reviews;

  return { reviews, fetchMore: handleFetchMore };
};

export default useReviews;