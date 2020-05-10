import React from "react";
import { View, Text, StyleSheet } from "react-native";

const AddNewMealScreen = (props) => {
  return (<View>
      <Text style={styles.text}>AddNewMeal</Text>
  </View> );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "bb2-regular",
  },
});
export default AddNewMealScreen;