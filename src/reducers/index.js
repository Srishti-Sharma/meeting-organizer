import { combineReducers } from '@reduxjs/toolkit';
import buildings from './buildings';
import userInputReducer from './userInput';

const rootReducer = combineReducers({
  buildings,
  userInput: userInputReducer,
});

export default rootReducer;
