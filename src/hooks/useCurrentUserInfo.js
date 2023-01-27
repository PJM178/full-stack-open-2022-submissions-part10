import { useQuery } from '@apollo/client';
import { GET_CURRENTUSER } from '../graphql/queries';

const userCurrentUserInfo = () => {
  const { loading, error, data } = useQuery(GET_CURRENTUSER, {
    fetchPolicy: 'cache-and-network'
  });

  if (loading) return { loading };
  if (error) return { error };

  const currentUser = data;

  return { currentUser };
};

export default userCurrentUserInfo;