import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import MealItem from "../components/MealItem";
import { useSelector } from "react-redux";

const MealList = (props) => {
  const favMeals = useSelector((state) => state.meals.favoriteMeals);

  const renderMealItem = (itemData) => {
    const isFavorite = favMeals.some((meal) => meal.id === itemData.item.id);
    return (
      <MealItem
        meal={itemData.item}
        onSelectMeal={() => {
          props.navigation.navigate("Mealdetail", {
            meal: itemData.item,
            isFav: isFavorite,
          });
        }}
      />
    );
  };

  return (
    <View style={styles.list}>
      <FlatList
        style={{ width: "100%" }}
        data={props.listData}
        renderItem={renderMealItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
});

export default MealList;
