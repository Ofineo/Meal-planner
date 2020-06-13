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

export const addIngredient = (name, quantity, mealId = 1) => {
  console.log(
    "action",
    name,
    quantity,
    JSON.stringify({ name: name, quantity: quantity, meal_id: mealId })
  );
  try {
    return async (dispatch) => {
      const response = await fetch(
        `https://mealschedule.herokuapp.com/ingredients`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name,
            quantity: quantity,
            meal_id: mealId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const resData = await response.json();
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

export const PlusOneIngredient = (ingredient) => {
  ingredient.quantity = ingredient.quantity + 1;
  try {
    return async (dispatch) => {
      const response = await fetch(
        `https://mealschedule.herokuapp.com/ingredients/${ingredient.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(ingredient),
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const resData = await response.json();
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

export const MinusOneIngredient = (ingredient) => {
  if (ingredient.quantity>0) ingredient.quantity = ingredient.quantity - 1;

  try {
    return async (dispatch) => {
      const response = await fetch(
        `https://mealschedule.herokuapp.com/ingredients/${ingredient.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(ingredient),
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const resData = await response.json();
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
