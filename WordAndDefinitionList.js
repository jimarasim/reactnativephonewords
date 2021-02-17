import {
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
function WordAndDefinitionList({words, tabLabel, phone, setValueTapped}) {
  if (phone[9]) {
    Keyboard.dismiss();
    return (
      <FlatList
        keyExtractor={() => {
          return tabLabel + 'flatlist';
        }}
        id={() => {
          return tabLabel + 'flatlist';
        }}
        style={styles.textWhite}
        data={words}
        renderItem={({item, index}) => (
          <>
            <TouchableOpacity onPress={() => setValueTapped(item[0])}>
              <Text
                keyExtractor={() => {
                  return tabLabel + 'word' + index;
                }}
                style={styles.textBlue}>
                {() => item[0]}:
              </Text>
            </TouchableOpacity>
            <Text
              keyExtractor={() => {
                return tabLabel + 'definition' + index;
              }}
              style={styles.textWhite}>
              {item[1]}
            </Text>
          </>
        )}
      />
    );
  } else {
    return (
      <FlatList keyExtractor={tabLabel + 'flatlist'} style={styles.textWhite} />
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

export default WordAndDefinitionList;
