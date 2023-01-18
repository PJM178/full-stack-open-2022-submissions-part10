import { Platform, StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';

import RepositoryList from './RepositoryList';
import SignIn from './SignIn';
import AppBar from './AppBar';
import theme from '../theme';
import BodyMassIndexCalculator from './BMICalculator';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.mainBackground,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path='/' element={<RepositoryList />} exact />
        <Route path='*' element={<Navigate to='/' replace />} />
        <Route path='/signin' element={<SignIn />} exact />
        <Route path='/bmicalculator' element={<BodyMassIndexCalculator />} exact />
      </Routes>
    </View>
  );
};

export default Main;