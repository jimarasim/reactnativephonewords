import * as React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

function NumberInput({id, action, maxLength}) {
  return (
    <>
      <TextInput
        type="search"
        id={id}
        onChangeText={action}
        maxLength={parseInt(maxLength)}
        placeholder="Enter 10 Digits"
        style={styles.inputNumber}
        keyboardType="numeric"
      />
    </>
  );
}

const styles = StyleSheet.create({
  inputNumber: {
    backgroundColor: 'cyan',
    flex: 1,
    width: '80%',
    height: 100,
    fontFamily: 'Arial',
    fontSize: 50,
    color: Colors.black,
    marginVertical: 10,
  },
});

export default NumberInput;
