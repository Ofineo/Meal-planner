import React, { useState, useReducer, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Button,
  Picker,
} from "react-native";
import { useDispatch } from "react-redux";
import * as mealActions from "../store/actions/meals";
import Input from "../components/Input";
import FilterSwitch from "../components/FilterSwitch";
import Colors from "../constants/Colors";

const formReducer = (state, action) => {
  if (action.type === "FORM_UPDATE") {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updateValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedformIsValid = true;
    for (const key in updateValidities) {
      updatedformIsValid = updatedformIsValid && updateValidities[key];
    }
    return {
      inputValues: updatedValues,
      inputValidities: updateValidities,
      formIsValid: updatedformIsValid,
    };
  }
  return state;
};

const AddNewMealScreen = (props) => {
  const dispatch = useDispatch();
  const [error, setError] = useState();
  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);
  const [categoryState, setCategoryState] = useState(1);
  const [affordabilityState, setAffordabilityState] = useState(1);
  const [complexityState, setComplexityState] = useState(1);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: "",
      affordablility: 1,
      category: 1,
      complexity: 1,
      imageUrl: "",
      duration: 0,
      steps: "",
      isGlutenFree: false,
      isVegan: false,
      isVegetarian: false,
      isLactoseFree: false,
      ingredients: [],
    },
    inputValidities: {
      title: false,
      affordablility: true,
      category: true,
      complexity: true,
      imageUrl: false,
      duration: false,
      steps: false,
      isGlutenFree: true,
      isVegan: true,
      isVegetarian: true,
      isLactoseFree: true,
      ingredients: false,
    },
    formIsValid: false,
  });

  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert("Wrong input", "PLease check errors in the form", [
        {
          text: "Okay",
        },
      ]);
      return;
    }
    setError(null);
    try {
      console.log(
        formState.inputValues.title,
        formState.inputValues.affordablility,
        formState.inputValues.category,
        formState.inputValues.complexity,
        formState.inputValues.imageUrl,
        formState.inputValues.duration,
        formState.inputValues.steps,
        formState.inputValues.isGlutenFree,
        formState.inputValues.isVegan,
        formState.inputValues.isVegetarian,
        formState.inputValues.isLactoseFree,
        formState.inputValues.ingredients
      );
      // await dispatch(
      //   mealActions.addMealToWeekday(
      //     formState.inputValues.title,
      //     formState.inputValues.affordablility,
      //     formState.inputValues.category,
      //     formState.inputValues.complexity,
      //     formState.inputValues.imageUrl,
      //     formState.inputValues.duration,
      //     formState.inputValues.steps,
      //     formState.inputValues.isGlutenFree,
      //     formState.inputValues.isVegan,
      //     formState.inputValues.isVegetarian,
      //     formState.inputValues.isLactoseFree
      // formState.inputValues.ingredients
      //   )
      // );
      props.navigation.goBack();
    } catch (error) {
      setError(error.message);
    }
  }, [dispatch, formState]);

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: "FORM_UPDATE",
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      <ScrollView>
        <View style={styles.form}>
          <Input
            id="title"
            label="Meal Title"
            errorText="Please enter a valid meal title"
            autoCapitalize="words"
            keyboardType="default"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initallyValid={false}
            required
          />
          <Text style={styles.pickerLabel}>Meal Category</Text>
          <Picker
            selectedValue={formState.inputValues.affordablility}
            onValueChange={(affordablility) =>
              inputChangeHandler("affordablility", affordablility, true)
            }
            style={styles.pickerInput}
            mode="dialog"
            itemStyle={styles.pickerItem}
          >
            <Picker.Item label="Exotic" value={1} />
            <Picker.Item label="Quick & Easy" value={2} />
            <Picker.Item label="Light & lovely" value={3} />
            <Picker.Item label="Asian" value={4} />
            <Picker.Item label="Summer" value={5} />
            <Picker.Item label="Winter" value={6} />
            <Picker.Item label="Breakfast" value={7} />
            <Picker.Item label="Hamburgers" value={8} />
            <Picker.Item label="German" value={9} />
            <Picker.Item label="Italian" value={10} />
          </Picker>

          <Text style={styles.pickerLabel}>Meal Affordability</Text>
          <Picker
            selectedValue={formState.inputValues.category}
            onValueChange={(category) =>
              inputChangeHandler("category", category, true)
            }
            style={styles.pickerInput}
            mode="dialog"
            itemStyle={styles.pickerItem}
          >
            <Picker.Item label="Affordable" value={1} />
            <Picker.Item label="Pricey" value={2} />
            <Picker.Item label="Luxurious" value={3} />
          </Picker>
          <Text style={styles.pickerLabel}>Meal Complexity</Text>
          <Picker
            selectedValue={formState.inputValues.complexity}
            onValueChange={(complexity) =>
              inputChangeHandler("complexity", complexity, true)
            }
            style={styles.pickerInput}
            mode="dialog"
            itemStyle={styles.pickerItem}
          >
            <Picker.Item label="Simple" value={1} />
            <Picker.Item label="Hard" value={2} />
            <Picker.Item label="Challenging" value={3} />
          </Picker>
          <Input
            id="imageUrl"
            label="Image Url"
            errorText="Please add an image Url of the meal"
            keyboardType="default"
            multiline
            numberOfLines={3}
            onInputChange={inputChangeHandler}
            initallyValid={false}
            returnKeyType="next"
            required
            minLength={5}
          />
          <Input
            id="duration"
            label="Meal Duration"
            errorText="Please add a rough meal preparation time"
            keyboardType="number-pad"
            onInputChange={inputChangeHandler}
            initallyValid={false}
            returnKeyType="next"
            required
          />
          <Input
            id="steps"
            label="Preparation steps"
            errorText="Please write some meal preparation steps"
            keyboardType="default"
            multiline
            numberOfLines={6}
            onInputChange={inputChangeHandler}
            initallyValid={false}
            returnKeyType="next"
            required
            minLength={10}
          />
          <Input
            id="ingredients"
            label="Ingredients"
            errorText="Please list the ingredients separated by coma"
            keyboardType="default"
            autoCapitalize="words"
            multiline
            numberOfLines={3}
            onInputChange={inputChangeHandler}
            initallyValid={false}
            returnKeyType="next"
            required
            minLength={10}
          />
          <FilterSwitch
            label="Gluten Free"
            state={formState.inputValues.isGlutenFree}
            setState={(newValue) =>
              inputChangeHandler("isGlutenFree", newValue, true)
            }
          />
          <FilterSwitch
            label="Vegan"
            state={formState.inputValues.isVegan}
            setState={(newValue) =>
              inputChangeHandler("isVegan", newValue, true)
            }
          />
          <FilterSwitch
            label="Vegetarian"
            state={formState.inputValues.isVegetarian}
            setState={(newValue) =>
              inputChangeHandler("isVegetarian", newValue, true)
            }
          />
          <FilterSwitch
            label="Lactose Free"
            state={formState.inputValues.isLactoseFree}
            setState={(newValue) =>
              inputChangeHandler("isLactoseFree", newValue, true)
            }
          />
          <Button
            title="Add Meal"
            onPress={submitHandler}
            color={Colors.primaryColor}
            disabled={!formState.formIsValid}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  formControl: {
    width: "100%",
  },
  title: {
    fontFamily: "bb2-bold",
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  pickerInput: {
    width: 160,
    fontFamily: "bb2-regular",
    fontSize: 13,
  },
  pickerLabel: {
    color: "black",
    fontWeight: "900",
    fontFamily: "bb2-bold",
    fontSize: 14,
  },
  pickerItem: {
    color: "red",
    fontWeight: "900",
    fontFamily: "bb2-regular",
    fontSize: 13,
    padding: 30,
  },
});

export const screenOptions = (navData) => {
  return {
    title: "Add Meal",
  };
};

export default AddNewMealScreen;
