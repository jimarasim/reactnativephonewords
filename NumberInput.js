import * as React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

function NumberInput({id, action}) {
  return (
    <>
      <TextInput
        type="search"
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
    backgroundColor: 'lightcyan',
    flex: 1,
    width: '100%',
    height: 100,
    fontFamily: 'Arial',
    fontSize: 50,
    color: Colors.black,
    marginVertical: 10,
  },
});

export default NumberInput;
