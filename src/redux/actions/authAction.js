import { actionTypes }from '../constants/actionTypes'
import apiInstance from '../apiInstance/api';

export const logIn = (payload) => async(dispatch) => {

    dispatch({type: actionTypes.LOGIN , payload: payload})
}

export const signUp = (payload) => async(dispatch) => {

    dispatch({type: actionTypes.SIGNUP , payload: payload})
}

export const getUser = () => async(dispatch) => {
    
    const response = await apiInstance.get('/getUser')
    dispatch({type: actionTypes.GET_USER , payload: response.data})
}

export const updateProfile = (payload) => async (dispatch) => {

    const response = await apiInstance.patch('/updateProfile', payload)
    dispatch ({type : actionTypes.UPDATE_PROFILE, payload:response.data})
}

export const uploadProfileImage = (payload) => async (dispatch) => {

    const response = await apiInstance.post('/uploadProfileImage', payload,{
        headers: {
          'Content-Type': 'multipart/form-data',
        }}
    )
    sessionStorage.setItem('userImage' , response.data.userImage )
    dispatch ({type : actionTypes.UPLOAD_PROFILE_IMAGE, payload:response.data})
}