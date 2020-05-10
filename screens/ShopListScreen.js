import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";

const ShopListScreen = (props) => {
  return (<View>
      <Text style={styles.text}>ShopListScreen</Text>
  </View> );
};
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
    title: "Shopping List",
  };
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "bb2-regular",
  },
});
export default ShopListScreen;