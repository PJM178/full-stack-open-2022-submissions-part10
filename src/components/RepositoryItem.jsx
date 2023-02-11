import { View, Text, StyleSheet, Pressable, FlatList, ActivityIndicator } from 'react-native';
import { useNavigate, useParams } from 'react-router-native';
import useReviews from '../hooks/useReviews';
import Constants from 'expo-constants';
import { Button } from "@react-native-material/core";
import { format } from 'date-fns';
import * as Linking from 'expo-linking';

import theme from '../theme';

import RepositoryItemDescription from './RepositoryItemDescription';
import RepositoryItemAvatar from './RepositoryItemAvatar';
import RepositoryItemStats from './RepositoryItemStats';
import { useState } from 'react';
import useRepository from '../hooks/useRepository';

const styles = StyleSheet.create({
  singleRepository: {
    marginBottom: 10,
  },
  separator: {
    height: 10,
  },
  container: {
    padding: Constants.statusBarHeight/4,
    backgroundColor: 'white',
  },
  reviewItemComponent : {
    reviewItemContainer: {
      padding: Constants.statusBarHeight/4,
      backgroundColor: 'white',
      flexDirection: 'row',
    },
    reviewItemRating: {
      container: {
        height: 50,
        width: 50,
        borderRadius: 50 / 2,
        borderColor: 'blue',
        borderWidth: 2,
        marginRight: Constants.statusBarHeight/4,
        justifyContent: 'center',
        alignItems: 'center',
      },
      rating: {
        fontWeight: '700',
        color: 'blue',
      }
    },
    reviewItemDate: {
      opacity: 0.6,
      marginBottom: 5,
    },
    reviewItemUser: {
      fontWeight: theme.repositoryItem.fontWeights.bold,
    },
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

const activityIndicator = StyleSheet.create({
  flex: 1/2,
  justifyContent: 'center',
});


const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryInfo = ({ rep, handlePress, openGithub }) => {
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
          <Button title="Open in GitHub" onPress={() => Linking.openURL(rep.url)}/>
        </View> :
        null
      }
    </View>
  );
};

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.reviewItemComponent.reviewItemContainer}>
      <View style={styles.reviewItemComponent.reviewItemRating.container}>
        <View >
          <Text style={styles.reviewItemComponent.reviewItemRating.rating}>{review.rating}</Text>
        </View>
      </View>
      <View style={{ flexShrink: 1 }}>
        <View>
          <Text style={styles.reviewItemComponent.reviewItemUser}>{review.user.username}</Text>
          <Text style={styles.reviewItemComponent.reviewItemDate}>{format(new Date(review.createdAt), 'dd.MM.yyyy')}</Text>
        </View>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

const RepositoryItem = ({ item }) => {
  // useLocation - a way to pass parameters with navigate()
  const { repositoryId } = useParams();
  const openGithub = item === undefined ? true : false;
  const rep = item === undefined ? useRepository(repositoryId) : item;
  const navigate = useNavigate();

  const { reviews, error, loading } = openGithub
    ? useReviews(rep.id)
    : [];

  const reviewList = reviews
    ? reviews.edges.map(edge => edge.node)
    : [];

  const handlePress = () => {
    navigate(`/${rep.id}`, { state: rep });
  };

  if (loading) {
    return (
      <View style={activityIndicator}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }

  return (
    <FlatList
      data={reviewList}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={() => <RepositoryInfo rep={rep} handlePress={handlePress} openGithub={openGithub} />}
      ListHeaderComponentStyle={openGithub && styles.singleRepository}
    />
  );
};

export default RepositoryItem;