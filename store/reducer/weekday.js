import { SET_WEEKDAY } from "../actions/weekday";

const initalState = {
  weekday: "Monday",
};

const weekdayReducer = (state = initalState, action) => {
  switch (action.type) {
    case SET_WEEKDAY:
      return {
        ...state,
        weekday: action.day,
      };
    default:
      return state;
  }
};
export default weekdayReducer;
