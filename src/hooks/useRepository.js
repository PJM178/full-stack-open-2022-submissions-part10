import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (repositoryId) => {
  const { loading, error, data } = useQuery(GET_REPOSITORY, {
    variables: { repositoryId: repositoryId },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) return { loading };
  if (error) return { error };

  const repository = data.repository;

  return { repository };
};

export default useRepository;