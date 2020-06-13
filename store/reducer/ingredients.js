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
  switch (action.type) {
    case GET_INGREDIENTS:
      //FILTER BY MEAL ID 1; those are the generic ingredients; all others are assigned to a specific meal and would otherwise show many times in the list
      let mainIngredients = action.ingredients.filter(ing=> ing.meal_id === 1);
      mainIngredients.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)); 
      return {
        ...state,
        ingredients: mainIngredients,
      };

    case ADD_INGREDIENT:
      
      ingredient = new Ingredient(
        action.ingredient.id,
        action.ingredient.name,
        action.ingredient.quantity
      );

      updatedIngState = [...state.ingredients];
      updatedIngState.push(ingredient);

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
        action.ingredient.quantity
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
