import { Text, View } from "react-native";

const RepositoryItemDescription = ({ name, description, styles, language }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <Text>{description}</Text>
      <Text>
        <View style={styles.language.container}>
          <Text style={styles.language.item}>{language}</Text>
        </View>
      </Text>
    </View>
  );
};

export default RepositoryItemDescription;