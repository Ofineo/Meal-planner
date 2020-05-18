import React, { useCallback, useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import { useSelector, useDispatch } from "react-redux";
import IngredientItem from "../components/IngredientItem";
import * as ingredientsActions from "../store/actions/ingredients";

const IngredientScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const dispatch = useDispatch();

  const fetchIngredients = async () => {
    setIsLoading(true);
    await dispatch(ingredientsActions.getIngredients())
    setIsLoading(false);
  };

  useEffect(() => {
    fetchIngredients();
  }, [fetchIngredients]);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available Ingredients</Text>

      <View style={styles.ingredientList}>
        <FlatList
          data={ingredients}
          keyExtractor={(item) => item.id}
          renderItem={(itemData) => (
            <IngredientItem
              ingredient={itemData.item}
              title={itemData.item.name}
              quantity={itemData.item.quantity}
              id={itemData.item.id}
              subtractIngredient={(data) =>
                dispatch(ingredientsActions.removeIngredient(data))
              }
              addIngredient={(data) =>
                dispatch(ingredientsActions.addIngredient(data))
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
    title: "Ingredients",
  };
};

export default IngredientScreen;
