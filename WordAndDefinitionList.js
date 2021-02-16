import {
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
function WordAndDefinitionList({words, tabLabel, phone, setValueTapped}) {
  if (phone[9]) {
    Keyboard.dismiss();
    return (
      <>
        <FlatList
          key={tabLabel}
          style={styles.textWhite}
          data={words}
          renderItem={({item, index}) => (
            <>
              <TouchableOpacity onPress={() => setValueTapped(item[0])}>
                <Text key={tabLabel + 'word' + index} style={styles.textBlue}>
                  {item[0]}:
                </Text>
              </TouchableOpacity>
              <Text
                key={tabLabel + 'definition' + index}
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
        <FlatList key={tabLabel} style={styles.textWhite} />
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

export default WordAndDefinitionList;
