/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, ScrollView, StatusBar} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import NumberInput from './NumberInput';
import NumberDisplay from './NumberDisplay';

const App: () => React$Node = () => {
  const [phoneNumber, setPhoneNumber] = useState(Array(10).fill(''));
  const [areaCodeWords, setAreaCodeWords] = useState(Array(Array(2)));
  const [prefixWords, setPrefixWords] = useState(Array(Array(2)));
  const [suffixWords, setSuffixWords] = useState(Array(Array(2)));
  const [showCopyButtons, setShowCopyButtons] = useState(false);
  useEffect(() => {
    let newAreaCodeWords = Array(Array(2));
    let newPrefixWords = Array(Array(2));
    let newSuffixWords = Array(Array(2));
    if (phoneNumber[9]) {
      [newAreaCodeWords, newPrefixWords, newSuffixWords] = getWordCombinations(
        phoneNumber,
      );
      setAreaCodeWords(newAreaCodeWords);
      setPrefixWords(newPrefixWords);
      setSuffixWords(newSuffixWords);
    } else {
      setShowCopyButtons(false);
    }
  }, [phoneNumber]);
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <NumberInput
            id="phonenumber"
            maxLength="10"
            action={(text) => handleNumberInputChange(text, setPhoneNumber)}
          />
          <NumberDisplay phoneNumberArrayOfKeyLetters={phoneNumber} />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

function handleNumberInputChange(text, setPhoneNumber) {
  const keyLetters = [
    '0',
    '1',
    'abc',
    'def',
    'ghi',
    'jkl',
    'mno',
    'pqrs',
    'tuv',
    'wxyz',
  ];
  let newCodedPhoneNumberArray = Array(10).fill('');
  for (let i = 0; i < text.length; i++) {
    if (parseInt(text[i]) >= 0 && parseInt(text[i]) <= 9) {
      newCodedPhoneNumberArray[i] = keyLetters[parseInt(text[i])];
    } else {
      newCodedPhoneNumberArray[i] = text[i];
    }
  }
  setPhoneNumber(newCodedPhoneNumberArray);
}

function getWordCombinations(newCodedPhoneNumberArray) {
  let newAreaCodeWords = Array(Array(2));
  let newPrefixWords = Array(Array(2));
  let newSuffixWords = Array(Array(2));
  //AREA
  for (let i = 0; i < newCodedPhoneNumberArray[0].length; i++) {
    for (let j = 0; j < newCodedPhoneNumberArray[1].length; j++) {
      for (let k = 0; k < newCodedPhoneNumberArray[2].length; k++) {
        newAreaCodeWords.push([
          newCodedPhoneNumberArray[0][i] +
          newCodedPhoneNumberArray[1][j] +
          newCodedPhoneNumberArray[2][k],
          '',
        ]);
      }
    }
  }
  for (let i = 0; i < newCodedPhoneNumberArray[3].length; i++) {
    for (let j = 0; j < newCodedPhoneNumberArray[4].length; j++) {
      for (let k = 0; k < newCodedPhoneNumberArray[5].length; k++) {
        newPrefixWords.push([
          newCodedPhoneNumberArray[3][i] +
          newCodedPhoneNumberArray[4][j] +
          newCodedPhoneNumberArray[5][k],
          '',
        ]);
      }
    }
  }
  for (let i = 0; i < newCodedPhoneNumberArray[6].length; i++) {
    for (let j = 0; j < newCodedPhoneNumberArray[7].length; j++) {
      for (let k = 0; k < newCodedPhoneNumberArray[8].length; k++) {
        for (let l = 0; l < newCodedPhoneNumberArray[9].length; l++) {
          newSuffixWords.push([
            newCodedPhoneNumberArray[6][i] +
            newCodedPhoneNumberArray[7][j] +
            newCodedPhoneNumberArray[8][k] +
            newCodedPhoneNumberArray[9][l],
            '',
          ]);
        }
      }
    }
  }
  return [newAreaCodeWords, newPrefixWords, newSuffixWords];
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.black,
  },
});

export default App;
