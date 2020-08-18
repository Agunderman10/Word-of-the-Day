import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  AsyncStorage, // I'm well aware of AsyncStorage's slow runtime and lack of indexing capabilities, but for this use case it's fine. Don't judge, bro. Don't judge.
  Alert,
  Linking,
} from "react-native";
import { Fragment } from "react";
import { styles } from "./styles";
import { Card, CardButton } from "react-native-cards";

export default function App() {
  const API_KEY = "YOUR_API_KEY_HERE";
  const [wordOfTheDay, setWordOfTheDay] = useState("");
  const [definition, setDefinition] = useState("");
  const [partOfSpeech, setPartOfSpeech] = useState("");

  useEffect(() => {
    determineIfTodayIsNewDay();
  }, []);

  const determineIfTodayIsNewDay = async () => {
    const dateInDB = await getDateFromStorage();

    var today = new Date();
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

    if (dateInDB === null) {
      AsyncStorage.setItem("DATE_FOR_WORD_OF_THE_DAY", date);
      getUserNewWordForToday();
    } else if (dateInDB !== date) {
      AsyncStorage.setItem("DATE_FOR_WORD_OF_THE_DAY", date);
      getUserNewWordForToday();
    } else {
      getWordDataFromAsyncStorage();
    }
  }

  const getDateFromStorage = async () => {
    return await AsyncStorage.getItem("DATE_FOR_WORD_OF_THE_DAY")
      .then((date) => {
        console.log('date in func: ' + date);
        return date;
      })
      .catch(() => {
        Alert.alert('', 'There was an error retrieving data from storage. Please restart the app and try again.');
      });
  };

  const getWordDataFromAsyncStorage = async () => {
    setWordOfTheDay(await AsyncStorage.getItem("WORD_OF_THE_DAY"));
    setDefinition(await AsyncStorage.getItem("WORD_OF_THE_DAY_DEFINITION"));
    setPartOfSpeech(
      await AsyncStorage.getItem("WORD_OF_THE_DAY_PART_OF_SPEECH")
    );
  };

  const addWordDataToAsyncStorage = (word, shortdef, fl) => {
    AsyncStorage.setItem("WORD_OF_THE_DAY", word);
    AsyncStorage.setItem("WORD_OF_THE_DAY_DEFINITION", shortdef);
    AsyncStorage.setItem("WORD_OF_THE_DAY_PART_OF_SPEECH", fl);
  };

  const getNewRandomWord = async () => {
    return await fetch("https://random-word-api.herokuapp.com/word?number=1")
      .then((response) => response.json())
      .then((data) => {
        setWordOfTheDay(data[0]);
        return data;
      })
      .catch(() => {
        Alert.alert(
          "Error",
          "There was an error getting a random word. Is the random word api down?"
        );
      });
  };

  const getWordInfo = async (word) => {
    await fetch(
      `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word}?key=${API_KEY}`
    )
      .then((response) => response.json())
      .then(async (data) => {
        setDefinition(data[0].shortdef);
        setPartOfSpeech(data[0].fl);
        addWordDataToAsyncStorage(
          JSON.stringify(word[0]),
          JSON.stringify(data[0].shortdef),
          JSON.stringify(data[0].fl)
        );
      })
      .catch((error) => {
        Alert.alert(
          "Error Retrieving Word Info",
          "You probably forgot to add the API Key. If you're unsure of how to do this check the README for more information.\n\nActual error: " +
            error
        );
      });
  };

  const getUserNewWordForToday = async () => {
    getWordInfo(await getNewRandomWord());
  };

  const lookUpWithGoogle = () => {
    let url = `https://www.google.com/search?q=${wordOfTheDay}`;
    Linking.canOpenURL(url).then((isSupported) => {
      if (isSupported) {
        Linking.openURL(url);
      } else {
        Alert.alert(
          "Error opening page",
          "There was an issue opening the page."
        );
      }
    });
  };

  return (
    <Fragment>
      <SafeAreaView />
      <Card>
        <View style={styles.container}>
          <Text style={styles.wordStyles}>{wordOfTheDay}</Text>
          <Text style={styles.partOfSpeechStyles}>{partOfSpeech}</Text>
          <Text style={styles.definitionStyles}>{"1. " + definition}</Text>
          <CardButton
            style={styles.lookUpWithGoogleButtonStyles}
            onPress={lookUpWithGoogle}
            title="Look up with Google"
          />
          <CardButton
            style={styles.newWordButtonStyles}
            onPress={getUserNewWordForToday}
            title="New Word"
          />
          <StatusBar style="auto" />
        </View>
      </Card>
    </Fragment>
  );
}
