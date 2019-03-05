import {put} from 'redux-saga/effects';
import axios from 'axios';

import * as actions from '../actions/index'

export function* purchaseOrderStartSaga(action){
    yield put(actions.purchaseBurgerStart());

    try{
        const response = yield axios.post('https://react-my-burger-c962c.firebaseio.com/orders.json?auth='+action.token, action.orderData);
        yield put (actions.purchaseBurgerSuccess(response.data.name, action.orderData))
    }catch(error){
        yield put(actions.purchaseBurgerFail(error))
    }
}

export function* fetchOrdersSaga(action){
   yield put(actions.fetchOrdersStart());
   console.log('[Fetch Orders action.token]', action.token);
    const queryParam = '?auth='+ action.token+'&orderBy="userId"&equalTo="'+action.userId+'"'
    try{
        const response = yield axios.get('https://react-my-burger-c962c.firebaseio.com/orders.json'+ queryParam);
        const fetchOrders = [];
        for (let key in response.data){
            fetchOrders.push({
                ...response.data[key],
                id: key
            });
        }
        yield put(actions.fetchOrdersSuccess(fetchOrders))
    }
    catch(error){
         yield put(actions.fetchOrdersFailed(error))
    }
}