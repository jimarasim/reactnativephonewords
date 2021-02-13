import * as React from 'react';
import {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';

function WordPicker({phoneNumberSubset}) {
  const [choosenLabel, setChoosenLabel] = useState('Native');
  const [choosenIndex, setChoosenIndex] = useState('0');
  return (
    <Picker
      style={styles.picker}
      selectedValue={choosenLabel}
      onValueChange={(itemValue, itemIndex) => {
        setChoosenLabel(itemValue);
        setChoosenIndex(itemIndex);
      }}>
      <Picker.Item label={phoneNumberSubset} value="0" />
      <Picker.Item label="moon" value="1" />
      <Picker.Item label="sun" value="2" />
      <Picker.Item label="star" value="3" />
    </Picker>
  );
}

const styles = StyleSheet.create({
  picker: {
    color: 'white',
    backgroundColor: 'lightgray',
    width: '100%',
    marginVertical: 10,
  },
});

export default WordPicker;
