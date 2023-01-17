import {  StyleSheet } from 'react-native';
import { TextInput as NativeTextInput } from '@react-native-material/core';

const styles = StyleSheet.create({});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [style];

  return <NativeTextInput variant='outlined' style={textInputStyle} {...props} />;
};

export default TextInput;