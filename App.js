import { StatusBar } from "expo-status-bar";
import React, { useEffect, useCallback, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  AsyncStorage, // I'm well aware of AsyncStorage's slow runtime and lack of indexing capabilities, but for this use case it's fine. Don't judge, bro. Don't judge.
  Button,
  Alert
} from "react-native";
import { Fragment } from "react";
import { styles } from "./styles";
//import AsyncStorage from 'react-native';

export default function App() {
  const API_KEY = '68ef1da9-4447-4980-a060-d640eed3e121';
  const [wordOfTheDay, setWordOfTheDay] = useState('');
  const [definition, setDefinition] = useState('');
  const [partOfSpeech, setPartOfSpeech] = useState('');

  useEffect(async () => {
    // check if there's a date in async storage.
    // if there is, see if it is different than today's date. if it's different get new word and display new information
    // if it's not different then don't do anything.

    const dateInDB = await AsyncStorage.getItem("DATE_FOR_WORD_OF_THE_DAY");
    console.log(dateInDB);
    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

    if (dateInDB === null) {
      console.log("in 1: " + dateInDB)
      await AsyncStorage.setItem("DATE_FOR_WORD_OF_THE_DAY", date);
      getUserNewWordForToday();
    } else if (dateInDB !== date) {
      console.log("in 2: " + dateInDB)
      getUserNewWordForToday();
    }
    else {
      console.log("in 3: " + dateInDB)
      getWordDataFromAsyncStorage();
      //AsyncStorage.removeItem("DATE_FOR_WORD_OF_THE_DAY") // temporary
    }
  }, []);

  const getWordDataFromAsyncStorage = async () => {
    setWordOfTheDay(await AsyncStorage.getItem("WORD_OF_THE_DAY"));
    setDefinition(await AsyncStorage.getItem("WORD_OF_THE_DAY_DEFINITION"));
    setPartOfSpeech(await AsyncStorage.getItem("WORD_OF_THE_DAY_PART_OF_SPEECH"));
  }

  const addWordDataToAsyncStorage = async (word, shortdef, fl) => {
    await AsyncStorage.setItem("WORD_OF_THE_DAY", word);
    await AsyncStorage.setItem("WORD_OF_THE_DAY_DEFINITION", shortdef);
    await AsyncStorage.setItem("WORD_OF_THE_DAY_PART_OF_SPEECH", fl);
  }

  const getNewRandomWord = async () => {
    return await fetch("https://random-word-api.herokuapp.com/word?number=1")
      .then((response) => response.json())
      .then((data) => {
        setWordOfTheDay(data[0]);
        return data;
      }).catch(() => {
        Alert.alert('Error', 'There was an error getting a random word. Is the random word api down?');
      });
  };

  const getWordInfo = async (word) => {
    await fetch(
      `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${API_KEY}`
    )
      .then((response) => response.json())
      .then(async (data) => {
        setDefinition(data[0].shortdef[0]);
        setPartOfSpeech(data[0].fl);
        await addWordDataToAsyncStorage(JSON.stringify(word[0]), JSON.stringify(data[0].shortdef[0]), JSON.stringify(data[0].fl));
      }).catch((error) => {
        Alert.alert('Error Retrieving Word Info', "You probably forgot to add the API Key. If you're unsure of how to do this check the README for more information.\n\nActual error: " + error);
      });
  };

  const getUserNewWordForToday = async() => {
    getWordInfo(await getNewRandomWord());
  }

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
        <Button title="New Word" onPress={getUserNewWordForToday}/>
        <StatusBar style="auto" />
      </View>
    </Fragment>
  );
}
