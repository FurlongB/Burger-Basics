import {takeEvery, takeLatest} from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import { logOutSaga, checkTimeOutSaga, authUserSaga, AuthCheckOutSaga } from './auth';
import {initIngredientsSaga} from './burgerBuilder';
import {purchaseOrderStartSaga, fetchOrdersSaga} from './orders';

export function* watchAuth(){
    yield takeEvery(actionTypes.AUTH_INIT_LOGOUT, logOutSaga);
    yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkTimeOutSaga);
    yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
    yield takeEvery(actionTypes.AUTH_CHECK_STATE, AuthCheckOutSaga);
}

export function* watchBurgerBuilder(){
    yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
}

export function* watchOrders(){
    yield takeLatest(actionTypes.PURCHASE_BURGER_INIT, purchaseOrderStartSaga);
    yield takeEvery(actionTypes.FETCH_ORDERS_INIT, fetchOrdersSaga);
}