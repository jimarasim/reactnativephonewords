import * as React from 'react';
import {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';

function WordPicker({phoneNumberSubset, words, phone}) {
  const [selectedLabel, setSelectedLabel] = useState(phoneNumberSubset);
  return (
    <Picker
      key={phoneNumberSubset}
      style={styles.picker}
      selectedValue={selectedLabel}
      onValueChange={(value) => setSelectedLabel(value)}>
      {words.map((word, index) => {
        return (
          <Picker.Item
            key={phoneNumberSubset + word[0]}
            label={phone[9] ? word[0] : ''}
            value={phone[9] ? index : '0'}
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
