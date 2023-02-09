import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigate, useParams } from 'react-router-native';
import useRepository from '../hooks/useRepository';
import Constants from 'expo-constants';
import { Button } from "@react-native-material/core";
import * as Linking from 'expo-linking';

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
  button: {
    padding: 5,
  }
});


const RepositoryItem = ({ item }) => {
  const { repositoryId } = useParams();
  const navigate = useNavigate();

  const handlePress = () => {
    if (item !== undefined) {
      navigate(`/${item.id}`)
    }
  };

  if (item === undefined) {
    const { repository, error, loading } = useRepository(repositoryId);
    if (repository) {
      const item = repository
      return (
        <View testID="repositoryItem" key={item.id} style={styles.container}>
          <Pressable onPress={handlePress}>
          <View style={styles.item}>
            <RepositoryItemAvatar image={item.ownerAvatarUrl} />
            <RepositoryItemDescription name={item.fullName} description={item.description} 
              styles={styles.descriptionComponent} language={item.language} />
          </View>
          <RepositoryItemStats stars={item.stargazersCount} forks={item.forksCount} 
            reviews={item.reviewCount} rating={item.ratingAverage} style={styles} />
          </Pressable>
          <View style={styles.button}>
            <Button title="Open in GitHub" onPress={() => Linking.openURL(item.url)}/>
          </View>
          
        </View>
      );
    }
  } else {
    return (
      <View testID="repositoryItem" key={item.id} style={styles.container}>
        <Pressable onPress={handlePress}>
        <View style={styles.item}>
          <RepositoryItemAvatar image={item.ownerAvatarUrl} />
          <RepositoryItemDescription name={item.fullName} description={item.description} 
            styles={styles.descriptionComponent} language={item.language} />
        </View>
        <RepositoryItemStats stars={item.stargazersCount} forks={item.forksCount} 
          reviews={item.reviewCount} rating={item.ratingAverage} style={styles} />
        </Pressable>
      </View>
    );
  }
};

export default RepositoryItem;