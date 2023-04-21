import { put, takeLatest, all } from 'redux-saga/effects';
import axios from 'axios';
import { actionTypes } from "../constants/actionTypes"

function* authSaga({ type, payload }) {

  switch (type) {

    case actionTypes.LOGIN :
      try {
        const response = yield axios.get('http://localhost:5000/api/v1/login', payload);
        const user = yield response.data;

        yield put({ type: actionTypes.LOGIN_SUCCESS, payload: user });
      } catch (error) {
        yield put({ type: actionTypes.LOGIN_ERROR, error });
      }
    
    default: 
      throw new Error('Unexpected Action Type.');
    
  }

}

  export default authSaga


