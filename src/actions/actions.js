import { ADD_MEETING, UPDATE_BUILDINGS, USER_INPUT } from '../constants';

export const addUserInput = (userInput) => {
  return {
    type: USER_INPUT,
    payload: userInput,
  };
};

export const addMeeting = (meeting) => {
  return {
    type: ADD_MEETING,
    payload: meeting,
  };
};

export const updateBuildings = (building) => {
  return {
    type: UPDATE_BUILDINGS,
    payload: building,
  };
};
