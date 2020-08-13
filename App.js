import { StatusBar } from "expo-status-bar";
import React, { useEffect, useCallback } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  AsyncStorage,
} from "react-native";
import { Fragment } from "react";
import { styles } from "./styles";
//import AsyncStorage from 'react-native';

export default function App() {
  useEffect(async () => {
    // check if there's a date in async storage.
    // if there is, see if it is different than today's date. if it's different get new word and display new information
    // if it's not different then don't do anything.

    const dateInDB = await AsyncStorage.getItem("DATE_FOR_WORD_OF_THE_DAY");
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

    if (dateInDB === "") {
      AsyncStorage.setItem("DATE_FOR_WORD_OF_THE_DAY", date);
      getWordInfo(await getNewRandomWord());
    } else if (dateInDB !== date) {
      getWordInfo(await getNewRandomWord());
    }
  }, []);

  const getNewRandomWord = async () => {
    return await fetch("https://random-word-api.herokuapp.com/word?number=1")
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        return data;
      });
  };

  const getWordInfo = async (word) => {
    console.log(word);
  };

  return (
    <Fragment>
      <SafeAreaView />
      <View style={styles.container}>
        <TextInput
          style={styles.textBox}
          value="hello"
          editable={false}
        ></TextInput>
        <Text>Open up App.js to start working on your app bro!</Text>
        <StatusBar style="auto" />
      </View>
    </Fragment>
  );
}
