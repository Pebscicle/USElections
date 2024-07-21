// src/reducers/appReducer.js
import { SET_MODE, SET_VIEW } from '../actions/appActions';

const initialState = {
  mode: 'general', // Default value for mode
  view: 'map', // Default value for view
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MODE:
      return { ...state, mode: action.payload };
    case SET_VIEW:
      return { ...state, view: action.payload };
    default:
      return state;
  }
};

export default appReducer;
