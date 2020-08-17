import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    padding: 30,
    borderWidth: 5,
    borderColor: "#1FDDFF",
    marginTop: Platform.OS === "ios" ? 20 : 0,
  },
  wordStyles: {
    marginTop: 20,
    width: "95%",
    fontSize: 40,
    color: "black",
  },
  definitionStyles: {
    marginTop: 30,
    fontSize: 15,
    color: 'black',
  },
  partOfSpeechStyles: {
    marginTop: 30,
    fontSize: 15,
    color: 'black',
  },
  newWordButtonStyles: {
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    marginTop: "25%",
    width: "40%",
    height: "7%",
  },
  lookUpWithGoogleButtonStyles: {
      marginTop: 15,
      color: "#1FDDFF",
  }
});
