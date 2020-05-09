import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";

const IngredientScreen = (props) => {
  return (
    <View>
      <Text>Here are the ingredients</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

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
