import React from "react";
import { View, Text, StyleSheet,FlatList } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import { useSelector } from "react-redux";

const ListItem = (props) => {
  return (
    <View style={styles.listItem}>
      <Text>{props.children}</Text>
    </View>
  );
};

const ShopListScreen = (props) => {
  const weekMeals = useSelector((state) => state.meals.weekMeals);
  let totalMeals=[];

  for (const key in weekMeals) {
    if(weekMeals[key].ingredients){
      totalMeals = [...totalMeals,...weekMeals[key].ingredients];
    }
  }

  return (
    <View style={{flex:1}}>
      <Text style={styles.text}>ShopListScreen</Text>
      <FlatList data={totalMeals} key={data=>data} renderItem={itemData=><ListItem>{itemData.item}</ListItem>} />
    </View>
  );
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
  listItem: {
    marginVertical: 6,
    marginHorizontal: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
  },
});
export default ShopListScreen;
