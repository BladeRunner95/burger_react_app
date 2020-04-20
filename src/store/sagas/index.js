import {logoutSaga, checkAuthTimeoutSaga, authUserSaga, authCheckStateSaga} from './auth';
import {takeEvery, all, takeLatest} from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';
import {initIngredientsSaga} from "./burgerBuilder";
import {purchaseBurgerSaga, fetchOrdersSaga} from './order';


export function* watchAuth() {
    yield  all([
        takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga), //adds listener to the first argument and execute the second arg
        takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
        takeEvery(actionTypes.AUTH_USER, authUserSaga),
        takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)
    ]);
}

export function* watchBurgerBuilder() {
    yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga)
}

export function* watchOrder() {
    yield takeLatest(actionTypes.PURCHASE_BURGER, purchaseBurgerSaga)
}

export function* watchFetchOrders() {
    yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga)
}