import { useMutation } from '@apollo/client';
import { SIGN_UP } from '../graphql/mutations';

const useCreateUser = () => {
  const [mutate, { data, loading, error }] = useMutation(SIGN_UP, {
    onError: (error) => {
      console.log('graphql error' ,error.graphQLErrors[0].message);
    }
  });

  const createUser = async (userCredentials) => {
    const { data, loading, error } = await mutate({ 
      variables: { user: { ...userCredentials } }
     });

     return data;
  };

  return createUser;
};

export default useCreateUser;