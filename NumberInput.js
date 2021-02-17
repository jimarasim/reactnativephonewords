import * as React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

function NumberInput({id, action}) {
  return (
    <>
      <TextInput
        type="search"
        keyExtractor={id}
        id={id}
        onChangeText={action}
        maxLength={10}
        placeholder="Enter 10 Digits"
        style={styles.inputNumber}
        keyboardType="numeric"
        clearButtonMode="always"
      />
    </>
  );
}

const styles = StyleSheet.create({
  inputNumber: {
    borderWidth: 5,
    backgroundColor: 'lightcyan',
    width: '100%',
    height: 100,
    fontFamily: 'Arial',
    fontSize: 50,
    color: Colors.black,
  },
});

export default NumberInput;
