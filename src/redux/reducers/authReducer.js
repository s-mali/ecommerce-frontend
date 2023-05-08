import { actionTypes } from '../constants/actionTypes'

const initState = null;

export const userState = (state = initState, {type , payload}) => {
  switch (type) {

    case actionTypes.LOGIN:
      return { ...payload }

    case actionTypes.SIGNUP:
      return { ...payload}

    default:
      return state;
  }
};