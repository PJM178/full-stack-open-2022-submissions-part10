import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';

import theme from '../theme';
import AppBarTab from './AppBarTab';


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: Constants.statusBarHeight/2,
    backgroundColor: theme.appBar.container.colors.background,
  },
  text: {
    paddingTop: Constants.statusBarHeight/2,
    color: theme.appBar.text.colors.primary,
    marginBottom: Constants.statusBarHeight/2,
    marginLeft: Constants.statusBarHeight/4,
    marginRight: Constants.statusBarHeight/4,
  }
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to={'/'}>
          <AppBarTab style={styles.text} text={'Repositories'}  />
        </Link>
        <Link to={'/signin'}>
          <AppBarTab style={styles.text} text={'sign in'}  />
        </Link>
        <Link to={'/bmicalculator'}>
          <AppBarTab style={styles.text} text={'BMI Calculator'}  />
        </Link>
      </ScrollView>
    </View>
  );
};

export default AppBar;