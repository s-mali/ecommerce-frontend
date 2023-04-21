import { takeLatest } from 'redux-saga/effects';
import { actionTypes } from '../constants/actionTypes';
import authSaga from './authSaga'


function* rootSaga() {
    yield takeLatest([
        actionTypes.LOGIN
    ],authSaga)    
}

export default rootSaga