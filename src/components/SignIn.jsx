import { Formik } from "formik";
import { Pressable, Text, View, StyleSheet } from "react-native";
import FormikTextInput from "./FormikTextInput";
import { Button } from "@react-native-material/core";
import React, { useState } from "react";

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

const SignInForm = ({ onSubmit, showPassword }) => {
  return(
    <View style={styles.container}>
      <FormikTextInput name="username" placeholder="Username" style={styles.fields} />
      <FormikTextInput name="password" placeholder="Password" showPassword={showPassword} style={styles.fields} />
      <View style={styles.submit}><Button title="Sign in" onPress={onSubmit} style={styles.submit} /></View>
    </View>
  )
}

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(true);

  const onSubmit = values => {
    const username = String(values.username);
    const password = String(values.password);
    setShowPassword(showPassword === true ? false : true);

    if (username && password) {
      console.log(values);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} showPassword={showPassword} />}
    </Formik>
  );
};

export default SignIn;