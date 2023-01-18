import { Formik } from "formik";
import { Pressable, Text, View, StyleSheet, Platform } from "react-native";
import FormikTextInput from "./FormikTextInput";
import { Button } from "@react-native-material/core";
import React, { useState } from "react";
import * as yup from 'yup';

const initialValues = {
  username: '',
  password: '',
};

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
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
});

const SignInForm = ({ onSubmit, showPassword, passwordVisibilityToggle }) => {
  return(
    <View style={styles.container}>
      <FormikTextInput name="username" placeholder="Username" style={styles.fields} />
      <FormikTextInput name="password" placeholder="Password" showPassword={showPassword} style={styles.fields} />
      <View style={styles.submit}><Button title="Sign in" onPress={() => {onSubmit(); passwordVisibilityToggle()}} style={styles.submit} /></View>
    </View>
  )
}

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(true);

  const passwordVisibilityToggle = () => {
    setShowPassword(showPassword === true ? false : true);
  };

  const onSubmit = values => {
    const username = String(values.username);
    const password = String(values.password);

    if (username && password) {
      console.log(values);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} showPassword={showPassword} passwordVisibilityToggle={passwordVisibilityToggle} />}
    </Formik>
  );
};

export default SignIn;