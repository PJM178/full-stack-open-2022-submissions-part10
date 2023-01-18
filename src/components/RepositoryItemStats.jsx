import { View } from "react-native"

import Text from "./Text";

const RepositoryItemStats = ({ stars, forks, reviews, rating, style }) => {
  return (
    <View style={style.statsComponent.container}>
      <View style={style.statsComponent.item}>
        <Text style={style.statsComponent.itemAmount}>{(stars/1000).toFixed(1)}k</Text>
        <Text>Stars</Text>
      </View>
      <View style={style.statsComponent.item}>
        <Text style={style.statsComponent.itemAmount}>{(forks/1000).toFixed(1)}k</Text>
        <Text>Forks</Text>
      </View>
      <View style={style.statsComponent.item}>
        <Text style={style.statsComponent.itemAmount}>{reviews}</Text>
        <Text>Reviews</Text>
      </View>
      <View style={style.statsComponent.item}>
        <Text style={style.statsComponent.itemAmount}>{(rating/1000).toFixed(1)}k</Text>
        <Text>Rating</Text>
      </View>
    </View>
  );
};

export default RepositoryItemStats;