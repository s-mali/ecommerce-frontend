import { actionTypes }from '../constants/actionTypes'
import apiInstance from '../apiInstance/api';

export const logIn = (payload) => async(dispatch) => {

    dispatch({type: actionTypes.LOGIN , payload: payload})
}

export const signUp = (payload) => async(dispatch) => {

    dispatch({type: actionTypes.SIGNUP , payload: payload})
}