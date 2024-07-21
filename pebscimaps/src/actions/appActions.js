// src/actions/appActions.js
export const SET_MODE = 'SET_MODE';
export const SET_VIEW = 'SET_VIEW';

export const setMode = (mode) => ({
  type: SET_MODE,
  payload: mode,
});

export const setView = (view) => ({
  type: SET_VIEW,
  payload: view,
});
