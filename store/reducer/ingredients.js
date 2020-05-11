import { INGREDIENTS } from "../../data/dummy-data";
import { ADD_INGREDIENT, REMOVE_INGREDIENT } from "../actions/ingredients";
import Ingredient from "../../models/ingredient";

const initialState = {
  ingredients: INGREDIENTS,
  filteredMeals: INGREDIENTS,
};

const ingredientsReducer = (state = initialState, action) => {
  let ingIndex, updatedIng, updatedIngState;

  switch (action.type) {
    case ADD_INGREDIENT:
      ingIndex = state.ingredients.findIndex(
        (ing) => ing.id === action.ingredient.id
      );
      console.log(ingIndex);
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
