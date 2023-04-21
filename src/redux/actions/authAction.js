import { actionTypes }from '../constants/actionTypes'

export const logIn = (payload) => {
    return {
        type : actionTypes.LOGIN,
        payload : payload
    }
}