import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import Colors from "../constants/Colors";

const WeelPlannerScreen = (props) => {
  return (
    <View style={styles.screen} >
      <Text style={styles.text}>WeelPlannerScreen</Text>
      <Button
        title="Shopping list"
        color={Colors.thirdColor}
        onPress={()=>props.navigation.navigate('Shopping')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  scre:{
    flex: 1,

  },
  text: {
    fontFamily: "bb2-regular",
  },
});
export default WeelPlannerScreen;
