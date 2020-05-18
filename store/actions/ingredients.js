export const GET_INGREDIENTS = "GET_INGREDIENTS";
export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const REMOVE_INGREDIENT = "REMOVE_INGREDIENT";

export const getIngredients = () => {
  try {
    return async (dispatch) => {
      const response = await fetch("https://mealschedule.herokuapp.com/ingredients");

      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const resData = await response.json(); 
      console.log(resData);

      dispatch({ type: GET_INGREDIENTS, ingredients: resData.ingredients });
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const addIngredient = (ingredient) => {
  return {
    type: ADD_INGREDIENT,
    ingredient: ingredient,
  };
};

export const removeIngredient = (ingredient) => {
  return {
    type: REMOVE_INGREDIENT,
    ingredient: ingredient,
  };
};
