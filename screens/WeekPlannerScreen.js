import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
  Image,
} from "react-native";
import Colors from "../constants/Colors";

import { Ionicons } from "@expo/vector-icons";

const TouchableComponent =
  Platform.OS === "android" && Platform.Version >= 21
    ? TouchableNativeFeedback
    : TouchableOpacity;

const WeekdayComponent = (props) => {
  const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  return weekdays.map((day, index) => (
    <View style={{ flex: 1 }}>
      <View
        style={{
          alignItems: "center",
        }}
        key={index}
      >
        <Text style={{ fontSize: 20, fontFamily: "bb2-bold" }}>{day}</Text>
      </View>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={props.onSelect} style={styles.placeItem}>
          <Image style={styles.image} source={{ uri: props.image }} />
          <View style={styles.infoContainer}>
            <Text style={styles.title}>{props.title}</Text>
          </View>
        </TouchableOpacity>
        <TouchableComponent
          style={styles.shoppingButton}
          onPress={() =>
            props.navigation.navigate("Categories", { weekday: day })
          }
        >
          <Ionicons
            name={Platform.OS === "android" ? "md-add-circle" : "ios-add"}
            size={28}
            color="green"
          />
        </TouchableComponent>
      </View>
    </View>
  ));
};

const WeelPlannerScreen = (props) => {
  return (
    <View style={styles.screen}>
      <WeekdayComponent
        navigation={props.navigation}
        image="https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/shallow-pan-of-food.png"
        title="Paella"
      />
      <View style={styles.button}>
        <Button
          title="Shopping list"
          color={Colors.primaryColor}
          onPress={() => props.navigation.navigate("Shopping")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  button: {
    alignItems: "center",
  },

  placeItem: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingVertical: 1,
    paddingHorizontal: 30,
    flexDirection: "row",
    //alignItems: "center",
  },
  imageContainer: {
    width: "60%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 35,
    backgroundColor: "#ccc",
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  infoContainer: {
    marginLeft: 35,
    width: 200,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  title: {
    color: "black",
    fontSize: 18,
    marginBottom: 5,
  },
});
export default WeelPlannerScreen;
