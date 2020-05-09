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

// import { createAppContainer } from "react-navigation";
// import { createStackNavigator } from "react-navigation-stack";
// import { createBottomTabNavigator } from "react-navigation-tabs";
// import { createDrawerNavigator } from "react-navigation-drawer";
// import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
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

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primaryColor : "white",
  },
  headerTitleStyle: {
    alignSelf: "center",
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
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
    </MealsStackNavigator.Navigator>
  );
};

// const MealsNavigator = createStackNavigator(
//   {
//     Categories: {
//       screen: CategoriesScreen,
//       navigationOptions: ,
//     },
//     Categorymeals: {
//       screen: CategoriesMealsScreen,
//     },
//     Mealdetail: MealDetailScreen,
//   },
//   {
//     defaultNavigationOptions: defaultStackNavOptions,
//   }
// );
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

// const FavoritesNavigator = createStackNavigator(
//   {
//     Favorites: FavoritesScreen,
//     MealDetail: MealDetailScreen,
//   },
//   {
//     defaultNavigationOptions: defaultStackNavOptions,
//   }
// );

// const tabScreenConfig = {
//   Meals: {
//     screen: MealsNavigator,
//     navigationOptions: {
//       tabBarIcon: (tabInfo) => {
//         return (
//           <Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} />
//         );
//       },
//       tabBarColor: Colors.primaryColor,
//       tabBarLabel:
//         Platform.OS === "android" ? (
//           <Text style={{ fontFamily: "open-sans-bold" }}>Meals</Text>
//         ) : (
//           "Meals"
//         ),
//     },
//   },
//   Favorites: {
//     screen: FavoritesNavigator,
//     navigationOptions: {
//       tabBarLabel:
//         Platform.OS === "android" ? (
//           <Text style={{ fontFamily: "open-sans-bold" }}>Favorites</Text>
//         ) : (
//           "Favorites"
//         ),
//       tabBarIcon: (tabInfo) => {
//         return <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />;
//       },
//       tabBarColor: Colors.accentColor,
//     },
//   },
// };

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
          // tabBarColor: Colors.primaryColor,
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
        component={FavoritesNavigator}
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
                name="ios-star"
                size={tabInfo.focused ? 27 : 22}
                color={tabInfo.color}
              />
            );v
          },
          tabBarColor:
            Platform.OS === "android"
              ? Colors.thirdColor
              : Colors.accentColor,
        }}
      />
    </MealsFavBottomTabsNavigator.Navigator>
  );
};
// const MealsFavTabNavigator =
//   Platform.OS === "android"
//     ? createMaterialBottomTabNavigator(tabScreenConfig, {
//         activeTintColor: "white",
//         shifting: true,
//       })
//     : createBottomTabNavigator(tabScreenConfig, {
//         tabBarOptions: {
//           labelStyle: {
//             fontFamily: "open-sans",
//           },
//           activeTintColor: Colors.accentColor,
//           tabBarLabel:
//             Platform.OS === "android" ? (
//               <Text style={{ fontFamily: "open-sans-bold" }}>Meals</Text>
//             ) : (
//               "Meals"
//             ),
//         },
//       });

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

// const FiltersNavigator = createStackNavigator(
//   {
//     Filters: FilterScreen,
//   },
//   {
//     defaultNavigationOptions: defaultStackNavOptions,
//   }
// );
const MainDrawerNavigator = createDrawerNavigator();

export const MainNavigator = () => {
  return (
    <MainDrawerNavigator.Navigator
      drawerContentOptions={{
        activeTintColor: Colors.thirdColor,
        activeBackgroundColor: Colors.accentColor
      }}
    >
      <MainDrawerNavigator.Screen
        name="MealsFavs"
        component={MealsFavTabNavigator}
        options={{ title: "Meals" }}
      />
      <MainDrawerNavigator.Screen name="Filters" component={FiltersNavigator} />
      {/* <MainDrawerNavigator.Screen name="Ingredients" component={IngredientsScreen} options={} /> */}
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
// const MainNavigator = createDrawerNavigator(
//   {
//     MealsFavs: {
//       screen: MealsFavTabNavigator,
//       title: "Meals",
//     },
//     Filters: FiltersNavigator,
//   },
//   {
//     contentOptions: {
//       activeTintColor: Colors.accentColor,

//       labelStyle: {
//         fontFamily: "open-sans-bold",
//       },
//     },
//   }
// );

// export default createAppContainer(MainNavigator);
