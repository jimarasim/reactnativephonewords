import * as React from 'react';
import {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';

function WordPicker({phoneNumberSubset, words, phone}) {
  const [selectedLabel, setSelectedLabel] = useState(phoneNumberSubset);
  if(phone[9]) {
    return (
      <Picker
        key={phoneNumberSubset}
        style={styles.picker}
        selectedValue={selectedLabel}
        onValueChange={(itemValue) => setSelectedLabel(itemValue)}>
        <Picker.Item key={words.length} label={phoneNumberSubset} value="0" />
        {words.map((word, index) => {
          return <Picker.Item key={index} label={word[0]} value={index} />;
        })}
      </Picker>
    );
  } else {
    return (
      <Picker
        key={phoneNumberSubset}
        style={styles.picker}
        selectedValue={selectedLabel}
        onValueChange={(itemValue) => setSelectedLabel(itemValue)}>
        <Picker.Item key={words.length} label={phoneNumberSubset} value="0" />
      </Picker>
    );
  }
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
