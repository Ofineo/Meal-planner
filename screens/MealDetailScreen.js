import React, { useEffect, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import CustomHeaderButton from "../components/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import DefaultText from "../components/DefaultText";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "../store/actions/meals";

const ListItem = (props) => {
  return (
    <View style={styles.listItem}>
      <Text>{props.children}</Text>
    </View>
  );
};

const MealDetailScreen = (props) => {
  const meal = props.route.params.meal;

  const isFavorite = useSelector((state) =>
    state.meals.favoriteMeals.some((m) => m.id === meal.id)
  );
  const dispatch = useDispatch();

  const toggleFavoriteHandler = useCallback(() => {
    dispatch(toggleFavorite(meal.id));
  }, [dispatch]);

  useEffect(() => {
    props.navigation.setParams({ toggleFav: toggleFavoriteHandler });
  }, [toggleFavoriteHandler]);

  useEffect(() => {
    props.navigation.setParams({ isFav: isFavorite });
  }, [isFavorite]);

  return (
    <ScrollView>
      <Image source={{ uri: meal.imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <DefaultText>{meal.duration}</DefaultText>
        <DefaultText>{meal.complexity.toUpperCase()}</DefaultText>
        <DefaultText>{meal.afordability.toUpperCase()}</DefaultText>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      {meal.ingredients.map((ingredient) => (
        <ListItem Key={ingredient}>{ingredient}</ListItem>
      ))}

      <Text style={styles.title}>Steps</Text>
      {meal.steps.map((step) => (
        <ListItem Key={step}>{step}</ListItem>
      ))}
    </ScrollView>
  );
};

export const screenOptions = (navData) => {
  const meal = navData.route.params.meal;
  const toggleFavorite = navData.route.params.toggleFav;
  const isFavorite = navData.route.params.isFav;
  return {
    title: meal.title,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Favorite"
          iconName={isFavorite ? "ios-star" : "ios-star-outline"}
          onPress={toggleFavorite}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
  },
  details: {
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignContent: "center",
    height: "15%",
  },
  title: {
    fontFamily: "bb2-bold",
    fontSize: 22,
    textAlign: "center",
  },
  listItem: {
    marginVertical: 6,
    marginHorizontal: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
  },
});

export default MealDetailScreen;
