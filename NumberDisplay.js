import * as React from 'react';
import {StyleSheet, Text} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

function NumberDisplay({phoneNumberArrayOfKeyLetters}) {
  return (
    <>
      <Text style={styles.codedNumber}>{phoneNumberArrayOfKeyLetters}</Text>
    </>
  );
}

const styles = StyleSheet.create({
  codedNumber: {
    backgroundColor: Colors.azure,
    flex: 1,
    height: 100,
    fontFamily: 'Arial',
    fontSize: 20,
    color: Colors.white,
  },
});

export default NumberDisplay;
