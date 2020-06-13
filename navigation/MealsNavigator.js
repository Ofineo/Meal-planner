import React from "react";
import { Text, Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import FavoritesScreen, {
  screenOptions as favoritesScreenOptions,
} from "../screens/FavoritesScreen";
import { Ionicons } from "@expo/vector-icons";
import CategoriesScreen, {
  screenOptions as categoriesScreenOptions,
} from "../screens/CategoriesScreen";
import CategoriesMealsScreen, {
  screenOptions as categoriesMealsScreenOptions,
} from "../screens/CategoriesMealsScreen";
import MealDetailScreen, {
  screenOptions as mealDetailScreenOptions,
} from "../screens/MealDetailScreen";
import FilterScreen, {
  screenOptions as filterScreenOptions,
} from "../screens/FiltersScreen";
import Colors from "../constants/Colors";
import IngredientScreen, {
  screenOptions as IngredientScreenOptions,
} from "../screens/IngredientsScreen";
import AddNewMealScreen, {
  screenOptions as addNewMealScreenOptions,
} from "../screens/AddNewMealScreen";
import WeekPlannerScreen from "../screens/WeekPlannerScreen";
import ShopListScreen, {
  screenOptions as ShopListScreenOptions,
} from "../screens/ShopListScreen";
import AddIngredient, {
  screenOptions as AddIngredientScreenOptions,
} from "../screens/AddIngredientScreen";

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primaryColor : "white",
  },
  headerTitleStyle: {
    alignSelf: "center",
    fontFamily: "bb2-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "bb2-regular",
  },
  headerTintColor: Platform.OS === "ios" ? Colors.primaryColor : "white",
};

const MealsStackNavigator = createStackNavigator();

export const MealsNavigator = () => {
  return (
    <MealsStackNavigator.Navigator screenOptions={defaultStackNavOptions}>
      <MealsStackNavigator.Screen
        name="Categories"
        component={CategoriesScreen}
        options={categoriesScreenOptions}
      />
      <MealsStackNavigator.Screen
        name="Categorymeals"
        component={CategoriesMealsScreen}
        options={categoriesMealsScreenOptions}
      />
      <MealsStackNavigator.Screen
        name="Mealdetail"
        component={MealDetailScreen}
        options={mealDetailScreenOptions}
      />
      <MealsStackNavigator.Screen
        name="AddMeal"
        component={AddNewMealScreen}
        options={addNewMealScreenOptions}
      />
    </MealsStackNavigator.Navigator>
  );
};

const WeekPlanStackNavigator = createStackNavigator();

const WeekPlanNavigator = () => {
  return (
    <WeekPlanStackNavigator.Navigator
      screenOptions={{
        ...defaultStackNavOptions,
        headerStyle: {
          backgroundColor:
            Platform.OS === "android" ? Colors.thirdColor : "white",
        },
      }}
    >
      <WeekPlanStackNavigator.Screen
        name="Weekplanner"
        component={WeekPlannerScreen}
      />
      <MealsStackNavigator.Screen
        name="Categories"
        component={CategoriesScreen}
        options={categoriesScreenOptions}
      />
      <MealsStackNavigator.Screen
        name="Categorymeals"
        component={CategoriesMealsScreen}
        options={categoriesMealsScreenOptions}
      />
      <MealsStackNavigator.Screen
        name="Mealdetail"
        component={MealDetailScreen}
        options={mealDetailScreenOptions}
      />
      <MealsStackNavigator.Screen
        name="AddMeal"
        component={AddNewMealScreen}
        options={addNewMealScreenOptions}
      />
      <MealsStackNavigator.Screen name="Shopping" component={ShopListScreen} />
    </WeekPlanStackNavigator.Navigator>
  );
};

const FavoritesStackNavigator = createStackNavigator();

export const FavoritesNavigator = () => {
  return (
    <FavoritesStackNavigator.Navigator screenOptions={defaultStackNavOptions}>
      <FavoritesStackNavigator.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={favoritesScreenOptions}
      />
      <FavoritesStackNavigator.Screen
        name="MealDetail"
        component={MealDetailScreen}
        options={mealDetailScreenOptions}
      />
    </FavoritesStackNavigator.Navigator>
  );
};

