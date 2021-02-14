import * as React from 'react';
import {FlatList, StyleSheet, Text} from 'react-native';

function WordAndDefinitionList({phoneNumberSubset, words}) {
  return (
    <>
      <Text id={phoneNumberSubset} style={styles.textWhite}>
        {phoneNumberSubset}
      </Text>
      <FlatList
        id={phoneNumberSubset}
        style={styles.textWhite}
        data={words}
        renderItem={({item, index}) => (
          <Text key={index} style={styles.textWhite}>
            {item[0]}:{item[1]}
          </Text>
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  textWhite: {
    color: 'white',
    backgroundColor: 'black',
    fontSize: 20,
    width: '100%',
  },
});

export default WordAndDefinitionList;
