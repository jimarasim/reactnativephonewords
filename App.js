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

const App: () => React$Node = () => {
  const [phoneNumber, setPhoneNumber] = useState(Array(10).fill(""));
  const [areaCodeWords, setAreaCodeWords] = useState([]);
  const [prefixWords, setPrefixWords] = useState([]);
  const [suffixWords, setSuffixWords] = useState([]);
  const [showCopyButtons, setShowCopyButtons] = useState(false);
  const [selectedValue, setSelectedValue] = useState("java");

  useEffect(() => {
    let newAreaCodeWords = [];
    let newPrefixWords = [];
    let newSuffixWords = [];
    if (phoneNumber[9]) {
      [newAreaCodeWords, newPrefixWords, newSuffixWords] = getWordCombinations(
        phoneNumber,
      );
      setAreaCodeWords(newAreaCodeWords);
      setPrefixWords(newPrefixWords);
      setSuffixWords(newSuffixWords);
      Keyboard.dismiss();
    } else {
      setAreaCodeWords([]);
      setPrefixWords([]);
      setSuffixWords([]);
      setShowCopyButtons(false);
    }
  }, [phoneNumber]);
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeAreaView}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}
          contentContainerStyle={{ alignItems: "center" }}>
          <NumberInput
            id="phonenumber"
            action={(text) => handleNumberInputChange(text, setPhoneNumber)}
          />
          <NumberDisplay phoneNumberArrayOfKeyLetters={phoneNumber} />
          <Text style={styles.textWhite}>AREA</Text>
          <FlatList
            style={styles.textWhite}
            data={areaCodeWords}
            renderItem={({item, index}) => <Text id={(index) => {"AREA" + `${index}`}} key={item} style={styles.textWhite}>{item}</Text>}
          />
          <Text style={styles.textWhite}>PREFIX</Text>
          <FlatList
            style={styles.textWhite}
            data={prefixWords}
            renderItem={({item, index}) => <Text id={(index) => {"PREFIX" + `${index}`}} key={item} style={styles.textWhite}>{item}</Text>}
          />
          <Text style={styles.textWhite}>SUFFIX</Text>
          <FlatList
            style={styles.textWhite}
            data={suffixWords}
            renderItem={({item, index}) => <Text id={(index) => {"SUFFIX" + `${index}`}} key={item} style={styles.textWhite}>{item}</Text>}
          />
        </ScrollView>
      </SafeAreaView>
      <SafeAreaView style={styles.viewPicker}>
        <WordPicker phoneNumberSubset="area..." words={areaCodeWords} />
        <WordPicker phoneNumberSubset="prefix..." words={prefixWords} />
        <WordPicker phoneNumberSubset="suffix..." words={suffixWords} />
      </SafeAreaView>
      <SafeAreaView style={styles.copyButton}>
        <Button style={styles.copyButton} title="Copy"></Button>
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
          newCodedPhoneNumberArray[2][k],
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
          ]);
        }
      }
    }
  }
  return [newAreaCodeWords, newPrefixWords, newSuffixWords];
}

function fetchDefinitionFromMerriam(word) {
  if (word) {
    word = word.replace("1", "i").replace("0", "o");
    //MERRIAM WEBSTER
    fetch('https://www.dictionaryapi.com/api/v3/references/collegiate/json/' + word + '?key=84b88140-44b3-4a35-bfbb-203d307ad99e')
      .then(res => res.json())
      .then(res => {
        if (!res[0].hasOwnProperty('shortdef')) throw new Error("NO MERRIAM WEBSTER DEFINITION" + JSON.stringify(res));
        //find the first non-undefined definition
        const numDefs = Object.keys(res).length;
        let i;
        for (let i = 0; i < numDefs; i++) {
          if (res[i].shortdef[0]) {
            break;
          }
        }
        return res[i].shortdef[0] + " (MERRIAMWEBSTER)";
      })
      .catch((message) => {
          console.warn(message);
          fetchDefinitionFromUrban(optionId, word, definitionListId);
        }
      );
  }
}

function fetchDefinitionFromUrban(word) {
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
        if(res.list[bestIndex] === undefined) throw new Error("NO URBAN DICTIONARY DEFINITION:" + JSON.stringify(res));
        let bestDefinition = res.list[bestIndex].definition;
        return bestDefinition + " (URBANDICTIONARY)";
      })
      .catch((message) => {
          console.warn(message);
        }
      );
  }
}


const styles = StyleSheet.create({
  viewPicker: {
    flex: 2,
    flexDirection: "row",
    width: "33.3%",
    alignContent: "center",
    marginVertical: 5,
  },
  safeAreaView: {
    flex: 5,
    width: "100%",
  },
  scrollView: {
    backgroundColor: Colors.black,
  },
  textWhite: {
    color: "white",
    backgroundColor: "black",
    fontSize: 20,
    width: "100%",
    marginVertical: 10,
    flex: 1,
    paddingLeft: 5,
  },
  wordsView: {
    flexDirection: "column",
  },
});

export default App;
