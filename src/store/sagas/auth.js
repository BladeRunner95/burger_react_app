import { put } from 'redux-saga/effects'; //dispatches a new action
import * as actionTypes from "../actions/actionTypes";

export function* logoutSaga(action) {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userId');
    yield put({
        type: actionTypes.AUTH_LOGOUT,
    })
}