import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';

import theme from '../theme';
import AppBarTab from './AppBarTab';
import useAuthStorage from '../hooks/useAuthStorage';
import useCurrentUserInfo from '../hooks/useCurrentUserInfo';
import { useApolloClient } from '@apollo/client';

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
  const apolloClient = useApolloClient();
  const { currentUser, error, loading } = useCurrentUserInfo();
  const authStorage = useAuthStorage();

  const handleLogOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
  };
  
  console.log('appbar current user:',currentUser);
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to={'/'}>
          <AppBarTab style={styles.text} text={'Repositories'}  />
        </Link>
        
        {currentUser !== undefined && currentUser.me !== null
          ? <>
            <Link to={'/review'}>
              <AppBarTab style={styles.text} text={'Create a review'} />
            </Link>
            <Link onPress={handleLogOut}  to={'/'}>
              <AppBarTab style={styles.text} text={'Sign Out'}  />
            </Link>
            </> 
          : <Link to={'/signin'}>
              <AppBarTab style={styles.text} text={'Sign In'}  />
            </Link>
            
        }
        <Link to={'/bmicalculator'}>
          <AppBarTab style={styles.text} text={'BMI Calculator'}  />
        </Link>
      </ScrollView>
    </View>
  );
};

export default AppBar;