export const SET_WEEKDAY = "SET_WEEKDAY";

export const setWeekday = (day) => {
  return {
    type: SET_WEEKDAY,
    day: day,
  };
};

