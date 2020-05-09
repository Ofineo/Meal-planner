import { INGREDIENTS } from "../../data/dummy-data";

const initialState = {
  ingredients: INGREDIENTS,
  filteredMeals: INGREDIENTS,
};

const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default ingredientsReducer;
