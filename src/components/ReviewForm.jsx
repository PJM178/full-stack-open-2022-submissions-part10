import { Formik } from 'formik';
import { View, StyleSheet, Alert } from 'react-native';
import FormikTextInput from "./FormikTextInput";
import { Button } from "@react-native-material/core";
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';

import useCreateReview from '../hooks/useCreateReview';
import useRepository from '../hooks/useRepository';

const styles = StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: 'white',
  },
  submit: {
    padding: 5,
  },
  fields: {
    padding: 5,
  },
});

const initialValues = {
  repOwner: '',
  repName: '',
  repRating: '',
  repText: '',
}

const validationSchema = yup.object().shape({
  repOwner: yup
    .string()
    .typeError('Must be a string')
    .required("Owner's username is required"),
  repName: yup
    .string()
    .required('Name is required'),
  repRating: yup
    .number()
    .transform((value, originalValue) => {
      if (originalValue === '') {
        return undefined;
      } else if (String(originalValue).includes(',')) {
        return Number(originalValue.replace(/,/g, '.'));
      } else {
        return value;
      }
    })
    .integer('Must be an integer')
    .typeError('Must be a number')
    .required('Rating is required'),
  repText: yup
    .string(),
});

const ReviewForm = () => {
  const navigate = useNavigate();
  const [createReview, error] = useCreateReview();
  console.log('error from ReviewForm component', error)

  if (error !== undefined) {
    Alert.alert(`Something went wrong`, `${error}`, [
      {
        text: 'OK'
      }
    ])
  }

  const onSubmit = async (values) => {
    console.log(values);
    const review = {
      repositoryName: values.repName,
      rating: Number(values.repRating),
      text: values.repText,
      ownerName: values.repOwner,
    }

    console.log(review);

    const data = await createReview(review);
    console.log('data from onSubmit', data);
    data !== undefined && navigate(`/${data.createReview.repositoryId}`);
  }

  return (
    <Formik 
      onSubmit={onSubmit} 
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <FormikTextInput style={styles.fields} name='repOwner' placeholder='Repository owner name' />
          <FormikTextInput style={styles.fields} name='repName' placeholder='Repository name' />
          <FormikTextInput style={styles.fields} name='repRating' placeholder='Rating between 0 and 100' />
          <FormikTextInput multiline={true} style={styles.fields} name='repText' placeholder='Review' />
          <View style={styles.submit}>
            <Button title="Create a review" onPress={handleSubmit} style={styles.submit} />
          </View>
        </View>
      )}
 
    </Formik>
  );
};

export default ReviewForm;