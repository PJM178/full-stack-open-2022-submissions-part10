import { useQuery } from '@apollo/client';
import { GET_CURRENTUSER } from '../graphql/queries';

const userCurrentUserInfo = (includeReviews, first) => {
  const { loading, error, data, fetchMore } = useQuery(GET_CURRENTUSER, {
    variables: { includeReviews: includeReviews, ...first },
    fetchPolicy: 'cache-and-network'
  });

  if (loading) return { loading };
  if (error) return { error };

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.me.reviews.pageInfo.hasNextPage;
 
    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        reviewsAfter3: data.me.reviews.pageInfo.endCursor,
      },
    });
  };

  const currentUser = data;

  return { currentUser, fetchMore: handleFetchMore };
};

export default userCurrentUserInfo;