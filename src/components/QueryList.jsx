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
    <Picker.Item enabled={false} color='grey' label="Select an item..." value={0} />
    <Picker.Item label="Latest repositories" value={1} />
    <Picker.Item label="Highest rated repositories" value={2} />
    <Picker.Item label="Lowest rated repositories" value={3} />
  </Picker>
  );
}

export default QueryList;