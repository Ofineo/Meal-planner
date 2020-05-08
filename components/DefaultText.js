import React from "react";
import { Text, StyleSheet } from "react-native";

const DefaultText = (props) => {
  return <Text style={styles.text}></Text>;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "open-sans",
  },
});
export default DefaultText;
