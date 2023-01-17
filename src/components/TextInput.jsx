import {  StyleSheet } from 'react-native';
import { TextInput as NativeTextInput } from '@react-native-material/core';

const styles = StyleSheet.create({});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [style];
  console.log(textInputStyle)
  console.log(error)
  return <NativeTextInput variant='outlined' color={error === undefined || error === false ? 'primary' : props.errorColor} style={textInputStyle} {...props} />;
};

export default TextInput;