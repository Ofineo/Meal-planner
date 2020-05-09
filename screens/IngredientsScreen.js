import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import { useSelector } from "react-redux";
import FilterSwitch from "../components/FilterSwitch";

const IngredientScreen = (props) => {
  const ingredients = useSelector((state) => state.ingredients.ingredients);
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available Ingredients</Text>

      <View style={styles.ingredientList}>
        <FlatList
          data={ingredients}
          keyExtractor={(item) => item.id}
          renderItem={(itemData) => <FilterSwitch label={itemData.item.name} />}
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
    fontFamily: "bb2-regular",
    fontSize: 22,
    margin: 20,
    textAlign: "center",
  },
  ingredientList: {
    width: '70%',
    alignItems:'center',
    paddingLeft: 10,
    fontFamily: 'bb2-regular'
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
