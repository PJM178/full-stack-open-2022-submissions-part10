import { View, StyleSheet, Text } from 'react-native';
import Constants from 'expo-constants';

import theme from '../theme';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.appBar.container.colors.background,
  },
  text: {
    color: theme.appBar.text.colors.primary,
    marginBottom: Constants.statusBarHeight/2,
    marginLeft: Constants.statusBarHeight/4,
  }
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab style={styles.text} text={'Repositories'}  />
    </View>
  );
};

export default AppBar;