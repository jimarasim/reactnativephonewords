import * as React from 'react';
import {FlatList, StyleSheet, Text} from 'react-native';

function WordAndDefinitionList({phoneNumberSubset, words}) {
  return (
    <>
      <Text style={styles.textWhite}>{phoneNumberSubset}</Text>
      <FlatList
        style={styles.textWhite}
        data={words}
        renderItem={({item, index}) => (
          <Text
            id={(index) => {
              phoneNumberSubset + `${index}`;
            }}
            key={item[0]}
            style={styles.textWhite}>
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
    marginVertical: 10,
    flex: 1,
    paddingLeft: 5,
  },
});

export default WordAndDefinitionList;
