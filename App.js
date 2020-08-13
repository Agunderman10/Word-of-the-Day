import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, View, SafeAreaView, TextInput } from "react-native";
import { Fragment } from 'react';
import { styles } from "./styles";

export default function App() {
  return (
    <Fragment>
      <SafeAreaView />
      <View style={styles.container}>
        <TextInput style={styles.textBox} value="hello" editable={false}></TextInput>
        <Text>Open up App.js to start working on your app bro!</Text>
        <StatusBar style="auto" />
      </View>
    </Fragment>
  );
}
