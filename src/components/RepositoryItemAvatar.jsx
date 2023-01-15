import { Image, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
  }
});

const RepositoryItemAvatar = ({ image }) => {
  return <Image style={styles.avatar} source={{uri: image,}}/>;
};

export default RepositoryItemAvatar;