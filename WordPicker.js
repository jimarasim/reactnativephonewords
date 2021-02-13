import * as React from 'react';
import {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';

function WordPicker({phoneNumberSubset, words}) {
  const [selectedLabel, setSelectedLabel] = useState(phoneNumberSubset);
  console.log(words);
  return (
    <Picker
      style={styles.picker}
      selectedValue={selectedLabel}
      onValueChange={(itemValue) => setSelectedLabel(itemValue)}>
      <Picker.Item label={phoneNumberSubset} value="0" />
      {words.map((valueOfWord, indexOfWord) => {
        return (
          <Picker.Item
            key={indexOfWord}
            label={valueOfWord}
            value={indexOfWord}
          />
        );
      })}
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
