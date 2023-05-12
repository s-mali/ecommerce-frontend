import { actionTypes } from '../constants/actionTypes'

const initState = {};

export const userState = (state = initState, {type , payload}) => {
  switch (type) {

    case actionTypes.LOGIN:
      return { ...payload }

    case actionTypes.SIGNUP:
      return { ...payload}

    case actionTypes.GET_USER:
      return { ...payload}

    case actionTypes.UPDATE_PROFILE:
      return { ...payload}

    case actionTypes.UPLOAD_PROFILE_IMAGE:
      return { ...payload }

    default:
      return state;
  }
};