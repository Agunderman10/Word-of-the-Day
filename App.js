import { StatusBar } from "expo-status-bar";
import React, { useEffect, useCallback, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  AsyncStorage,
  Button,
  Alert
} from "react-native";
import { Fragment } from "react";
import { styles } from "./styles";
//import AsyncStorage from 'react-native';

export default function App() {
  const API_KEY = 'YOUR_API_KEY_HERE';
  const [wordOfTheDay, setWordOfTheDay] = useState('');
  const [definition, setDefinition] = useState('');
  const [partOfSpeech, setPartOfSpeech] = useState('');

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
        setWordOfTheDay(data);
        return data;
      });
  };

  const getWordInfo = async (word) => {
    console.log(word);
    await fetch(
      `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setDefinition(data[0].shortdef);
        setPartOfSpeech(data[0].fl);
      }).catch(() => {
        Alert.alert('Error Retrieving Word Info', "You probably forgot to add the API Key. If you're unsure of how to do this check the README for more information.")
      });
  };

  return (
    <Fragment>
      <SafeAreaView />
      <View style={styles.container}>
        <TextInput
          style={styles.textBox}
          editable={false}
        >{wordOfTheDay}</TextInput>
        <Text>{'"' + definition + '"'}</Text>
        <Text>Part of Speech: {partOfSpeech}</Text>
        {/*<Button></Button>*/}
        <StatusBar style="auto" />
      </View>
    </Fragment>
  );
}
