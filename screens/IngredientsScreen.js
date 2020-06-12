import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Platform,
  ActivityIndicator,
} from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import { useSelector, useDispatch } from "react-redux";
import IngredientItem from "../components/IngredientItem";
import * as ingredientsActions from "../store/actions/ingredients";
import Colors from "../constants/Colors";

const IngredientScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const dispatch = useDispatch();

  const fetchIngredients = useCallback(async () => {
    setIsLoading(true);
    dispatch(ingredientsActions.getIngredients()).then(setIsLoading(false));
  }, [setIsLoading, dispatch]);

  useEffect(() => {
    fetchIngredients();
  }, [fetchIngredients]);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available Ingredients</Text>
      {isLoading && (
        <View style={StyleSheet.centered}>
          <ActivityIndicator size="large" color={Colors.accentColor} />
        </View>
      )}
      <View style={styles.ingredientList}>
        <FlatList
          data={ingredients}
          keyExtractor={(item) => item.name + item.id.toString()}
          renderItem={(itemData) => (
            <IngredientItem
              ingredient={itemData.item}
              title={itemData.item.name}
              quantity={itemData.item.quantity.toString()}
              id={itemData.item.id}
              subtractIngredient={(data) =>
                dispatch(ingredientsActions.MinusOneIngredient(itemData.item))
              }
              addIngredient={(data) =>
                dispatch(ingredientsActions.PlusOneIngredient(itemData.item))
              }
            />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontFamily: "bb2-bold",
    fontSize: 22,
    margin: 20,
    textAlign: "center",
  },
  ingredientList: {
    flex: 1,
    paddingLeft: 10,
    fontFamily: "bb2-regular",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export const screenOptions = (navData) => {
  return {
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Add Ingredient"
          iconName={Platform.OS === "android" ? "md-add-circle" : "ios-add"}
          onPress={() => {
            navData.navigation.navigate("AddIngredient");
          }}
        />
      </HeaderButtons>
    ),
    title: "Ingredients",
  };
};

export default IngredientScreen;
