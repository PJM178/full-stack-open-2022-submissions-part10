import { useMutation } from '@apollo/client';
import { SIGN_IN } from '../graphql/mutations';
import { useApolloClient } from '@apollo/client';

import useAuthStorage from '../hooks/useAuthStorage';

const useSignIn = () => {
  const client = useApolloClient();
  const authStorage = useAuthStorage();

  const [mutate, result] = useMutation(SIGN_IN, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
    }
  });

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({ variables: { username: username, password: password } })
    await authStorage.setAccessToken(data.authenticate.accessToken);
    await client.resetStore();
    console.log('signin hook', await authStorage.getAccessToken());
    return { data };
  };

  return [signIn, result];
};

export default useSignIn;