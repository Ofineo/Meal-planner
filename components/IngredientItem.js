import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const TouchableComponent =
  Platform.OS === "android" && Platform.Version >= 21
    ? TouchableNativeFeedback
    : TouchableOpacity;

const IngredientItem = (props) => {
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
      }}
    >
      <View style={{ width: "50%" }}>
        <Text style={styles.text}>{props.ingredient.name}</Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          width: "50%",
          justifyContent: "space-around",
          marginRight: 15,
        }}
      >
        <TouchableComponent
          style={styles.shoppingButton}
          onPress={() => props.subtractIngredient(props.ingredient)}
        >
          <Ionicons
            name={Platform.OS === "android" ? "md-remove-circle" : "ios-remove"}
            size={28}
            color="green"
          />
        </TouchableComponent>
        <Text>{props.ingredient.quantity}</Text>
        <TouchableComponent
          style={styles.shoppingButton}
          onPress={() => props.addIngredient(props.ingredient)}
        >
          <Ionicons
            name={Platform.OS === "android" ? "md-add-circle" : "ios-add"}
            size={28}
            color="green"
          />
        </TouchableComponent>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "open-sans",
    fontSize: 20,
    alignItems: "center",
  },
});
export default IngredientItem;
