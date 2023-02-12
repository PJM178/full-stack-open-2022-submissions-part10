import { Formik } from 'formik';
import { StyleSheet, View } from 'react-native';
import FormikTextInput from "./FormikTextInput";
import { Button } from "@react-native-material/core";
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';

import useCreateUser from '../hooks/useCreateUser';
import useSignIn from '../hooks/useSignIn';

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

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1, ({ min }) => `Username must be longer than ${min} character`)
    .max(20, ({ max }) => `Username must be shorter than ${max} characters`)
    .required('Username is required'),
  password: yup
    .string()
    .min(5, ({ min }) => `Password must be longer than ${min} characters`)
    .max(50, ({ max }) => `Password must be shorter than ${max} characters`)
    .required('Password is required'),
  passwordConfirmation: yup
    .string()
    .min(5)
    .max(50)
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Password confirmation is required'),
})

const initialValues = {
  username: '',
  password: '',
  passwordConfirmation: '',
};

const SignUpForm = () => {
  const navigate = useNavigate();
  const createUser = useCreateUser();
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const userCredentials = {
      username: values.username,
      password: values.password,
    };

    const data = await createUser(userCredentials);

    if (data !== undefined) {
      await signIn({ ...userCredentials })
      navigate('/')
    }
  }

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <FormikTextInput style={styles.fields} name='username' placeholder='Username' />
          <FormikTextInput style={styles.fields} name='password' placeholder='Password' />
          <FormikTextInput style={styles.fields} name='passwordConfirmation' placeholder='Password confirmation' />
          <View style={styles.submit}>
            <Button title="Sign up" onPress={handleSubmit} style={styles.submit} />
          </View>
        </View>
      )} 
    </Formik>
  );
};

export default SignUpForm;