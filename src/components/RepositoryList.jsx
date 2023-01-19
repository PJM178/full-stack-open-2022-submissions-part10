import { useState, useEffect } from 'react';
import { FlatList, View, StyleSheet, Text } from 'react-native';

import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { repositories, error, loading } = useRepositories();

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

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({item}) => (
        <RepositoryItem item={item} />
      )}
    />
  );
};

export default RepositoryList;