import React, { useState } from "react";
import * as Fonts from "expo-font";
import { AppLoading } from "expo";
import MealsNavigator from "./navigation/MealsNavigator";
import { enableScreens } from "react-native-screens";
import { createStore, combineReducers } from "redux";
import mealsReducer from "./store/reducer/meals";
import { Provider } from "react-redux";
import { applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";

enableScreens();

const rootReducer = combineReducers({
  meals: mealsReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

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
      <MealsNavigator />
    </Provider>
  );
}
