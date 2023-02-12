import { useLazyQuery, useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

// const useRepositories = () => {
//   const [repositories, setRepositories] = useState();
//   const [loading, setLoading] = useState(false);

//   const fetchRepositories = async () => {
//     setLoading(true);
    
//     // Replace the IP address part with your own IP address!
//     const response = await fetch('http://192.168.32.233:5000/api/repositories');
//     const json = await response.json();

//     setLoading(false);
//     setRepositories(json);
//   };

//   useEffect(() => {
//     fetchRepositories();
//   }, []);

//   return { repositories, loading, refetch: fetchRepositories };
// };

// GraphQL
const useRepositories = (selectedSort) => {
  console.log('useREpositories hook', {...selectedSort});
  const { loading, error, data } = useQuery(GET_REPOSITORIES, {
    variables: { ...selectedSort },
    fetchPolicy: 'cache-and-network'
  });

  if (loading) return { loading };
  if (error) return { error };

  const repositories = data.repositories;
  console.log(repositories)
  return { repositories };
};

export default useRepositories;