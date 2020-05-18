import React, { useState } from "react";
import * as Fonts from "expo-font";
import { AppLoading } from "expo";
import AppNavigator from "./navigation/MealsNavigator";
import { enableScreens } from "react-native-screens";
import { createStore, combineReducers, applyMiddleware } from "redux";
import mealsReducer from "./store/reducer/meals";
import ingredientsReducer from "./store/reducer/ingredients";
import weekdayReducer from "./store/reducer/weekday";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

enableScreens();

const rootReducer = combineReducers({
  meals: mealsReducer,
  ingredients: ingredientsReducer,
  weekday: weekdayReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

const fetchFonts = () => {
  return Fonts.loadAsync({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    "bb2-regular": require("./assets/fonts/BalooBhaina2-Regular.ttf"),
    "bb2-bold": require("./assets/fonts/BalooBhaina2-Bold.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={console.warn}
      />
    );
  }
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
