import React from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import Colors from "../constants/Colors";

const FilterSwitch = (props) => {
  return (
    <View style={{ ...styles.filterContainer, ...props }}>
      <Text style={{ fontSize: 17 }}>{props.label}</Text>
      <Switch
        value={props.state}
        onValueChange={props.setState}
        thumbColor={Platform.OS === "android" ? Colors.primaryColor : ""}
        trackColor={{ true: Colors.accentColor }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    width: "80%",
    marginVertical: 15,
    fontFamily: "bb2-regular",
  },
});

export default FilterSwitch;
