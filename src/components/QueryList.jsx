import { View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useEffect, useState } from 'react';

const QueryList = ({ setSelectedSort, selectedSort }) => {
  const [value, setValue] = useState(null);
  return (
    <Picker
    selectedValue={value}
    onValueChange={(itemValue, itemIndex) => {
      setValue(itemIndex)
      setSelectedSort(itemValue)
    }}
  >
    <Picker.Item color='grey' label="Select an item..." value={"Select an item..."} />
    <Picker.Item label="Latest repositories" value={{orderBy: "CREATED_AT", orderDirection: "ASC"}} />
    <Picker.Item label="Highest rated repositories" value={{orderBy: "RATING_AVERAGE", orderDirection: "DESC"}} />
    <Picker.Item label="Lowest rated repositories" value={{orderBy: "RATING_AVERAGE", orderDirection: "ASC"}} />
  </Picker>
  );
}

export default QueryList;