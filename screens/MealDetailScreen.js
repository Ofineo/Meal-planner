import React, { useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Button,
} from "react-native";
import CustomHeaderButton from "../components/HeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import DefaultText from "../components/DefaultText";
import { useSelector, useDispatch } from "react-redux";
import * as mealsActions from "../store/actions/meals";
import Colors from "../constants/Colors";

const ListItem = (props) => {
  return (
    <View style={styles.listItem}>
      <Text>{props.children}</Text>
    </View>
  );
};

const MealDetailScreen = (props) => {
  const meal = props.route.params.meal;
  const weekday = useSelector((state) => state.weekday.weekday);

  const isFavorite = useSelector((state) =>
    state.meals.favoriteMeals.some((m) => m.id === meal.id)
  );
  const dispatch = useDispatch();

  const toggleFavoriteHandler = useCallback(() => {
    dispatch(mealsActions.toggleFavorite(meal.id));
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
        <DefaultText style={{ fontFamily: "bb2-bold", fontSize: 15 }}>
          {meal.duration} min
        </DefaultText>
        <DefaultText style={{ fontFamily: "bb2-bold", fontSize: 15 }}>
          {meal.complexity.toUpperCase()}
        </DefaultText>
        <DefaultText style={{ fontFamily: "bb2-bold", fontSize: 15 }}>
          {meal.afordability.toUpperCase()}
        </DefaultText>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <Button
          title={`Add to ${weekday}`}
          color={Colors.primaryColor}
          onPress={() => dispatch(mealsActions.addMealToWeekday(weekday,meal))}
        />
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
    flexDirection: "row",
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignContent: "center",
    height: "5%",
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
