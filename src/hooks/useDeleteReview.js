import { useMutation } from "@apollo/client";
import { DELETE_REVIEW } from "../graphql/mutations";

const useDeleteReview = (id) => {
  const [mutate, { data, loading, error }] = useMutation(DELETE_REVIEW, {
    onError: (error) => {
      console.log('graphql error', error.graphQLErrors[0].message);
    }
  });

  const deleteReview = async (id) => {
    const { data, loading, error } = await mutate({ variables: { deleteReviewId: id } });

    if (loading) return loading;
    if (error) return error;

    return data;
  };

  return [deleteReview, error];
};

export default useDeleteReview;