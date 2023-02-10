import { Formik } from 'formik';
import { View, StyleSheet } from 'react-native';
import FormikTextInput from "./FormikTextInput";
import { Button } from "@react-native-material/core";
import * as yup from 'yup';

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
  "rep-owner": '',
  "rep-name": '',
  "rep-rating": '',
  "rep-text": '',
}

const validationSchema = yup.object().shape({
  "rep-owner": yup
    .string()
    .typeError('Must be a string')
    .required("Owner's username is required"),
  "rep-name": yup
    .string()
    .required('Name is required'),
  "rep-rating": yup
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
  "rep-text": yup
    .string(),
});

const ReviewForm = () => {
  return (
    <Formik 
      onSubmit={values => console.log(values)} 
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <FormikTextInput style={styles.fields} name='rep-owner' placeholder='Repository owner name' />
          <FormikTextInput style={styles.fields} name='rep-name' placeholder='Repository name' />
          <FormikTextInput style={styles.fields} name='rep-rating' placeholder='Rating between 0 and 100' />
          <FormikTextInput multiline={true} style={styles.fields} name='rep-text' placeholder='Review' />
          <View style={styles.submit}>
            <Button title="Create a review" onPress={handleSubmit} style={styles.submit} />
          </View>
        </View>
      )}
 
    </Formik>
  );
};

export default ReviewForm;