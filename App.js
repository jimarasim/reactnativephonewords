/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  StatusBar,
  FlatList,
  Text,
  Button,
  View,
  Keyboard,
} from "react-native";
import ScrollableTabView from "react-native-scrollable-tab-view";
import { Colors } from "react-native/Libraries/NewAppScreen";
import NumberInput from "./NumberInput";
import NumberDisplay from "./NumberDisplay";
import WordPicker from "./WordPicker";
import WordAndDefinitionList from "./WordAndDefinitionList";

const App: () => React$Node = () => {
  const [phoneNumber, setPhoneNumber] = useState(Array(10).fill(""));
  const [areaCodeWords, setAreaCodeWords] = useState([]);
  const [prefixWords, setPrefixWords] = useState([]);
  const [suffixWords, setSuffixWords] = useState([]);
  useEffect(() => {
      let newAreaCodeWords = [];
      let newPrefixWords = [];
      let newSuffixWords = [];
      if (phoneNumber[9]) {
        [newAreaCodeWords, newPrefixWords, newSuffixWords] = getWordCombinations(
          phoneNumber,
        );
        Keyboard.dismiss();
      }
      setAreaCodeWords(newAreaCodeWords);
      setPrefixWords(newPrefixWords);
      setSuffixWords(newSuffixWords);
  }, [phoneNumber]);
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeAreaView}>
        <NumberInput id="phonenumber" action={(text) => handleNumberInputChange(text, setPhoneNumber)} />
        <NumberDisplay phoneNumberArrayOfKeyLetters={phoneNumber} />
      </SafeAreaView>
      <ScrollableTabView>
        <WordAndDefinitionList words={areaCodeWords} setWords={setAreaCodeWords} tabLabel="AREA" phone={phoneNumber} />
        <WordAndDefinitionList words={prefixWords} setWords={setPrefixWords} tabLabel="PREFIX" phone={phoneNumber} />
        <WordAndDefinitionList words={suffixWords} setWords={setSuffixWords} tabLabel="SUFFIX" phone={phoneNumber} />
      </ScrollableTabView>
      <SafeAreaView style={styles.viewPicker}>
        <WordPicker phoneNumberSubset="AREA" words={areaCodeWords} phone={phoneNumber} />
        <WordPicker phoneNumberSubset="PREFIX" words={prefixWords} phone={phoneNumber} />
        <WordPicker phoneNumberSubset="SUFFIX" words={suffixWords} phone={phoneNumber} />
      </SafeAreaView>
      <SafeAreaView style={styles.copyButton}>
        <Button id="copyButton" style={styles.copyButton} title="Copy"></Button>
      </SafeAreaView>
    </>
  );
};

function handleNumberInputChange(text, setPhoneNumber) {
  const keyLetters = [
    "0",
    "1",
    "abc",
    "def",
    "ghi",
    "jkl",
    "mno",
    "pqrs",
    "tuv",
    "wxyz",
  ];
  let newCodedPhoneNumberArray = Array(10).fill("");
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
  let newAreaCodeWords = [];
  let newPrefixWords = [];
  let newSuffixWords = [];
  //AREA
  for (let i = 0; i < newCodedPhoneNumberArray[0].length; i++) {
    for (let j = 0; j < newCodedPhoneNumberArray[1].length; j++) {
      for (let k = 0; k < newCodedPhoneNumberArray[2].length; k++) {
        newAreaCodeWords.push([
          newCodedPhoneNumberArray[0][i] +
          newCodedPhoneNumberArray[1][j] +
          newCodedPhoneNumberArray[2][k], 'NO DEFINITION']);
      }
    }
  }
  for (let i = 0; i < newCodedPhoneNumberArray[3].length; i++) {
    for (let j = 0; j < newCodedPhoneNumberArray[4].length; j++) {
      for (let k = 0; k < newCodedPhoneNumberArray[5].length; k++) {
        newPrefixWords.push([
          newCodedPhoneNumberArray[3][i] +
          newCodedPhoneNumberArray[4][j] +
          newCodedPhoneNumberArray[5][k], 'NO DEFINITION']);
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
            newCodedPhoneNumberArray[9][l], 'NO DEFINITION']);
        }
      }
    }
  }
  return [newAreaCodeWords, newPrefixWords, newSuffixWords];
}

const styles = StyleSheet.create({
  viewPicker: {
    flex: 0,
    flexDirection: "row",
    width: "33.3%",
    alignContent: "center",
    marginVertical: 5,
  },
  safeAreaViewDefinitionList: {
    flex: 5,
    backgroundColor: Colors.black,
  },
  safeAreaView: {
    flex: 0,
    width: "100%",
    alignContent: "center",
  },
  wordsView: {
    flexDirection: "column",
  },
});

export default App;