const MealsFavBottomTabsNavigator =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator()
    : createBottomTabNavigator();

export const MealsFavTabNavigator = () => {
  return (
    <MealsFavBottomTabsNavigator.Navigator
      initialRouteName="Meals"
      activeColor={Platform.OS === "android" ? "white" : Colors.accentColor}
      inactiveColor={Platform.OS === "android" ? Colors.accentColor : "white"}
      shifting={true}
      screenOptions={{}}
    >
      <MealsFavBottomTabsNavigator.Screen
        name="Meals"
        component={MealsNavigator}
        options={{
          tabBarIcon: (tabInfo) => {
            return (
              <Ionicons
                name="ios-restaurant"
                size={tabInfo.focused ? 27 : 22}
                color={tabInfo.color}
              />
            );
          },
          tabBarLabel:
            Platform.OS === "android" ? (
              <Text style={{ fontFamily: "open-sans-bold" }}>Meals</Text>
            ) : (
              "Meals"
            ),
          tabBarColor:
            Platform.OS === "android"
              ? Colors.primaryColor
              : Colors.accentColor,
        }}
      />
      <MealsFavBottomTabsNavigator.Screen
        name="Favorites"
        component={WeekPlanNavigator}
        options={{
          tabBarLabel:
            Platform.OS === "android" ? (
              <Text style={{ fontFamily: "open-sans-bold" }}>Favorites</Text>
            ) : (
              "Favorites"
            ),
          tabBarIcon: (tabInfo) => {
            return (
              <Ionicons
                name="md-calendar"
                size={tabInfo.focused ? 27 : 22}
                color={tabInfo.color}
              />
            );
            v;
          },
          tabBarColor:
            Platform.OS === "android" ? Colors.thirdColor : Colors.accentColor,
        }}
      />
    </MealsFavBottomTabsNavigator.Navigator>
  );
};

const FiltersStackNavigator = createStackNavigator();

export const FiltersNavigator = () => {
  return (
    <FiltersStackNavigator.Navigator screenOptions={defaultStackNavOptions}>
      <FiltersStackNavigator.Screen
        name="Filters"
        component={FilterScreen}
        options={filterScreenOptions}
      />
    </FiltersStackNavigator.Navigator>
  );
};

const IngredientsStackNavigator = createStackNavigator();

export const IngredientsNavigator = () => {
  return (
    <IngredientsStackNavigator.Navigator screenOptions={defaultStackNavOptions}>
      <IngredientsStackNavigator.Screen
        name="Ingredients"
        component={IngredientScreen}
        options={IngredientScreenOptions}
      />
      <IngredientsStackNavigator.Screen
        name="AddIngredient"
        component={AddIngredient}
        options={AddIngredientScreenOptions}
      />
    </IngredientsStackNavigator.Navigator>
  );
};

const ShoppingStackNavigator = createStackNavigator();

export const ShoppingNavigator = () => {
  return (
    <ShoppingStackNavigator.Navigator screenOptions={defaultStackNavOptions}>
      <ShoppingStackNavigator.Screen
        name="Shopping"
        component={ShopListScreen}
        options={ShopListScreenOptions}
      />
    </ShoppingStackNavigator.Navigator>
  );
};

const MainDrawerNavigator = createDrawerNavigator();

export const MainNavigator = () => {
  return (
    <MainDrawerNavigator.Navigator
      drawerContentOptions={{
        activeTintColor: Colors.thirdColor,
        activeBackgroundColor: Colors.accentColor,
      }}
    >
      <MainDrawerNavigator.Screen
        name="MealsFavs"
        component={MealsFavTabNavigator}
        options={{ title: "Meals" }}
      />
      <MainDrawerNavigator.Screen name="Filters" component={FiltersNavigator} />
      <MainDrawerNavigator.Screen
        name="Ingredients"
        component={IngredientsNavigator}
      />
      <MainDrawerNavigator.Screen
        name="Shopping"
        component={ShoppingNavigator}
      />
    </MainDrawerNavigator.Navigator>
  );
};

const AppNavigator = (props) => {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
