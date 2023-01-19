import { View } from "react-native"

import Text from "./Text";

const thousandsHelper = (stat) => {
  if (stat >= 1000) {
    return (stat/1000).toFixed(1)+'k';
  }
  return stat;
};

const RepositoryItemStats = ({ stars, forks, reviews, rating, style }) => {
  return (
    <View style={style.statsComponent.container}>
      <View style={style.statsComponent.item}>
        <Text style={style.statsComponent.itemAmount}>{thousandsHelper(stars)}</Text>
        <Text>Stars</Text>
      </View>
      <View style={style.statsComponent.item}>
        <Text style={style.statsComponent.itemAmount}>{thousandsHelper(forks)}</Text>
        <Text>Forks</Text>
      </View>
      <View style={style.statsComponent.item}>
        <Text style={style.statsComponent.itemAmount}>{thousandsHelper(reviews)}</Text>
        <Text>Reviews</Text>
      </View>
      <View style={style.statsComponent.item}>
        <Text style={style.statsComponent.itemAmount}>{thousandsHelper(rating)}</Text>
        <Text>Rating</Text>
      </View>
    </View>
  );
};

export default RepositoryItemStats;