import * as React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';

function WordAndDefinitionList({words, setWords, tabLabel, phone}) {
  if (phone[9]) {
    words.map((word, index) => {
      fetchDefinitionFromMerriam(word[0], index, words, setWords);
    });
    return (
      <>
        <FlatList
          id={tabLabel}
          key={tabLabel}
          style={styles.textWhite}
          data={words}
          renderItem={({item, index}) => (
            <>
              <Text
                key={(index, tabLabel) => {
                  return tabLabel + 'word' + index;
                }}
                style={styles.textBlue}>
                {item[0]}:
              </Text>
              <Text
                key={(index, tabLabel) => {
                  return tabLabel + 'definition' + index;
                }}
                style={styles.textWhite}>
                {item[1]}
              </Text>
            </>
          )}
        />
      </>
    );
  } else {
    return (
      <>
        <FlatList id={tabLabel} key={tabLabel} style={styles.textWhite} />
      </>
    );
  }
}

const styles = StyleSheet.create({
  textWhite: {
    color: 'white',
    backgroundColor: 'black',
    fontSize: 20,
    width: '100%',
  },
  textBlue: {
    color: 'lightblue',
    backgroundColor: 'black',
    fontSize: 20,
    width: '100%',
  },
});

function fetchDefinitionFromMerriam(word, index, words, setWords) {
  if (word) {
    word = word.replace('1', 'i').replace('0', 'o');
    //MERRIAM WEBSTER
    fetch(
      'https://www.dictionaryapi.com/api/v3/references/collegiate/json/' +
        word +
        '?key=84b88140-44b3-4a35-bfbb-203d307ad99e',
    )
      .then((res) => res.json())
      .then((res) => {
        //find the first non-undefined definition
        const numDefs = Object.keys(res).length;
        let i;
        let found = false;
        for (let i = 0; i < numDefs; i++) {
          if (!res[i].hasOwnProperty('shortdef')) {
            throw new Error(
              'NO MERRIAM WEBSTER DEFINITION FOR ' +
                word +
                ' ' +
                JSON.stringify(res),
            );
          }
          if (res[i].shortdef[0]) {
            found = true;
            break;
          }
        }
        if (!found) {
          throw new Error(
            'NO MERRIAM WEBSTER DEFINITION FOR ' +
              word +
              ' ' +
              JSON.stringify(res),
          );
        }
        const definition = res[i].shortdef[0] + ' (MERRIAMWEBSTER)';
        words[index][1] = definition;
        setWords(words);
      })
      .catch((message) => {
        console.log(message);
        fetchDefinitionFromUrban(word, index, words, setWords);
      });
  }
}

function fetchDefinitionFromUrban(word, index, words, setWords) {
  word = word.replace('1', 'i').replace('0', 'o');
  if (word) {
    //URBAN DICTIONARY
    fetch(
      'https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=' +
        word,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-key':
            '1c2eed9801msh9a03da88e676433p16db88jsncfe81277ff23',
          'x-rapidapi-host':
            'mashape-community-urban-dictionary.p.rapidapi.com',
        },
      },
    )
      .then((res) => res.json())
      .then((res) => {
        //find most thumbs up definition
        const numDefs = Object.keys(res.list).length;
        let bestThumbsUp = 0;
        let bestIndex = 0;
        for (let i = 0; i < numDefs; i++) {
          if (res.list[i].thumbs_up > bestThumbsUp) {
            bestThumbsUp = res.list[i].thumbs_up;
            bestIndex = i;
          }
        }
        if (res.list[bestIndex] === undefined) {
          throw new Error(
            'NO URBAN DICTIONARY DEFINITION FOR ' +
              word +
              ' ' +
              JSON.stringify(res),
          );
        }
        let bestDefinition = res.list[bestIndex].definition;
        const definition = bestDefinition + ' (URBANDICTIONARY)';
        words[index][1] = definition;
        setWords(words);
      })
      .catch((message) => {
        console.log(message);
      });
  }
}

export default WordAndDefinitionList;
