// src/store/index.js
import { createStore } from 'redux';
import rootReducer from '../reducers'; // We will create this next

const store = createStore(rootReducer);

export default store;