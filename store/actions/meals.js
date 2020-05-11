export const TOGGLE_FAVORITE = "TOGGLE_FAVORITE";
export const SET_FILTERS = "SET_FILTERS";
export const ADD_TO_WEEKDAY = "ADD_TO_WEEKDAY";

export const toggleFavorite = (id) => {
  return {
    type: TOGGLE_FAVORITE,
    mealId: id,
  };
};

export const setFilters = (filterSettings) => {
  return {
    type: SET_FILTERS,
    filters: filterSettings,
  };
};

export const addMealToWeekday = (day, meal) => {
  return {
    type: ADD_TO_WEEKDAY,
    day: day,
    meal: meal,
  };
};
