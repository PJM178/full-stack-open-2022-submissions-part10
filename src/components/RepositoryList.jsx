import { useState } from 'react';
import { ActivityIndicator, FlatList, View, StyleSheet, Text } from 'react-native';
import {Picker} from '@react-native-picker/picker';

import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import QueryList from './QueryList';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const activityIndicator = StyleSheet.create({
  flex: 1/2,
  justifyContent: 'center',
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ selectedSort, setSelectedSort, repositories, error, loading }) => {
  // Get the nodes from the edges array - "repositories" is 
  //  not defined before this is called hence the ternary
  const repositoryNodes = repositories
  ? repositories.edges.map(edge => edge.node)
  : [];

  if (error) {
    return (
      <Text>{`Error! ${error}`}</Text>
    );
  };

  if (!repositories) {
    return (
      <View style={activityIndicator}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }
  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({item}) => (
        <RepositoryItem item={item} />
      )}
      ListHeaderComponent={
        <QueryList selectedSort={selectedSort} setSelectedSort={setSelectedSort} />
      }
    />
  );
};

const RepositoryList = () => {
  const [selectedSort, setSelectedSort] = useState({orderBy: "CREATED_AT", orderDirection: "ASC"});
  const { repositories, error, loading } = useRepositories(selectedSort);

  return <RepositoryListContainer selectedSort={selectedSort} setSelectedSort={setSelectedSort} repositories={repositories} error={error} loading={loading} />;
};

export default RepositoryList;