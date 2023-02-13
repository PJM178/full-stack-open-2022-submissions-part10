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
const useRepositories = (searchKeyword, selectedSort) => {
  const sort = [
    {orderBy: "CREATED_AT", orderDirection: "ASC"},
    {orderBy: "CREATED_AT", orderDirection: "ASC"},
    {orderBy: "RATING_AVERAGE", orderDirection: "DESC"},
    {orderBy: "RATING_AVERAGE", orderDirection: "ASC"},
  ]

  const { loading, error, data } = useQuery(GET_REPOSITORIES, {
    variables: { searchKeyword: searchKeyword, ...sort[selectedSort] },
    fetchPolicy: 'cache-and-network'
  });

  if (loading) return { loading };
  if (error) return { error };

  const repositories = data.repositories;

  return { repositories };
};

export default useRepositories;