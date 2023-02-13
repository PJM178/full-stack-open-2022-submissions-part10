import React from "react";
import { View, Text } from "react-native";

export class RepositoryListContainerTest extends React.Component {
  renderHeader = () => {
    // this.props contains the component's props
    const props = this.props;

    // ...
    
    return (
      <RepositoryListHeader
      // ...
      />
    );
  };

  render() {
    return (
      // <FlatList
      //   // ...
      //   ListHeaderComponent={this.renderHeader}
      // />
      <View>
        <Text>Jorma</Text>
      </View>
    );
  }
}