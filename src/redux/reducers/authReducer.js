import { actionTypes } from '../constants/actionTypes'

const initState = null;

export default (state = initState, action) => {
  switch (action.type) {

    case actionTypes.LOGIN_SUCCESS:
      return action.payload

    default:
      return state;
  }
};