import { INGREDIENTS } from "../../data/dummy-data";
import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  GET_INGREDIENTS,
} from "../actions/ingredients";
import Ingredient from "../../models/ingredient";

const initialState = {
  ingredients: null,
  filteredMeals: INGREDIENTS,
};

const ingredientsReducer = (state = initialState, action) => {
  let ingIndex, updatedIng, updatedIngState;
  console.log(action);
  switch (action.type) {
    case GET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.ingredients,
      };

    case ADD_INGREDIENT:
      ingIndex = state.ingredients.findIndex(
        (ing) => ing.id === action.ingredient.id
      );
      updatedIng = new Ingredient(
        action.ingredient.id,
        action.ingredient.name,
        action.ingredient.quantity + 1
      );
      updatedIngState = [...state.ingredients];
      updatedIngState[ingIndex] = updatedIng;

      return {
        ...state,
        ingredients: updatedIngState,
      };
    case REMOVE_INGREDIENT:
      ingIndex = state.ingredients.findIndex(
        (ing) => ing.id === action.ingredient.id
      );
      updatedIng = new Ingredient(
        action.ingredient.id,
        action.ingredient.name,
        action.ingredient.quantity - 1
      );
      updatedIngState = [...state.ingredients];
      updatedIngState[ingIndex] = updatedIng;
      return {
        ...state,
        ingredients: updatedIngState,
      };
    default:
      return state;
  }
};

export default ingredientsReducer;
