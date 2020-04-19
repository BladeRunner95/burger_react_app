import { logoutSaga } from './auth';
import { takeEvery } from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';


export function* watchAuth() {
    yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga); //adds listener to the first argument and execute the second arg
}