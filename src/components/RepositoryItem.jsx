import { View, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { Link, useNavigate, useParams, useLocation } from 'react-router-native';
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
  },
  activityIndicator: {
    flex: 1/2,
    justifyContent: 'center',
  },
});


const RepositoryItem = ({ item }) => {
  // useLocation - a way to pass parameters with navigate()
  const openGithub = item === undefined ? true : false;
  const rep = item === undefined ? useLocation().state : item;
  console.log(rep);
  console.log('state from navigate',);
  const { repositoryId } = useParams();
  console.log(repositoryId);
  const navigate = useNavigate();
 
  // const handlePress = () => {
  //   if (item !== undefined) {
  //     navigate(`/${item.id}`, { item: item });
  //   }
  // };

  const handlePress = () => {
    navigate(`/${rep.id}`, { state: rep });
  };

  // if (item === undefined) {
  //   const { repository, error, loading } = useRepository(repositoryId);
  //   if (!repository) {
  //     return (
  //       <View style={styles.activityIndicator}>
  //         <ActivityIndicator size="large" color="#0000ff" />
  //       </View>
  //     )
  //   } else {
  //     const item = repository;
  //     return (
  //       <View testID="repositoryItem" key={item.id} style={styles.container}>
  //         <Pressable onPress={handlePress}>
  //         <View style={styles.item}>
  //           <RepositoryItemAvatar image={item.ownerAvatarUrl} />
  //           <RepositoryItemDescription name={item.fullName} description={item.description} 
  //             styles={styles.descriptionComponent} language={item.language} />
  //         </View>
  //         <RepositoryItemStats stars={item.stargazersCount} forks={item.forksCount} 
  //           reviews={item.reviewCount} rating={item.ratingAverage} style={styles} />
  //         </Pressable>
  //         <View style={styles.button}>
  //           <Button title="Open in GitHub" onPress={() => Linking.openURL(item.url)}/>
  //         </View>
          
  //       </View>
  //     );
  //   }
  // } else {
  //   return (
  //     <View testID="repositoryItem" key={item.id} style={styles.container}>
  //       <Pressable onPress={handlePress}>
  //       <View style={styles.item}>
  //         <RepositoryItemAvatar image={item.ownerAvatarUrl} />
  //         <RepositoryItemDescription name={item.fullName} description={item.description} 
  //           styles={styles.descriptionComponent} language={item.language} />
  //       </View>
  //       <RepositoryItemStats stars={item.stargazersCount} forks={item.forksCount} 
  //         reviews={item.reviewCount} rating={item.ratingAverage} style={styles} />
  //       </Pressable>
  //     </View>
  //   );
  // }

  return (
    <View testID="repositoryItem" key={rep.id} style={styles.container}>
      <Pressable onPress={handlePress}>
      <View style={styles.item}>
        <RepositoryItemAvatar image={rep.ownerAvatarUrl} />
        <RepositoryItemDescription name={rep.fullName} description={rep.description} 
          styles={styles.descriptionComponent} language={rep.language} />
      </View>
      <RepositoryItemStats stars={rep.stargazersCount} forks={rep.forksCount} 
        reviews={rep.reviewCount} rating={rep.ratingAverage} style={styles} />
      </Pressable>
      {openGithub ? 
        <View style={styles.button}>
          <Button title="Open in GitHub" onPress={() => Linking.openURL(item.url)}/>
        </View> :
        null
      }
    </View>
  );
};

export default RepositoryItem;