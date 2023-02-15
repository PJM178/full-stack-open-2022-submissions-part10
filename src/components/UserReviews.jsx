import { FlatList, StyleSheet, View, Text, ActivityIndicator, Alert } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import { format } from 'date-fns';
import { Button } from '@react-native-material/core';
import { useNavigate } from 'react-router-native';

import userCurrentUserInfo from '../hooks/useCurrentUserInfo';
import useDeleteReview from '../hooks/useDeleteReview';

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
    container: {
      flexDirection: 'row',
      padding: 10,
      justifyContent: 'space-around',
    },
    view: {
      padding: 10,
    },
    delete: {
      padding: 10,
      backgroundColor: 'red',
    },
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

const ReviewItem = ({ review, refetch }) => {
  const [deleteReview, error] = useDeleteReview();
  const navigate = useNavigate();

  if (error !== undefined) {
    Alert.alert(`Something went wrong`, `${error}`, [
      {
        text: 'OK'
      }
    ])
  }

  const handleDeleteReview = async (id) => {
    Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
      {text: 'Cancel'},
      {text: 'Delete', onPress: async () => {await deleteReview(id), refetch();}}
    ])
    // await deleteReview(id);
    // refetch();
  }

  return (
    <View style={{ backgroundColor: 'white' }}>
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
      <View style={styles.button.container}>
        <Button style={styles.button.view} title="View repository" onPress={() => navigate(`/${review.repository.id}`)} />
        <Button style={styles.button.delete} title="Delete review" onPress={() => handleDeleteReview(review.id)} />
      </View>
    </View>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

const UserReviews = () => {
  const { currentUser, loading, fetchMore, refetch } = userCurrentUserInfo(true, { reviewsFirst3: 8 });
  
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

  return (
    <FlatList 
      data={reviewList}
      renderItem={({ item }) => <ReviewItem review={item} refetch={refetch} />}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={() => onEndReach()}
    />
  );
};

export default UserReviews;