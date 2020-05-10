import React from "react";
import { View, Text, StyleSheet } from "react-native";

const IngredientStore = (props) => {
  return (<View>
      <Text style={styles.text}>IngredientStore</Text>
  </View> );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "open-sans",
  },
});
export default IngredientStore;
