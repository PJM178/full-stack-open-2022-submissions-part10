import { Formik } from "formik";
import { Pressable, Text, View, StyleSheet, Platform } from "react-native";
import FormikTextInput from "./FormikTextInput";
import { Button } from "@react-native-material/core";
import React, { useState } from "react";
import { useNavigate } from 'react-router-native';
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

const SignInForm = ({ onSubmit, showPassword, passwordVisibilityToggle }) => {
  return(
    <View style={styles.container}>
      <FormikTextInput name="username" placeholder="Username" style={styles.fields} />
      <FormikTextInput name="password" placeholder="Password" showPassword={showPassword} style={styles.fields} />
      <View style={styles.submit}><Button title="Sign in" onPress={() => {onSubmit()}} style={styles.submit} /></View>
    </View>
  )
}

export default SignInForm;