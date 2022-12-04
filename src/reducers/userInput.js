import { USER_INPUT } from '../constants';

const userInputReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case USER_INPUT: {
      return payload;
    }
    default:
      return { ...state };
  }
};

export default userInputReducer;
