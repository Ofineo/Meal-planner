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
import { useDispatch, useSelector } from "react-redux";
import * as weekdayActions from "../store/actions/weekday";

import { Ionicons } from "@expo/vector-icons";

const TouchableComponent =
  Platform.OS === "android" && Platform.Version >= 21
    ? TouchableNativeFeedback
    : TouchableOpacity;

const WeekdayComponent = (props) => {
  const weekdayMeals = useSelector((state) => state.meals.weekMeals);
  console.log(weekdayMeals["Monday"].imageUrl);

  const dispatch = useDispatch();

  return Object.keys(weekdayMeals).map((key, index) => (
    <View style={{ flex: 1 }} key={index}>
      <View
        style={{
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 20, fontFamily: "bb2-bold" }}>{key}</Text>
      </View>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={props.onSelect} style={styles.placeItem}>
          <Image
            style={styles.image}
            source={{
              uri: weekdayMeals[key].imageUrl
                ? weekdayMeals[key].imageUrl
                : "https://png.pngtree.com/png-vector/20191018/ourmid/pngtree-cross-icon-flat-style-png-image_1825560.jpg",
            }}
          />
          <View style={styles.infoContainer}>
            <Text style={styles.title}>
              {weekdayMeals[key].title
                ? weekdayMeals[key].title
                : "No meal planned"}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableComponent
          onPress={() => {
            dispatch(weekdayActions.setWeekday(key));
            props.navigation.navigate("Categories");
          }}
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
  const weekMeals = useSelector((state) => state.meals.weekMeals);

  const prepareShoppingList = () => {
    let totalMeals = [];
    for (const key in weekMeals) {
      if (weekMeals[key].ingredients) {
        totalMeals = [...totalMeals, ...weekMeals[key].ingredients];
      }
    }

    props.navigation.navigate("Shopping");
  };

  const imageThouchHandler = () => {
    //TODO
  };

  return (
    <View style={styles.screen}>
      <WeekdayComponent
        navigation={props.navigation}
        image="https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/shallow-pan-of-food.png"
        title="Paella"
        onSelect={imageThouchHandler}
      />
      <View style={styles.button}>
        <Button
          title="Shopping list"
          color={Colors.primaryColor}
          onPress={prepareShoppingList}
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
