import  { useMutation } from '@apollo/client'
import { POST_REVIEW } from '../graphql/mutations'
import useRepository from './useRepository';

const useCreateReview = () => {
  const [mutate, { data, loading, error }] = useMutation(POST_REVIEW, {
    onError: (error) => {
      console.log('graphql error' ,error.graphQLErrors[0].message);
    }
  });

  const createReview = async (review) => {
    const { data, loading, error } = await mutate({ variables: { review: { ...review } }});
    
    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;

    return data;
  }

  return [createReview, error];
};

export default useCreateReview;