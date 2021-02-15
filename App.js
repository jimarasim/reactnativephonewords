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
import { Colors } from "react-native/Libraries/NewAppScreen";
import NumberInput from "./NumberInput";
import NumberDisplay from "./NumberDisplay";
import WordPicker from "./WordPicker";
import WordAndDefinitionList from "./WordAndDefinitionList";

const App: () => React$Node = () => {
  var ScrollableTabView = require('react-native-scrollable-tab-view');
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
        setAreaCodeWords(newAreaCodeWords);
        setPrefixWords(newPrefixWords);
        setSuffixWords(newSuffixWords);
        areaCodeWords.map((word, index) => {
          fetchDefinitionFromMerriam(word[0], index, areaCodeWords, setAreaCodeWords);
        });
        prefixWords.map((word, index) => {
          fetchDefinitionFromMerriam(word[0], index, prefixWords, setPrefixWords);
        });
        suffixWords.map((word, index) => {
          fetchDefinitionFromMerriam(word[0], index, suffixWords, setSuffixWords);
        });
      } else {
        setAreaCodeWords([]);
        setPrefixWords([]);
        setSuffixWords([]);
      }
  }, [phoneNumber]);
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeAreaView}>
        <NumberInput
          id="phonenumber"
          action={(text) => handleNumberInputChange(text, setPhoneNumber)}
        />
        <NumberDisplay phoneNumberArrayOfKeyLetters={phoneNumber} />
      </SafeAreaView>
      <ScrollableTabView>
        <WordAndDefinitionList words={areaCodeWords} tabLabel="AREA"  />
        <WordAndDefinitionList words={prefixWords} tabLabel="PREFIX" />
        <WordAndDefinitionList words={suffixWords} tabLabel="SUFFIX" />
      </ScrollableTabView>
      <SafeAreaView style={styles.viewPicker}>
        <WordPicker phoneNumberSubset="AREA" words={areaCodeWords} />
        <WordPicker phoneNumberSubset="PREFIX" words={prefixWords} />
        <WordPicker phoneNumberSubset="SUFFIX" words={suffixWords} />
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

function fetchDefinitionFromMerriam(word, index, words, setWords) {
  if (word) {
    word = word.replace("1", "i").replace("0", "o");
    //MERRIAM WEBSTER
    fetch('https://www.dictionaryapi.com/api/v3/references/collegiate/json/' + word + '?key=84b88140-44b3-4a35-bfbb-203d307ad99e')
      .then(res => res.json())
      .then(res => {
        //find the first non-undefined definition
        const numDefs = Object.keys(res).length;
        let i;
        let found = false;
        for (let i = 0; i < numDefs; i++) {
          if (!res[i].hasOwnProperty('shortdef')) throw new Error("NO MERRIAM WEBSTER DEFINITION FOR " + word + " " + JSON.stringify(res));
          if (res[i].shortdef[0]) {
            found = true;
            break;
          }
        }
        if (!found) throw new Error("NO MERRIAM WEBSTER DEFINITION FOR " + word + " " + JSON.stringify(res));
        const definition = res[i].shortdef[0] + " (MERRIAMWEBSTER)";
        words[index][1] = definition;
        console.log("DEFINITION FOUND: " + words[index]);
        setWords(words);
      })
      .catch((message) => {
          console.warn(message);
          fetchDefinitionFromUrban(word, index, words, setWords);
        }
      );
  }
}

function fetchDefinitionFromUrban(word, index, words, setWords) {
  word = word.replace("1", "i").replace("0", "o");
  if(word){
    //URBAN DICTIONARY
    fetch("https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=" + word, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "1c2eed9801msh9a03da88e676433p16db88jsncfe81277ff23",
        "x-rapidapi-host": "mashape-community-urban-dictionary.p.rapidapi.com"
      }
    })
      .then(res => res.json())
      .then (res => {
        //find most thumbs up definition
        const numDefs = Object.keys(res.list).length;
        let bestThumbsUp = 0;
        let bestIndex = 0;
        for(let i=0; i<numDefs; i++){
          if(res.list[i].thumbs_up > bestThumbsUp) {
            bestThumbsUp = res.list[i].thumbs_up;
            bestIndex = i;
          }
        }
        if(res.list[bestIndex] === undefined) throw new Error("NO URBAN DICTIONARY DEFINITION FOR " + word + " " + JSON.stringify(res));
        let bestDefinition = res.list[bestIndex].definition;
        const definition = bestDefinition + " (URBANDICTIONARY)";
        words[index][1] = definition;
        console.log("DEFINITION FOUND: " + words[index]);
        setWords(words);
      })
      .catch((message) => {
          console.warn(message)
        }
      );
  }
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
