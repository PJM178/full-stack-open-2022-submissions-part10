import { View, Text, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import theme from '../theme';

import RepositoryItemDescription from './RepositoryItemDescription';
import RepositoryItemAvatar from './RepositoryItemAvatar';
import RepositoryItemStats from './RepositoryItemStats';

const styles = StyleSheet.create({
  container: {
    padding: Constants.statusBarHeight/4,
    backgroundColor: 'white',
  },
  item: {
    flexDirection: 'row',
    color: 'green',
  },
  descriptionComponent: {
    container: {
      marginLeft: Constants.statusBarHeight/4,
      flexShrink: 1,
    },
    name: {
      fontWeight: theme.repositoryItem.fontWeights.bold,
    },
    language: {
      container:{
        backgroundColor: '#0366d6',
        borderRadius: 5,
      },
      item: {
        padding: Constants.statusBarHeight/8,
        color: 'white',
      },
    },
  },
  statsComponent: {
    container: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    itemAmount: {
      fontWeight: theme.repositoryItem.fontWeights.bold,
    },
    item: {
      alignItems: 'center',
    },
  },
});

const RepositoryItem = ({ item }) => {
  return (
    <View key={item.id} style={styles.container}>
      <View style={styles.item}>
        <RepositoryItemAvatar image={item.ownerAvatarUrl} />
        <RepositoryItemDescription name={item.fullName} description={item.description} 
          styles={styles.descriptionComponent} language={item.language} />
      </View>
      <RepositoryItemStats stars={item.stargazersCount} forks={item.forksCount} 
        reviews={item.reviewCount} rating={item.ratingAverage} style={styles} />
    </View>
  );
};

export default RepositoryItem;