import React, { useState, useReducer, useCallback } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Button,
} from "react-native";
import { useDispatch } from "react-redux";
import * as ingredientsActions from "../store/actions/ingredients";
import Input from "../components/Input";
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

const AddIngredient = (props) => {
  const dispatch = useDispatch();
  const [error, setError] = useState();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      name: "",
      quantity: 0,
    },
    inputValidities: {
      name: false,
      quantity: true,
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
      await dispatch(
        ingredientsActions.addIngredient(
          formState.inputValues.name,
          formState.inputValues.quantity
        )
      );
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
            id="name"
            label="Name"
            errorText="Please enter a valid Title"
            keyboardType="default"
            autoCapitalize="words"
            autoCorrect
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            placeholder="enter an ingredient Name"
            initallyValid={true}
            required
          />
          <Input
            id="quantity"
            label="Quantity"
            errorText="Please enter a valid URL"
            keyboardType="number-pad"
            returnKeyType="go"
            onInputChange={inputChangeHandler}
            placeholder="If no value It will initialize as 0"
            initallyValid={true}
          />
          <Button
            title="Add Ingredient"
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
});

export const screenOptions = (navData) => {
  return {
    title: "Add Ingredient",
  };
};

export default AddIngredient;
