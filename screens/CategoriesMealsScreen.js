import React from "react";
import { CATEGORIES } from "../data/dummy-data";
import MealList from "../components/MealList";
import { useSelector } from "react-redux";
import { View, Text, StyleSheet } from "react-native";

const CategoriesMealsScreen = (props) => {
  const catId = props.route.params.categoryId;

  const availableMeals = useSelector((state) => state.meals.filteredMeals);

  const displayedMeals = availableMeals.filter(
    (meal) => meal.categoryIds.indexOf(catId) >= 0
  );

  if (displayedMeals.length === 0) {
    return (
      <View style={styles.content}>
        <Text>No meals found. Check your filters</Text>
      </View>
    );
  }

  return <MealList listData={displayedMeals} navigation={props.navigation} />;
};

export const screenOptions = (navData) => {
  const catId = navData.route.params.categoryId;
  const selectedCat = CATEGORIES.find((cat) => cat.id === catId);

  return {
    title: selectedCat.title,
  };
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CategoriesMealsScreen;
