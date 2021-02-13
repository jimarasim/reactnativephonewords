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
      />
    </>
  );
}

const styles = StyleSheet.create({
  inputNumber: {
    backgroundColor: Colors.azure,
    flex: 1,
    height: 100,
    fontFamily: 'Arial',
    fontSize: 50,
    color: Colors.white,
  },
});

export default NumberInput;
