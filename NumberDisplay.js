import * as React from 'react';
import {StyleSheet, Text} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

function NumberDisplay({phoneNumberArrayOfKeyLetters}) {
  return (
    <>
      <Text key="numberDisplay" style={styles.codedNumber}>
        [{phoneNumberArrayOfKeyLetters}]
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
  codedNumber: {
    fontFamily: 'Arial',
    fontSize: 17,
    color: Colors.black,
    marginVertical: 10,
    textAlign: 'center',
  },
});

export default NumberDisplay;
