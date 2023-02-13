import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, View, StyleSheet, Text } from 'react-native';
import { Searchbar } from 'react-native-paper';
import React from 'react';

import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import QueryList from './QueryList';
import { TextInput } from '@react-native-material/core';

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

// Debounce delay for query
const useDebounceDelay = (value, time = 500) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(value);
    }, time)

    return () => {
      clearTimeout(timeout);
    }
  }, [value, time]);

  return debounceValue;
};

export class RepositoryListContainerTest extends React.Component {
  renderHeader = () => {
    const { selectedSort, setSelectedSort, repFilter, setRepFilter } = this.props;
    const [query, setQuery] = useState('')

    // console.log(useDebounceDelay(query));
    console.log(query)

    const onChangeSearch = value => setRepFilter(value);
    return (
      <View>
        <View style={{ padding: 10 }}>
          <Searchbar 
            placeholder='Search'
            onChangeText={onChangeSearch}
            value={repFilter}
          />
        </View>
        <View style={{ padding: 5, paddingTop: -10}}>
        <QueryList selectedSort={selectedSort} setSelectedSort={setSelectedSort} />
        </View>
      </View>
    );
  };

  render() {
    const { repositories } = this.props;

    const repositoryNodes = repositories
      ? repositories.edges.map(edge => edge.node)
      : [];

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({item}) => (
          <RepositoryItem item={item} />
        )}
        ListHeaderComponent={this.renderHeader}
      />
    );
  }
}

const RepositoryList = () => {
  const [selectedSort, setSelectedSort] = useState(0);
  const [repFilter, setRepFilter] = useState('');
  const { repositories, error, loading } = useRepositories(useDebounceDelay(repFilter), selectedSort);

  // return <RepositoryListContainer repFilter={repFilter} setRepFilter={setRepFilter} selectedSort={selectedSort} setSelectedSort={setSelectedSort} repositories={repositories} error={error} loading={loading} />;
  return (
    <RepositoryListContainerTest 
      repFilter={repFilter} 
      setRepFilter={setRepFilter} 
      selectedSort={selectedSort} 
      setSelectedSort={setSelectedSort} 
      repositories={repositories} 
      error={error} 
      loading={loading} 
    />
  );
};

export default RepositoryList;