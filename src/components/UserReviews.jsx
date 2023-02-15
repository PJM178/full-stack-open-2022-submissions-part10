import { FlatList, StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import { format } from 'date-fns';

import userCurrentUserInfo from '../hooks/useCurrentUserInfo';

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
          <Text style={styles.reviewItemComponent.reviewItemUser}>{review.repository.fullName}</Text>
          <Text style={styles.reviewItemComponent.reviewItemDate}>{format(new Date(review.createdAt), 'dd.MM.yyyy')}</Text>
        </View>
        <Text>{review.text}</Text>
      </View>
    </View>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

const UserReviews = () => {
  const { currentUser, loading, fetchMore } = userCurrentUserInfo(true, { reviewsFirst3: 8 });
  
  console.log('loading', loading);
  console.log('userReviews component', currentUser);

  const reviewList = currentUser
  ? currentUser.me.reviews.edges.map(edge => edge.node)
  : [];

  const onEndReach = () => {
    console.log('end of reviews')
    fetchMore();
  };

  if (loading) {
    return (
      <View style={activityIndicator}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }

  console.log('reviewList', reviewList)

  return (
    <FlatList 
      data={reviewList}
      renderItem={({ item }) => <ReviewItem review={item} />}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={() => onEndReach()}
    />
  );
};

export default UserReviews;