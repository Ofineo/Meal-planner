export const GET_INGREDIENTS = "GET_INGREDIENTS";
export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const REMOVE_INGREDIENT = "REMOVE_INGREDIENT";

export const getIngredients = () => {
  try {
    return async (dispatch) => {
      const response = await fetch(
        "https://mealschedule.herokuapp.com/ingredients"
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const resData = await response.json();

      dispatch({ type: GET_INGREDIENTS, ingredients: resData.ingredients });
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const addIngredient = (name, quantity) => {
  console.log("action", name, quantity);
  try {
    return async (dispatch) => {
      const response = await fetch(
        `https://mealschedule.herokuapp.com/ingredients/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(name, quantity),
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const resData = await response.json();
      console.log("resData in Actions Ingredients", resData);
      dispatch({
        type: ADD_INGREDIENT,
        ingredient: resData.ingredient,
      });
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const removeIngredient = (ingredient) => {
  ingredient.quantity = (+ingredient.quantity - 1).toString();
  try {
    return async (dispatch) => {
      const response = await fetch(
        `https://mealschedule.herokuapp.com/ingredients/${ingredient.id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(ingredient),
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const resData = await response.json();
      console.log("response", resData);
      dispatch({
        type: REMOVE_INGREDIENT,
        ingredient: resData.ingredient,
      });
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
