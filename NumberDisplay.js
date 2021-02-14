import * as React from 'react';
import {StyleSheet, Text} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

function NumberDisplay({phoneNumberArrayOfKeyLetters}) {
  return (
    <>
      <Text style={styles.codedNumber}>[{phoneNumberArrayOfKeyLetters}]</Text>
    </>
  );
}

const styles = StyleSheet.create({
  codedNumber: {
    backgroundColor: Colors.azure,
    fontFamily: 'Arial',
    fontSize: 17,
    color: Colors.white,
    marginVertical: 10,
  },
});

export default NumberDisplay;
