import {delay} from 'redux-saga'
import {put} from 'redux-saga/effects';
import axios from 'axios';

import * as actions from '../actions/index'

export function* logOutSaga(action){
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userID');
    yield put(actions.logOutSucceed());
}

export function* checkTimeOutSaga(action){
    yield delay(action.expireTime * 1000)
    yield put(actions.logOut());
}

export function* authUserSaga(action){
       yield put (actions.authStart());
        const authData = {
            email: action.email,
            password: action.password,
            returnSecureToken: true
        }
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyB3w4zgRZMlYMlymavseUaxj825sa7tKGc';
        if(!action.isSignUp){
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyB3w4zgRZMlYMlymavseUaxj825sa7tKGc';
        }
        try{
            const response = yield axios.post(url, authData)
            const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
			console.log('[authuser]',response.data)
            yield localStorage.setItem('token', response.data.idToken);
            yield localStorage.setItem('expirationDate', expirationDate);
            yield localStorage.setItem('userID', response.data.localId);
            yield put (actions.authSuccess(response.data.idToken, response.data.localId));
            yield put (actions.authLogout(response.data.expiresIn));
        }catch(error){
            yield put(actions.authFailed(error.response.data.error))
        }
}

export function* AuthCheckOutSaga(action){
    const token = yield localStorage.getItem('token');
        if (!token){
            yield put(actions.logOut());
        }else{
            const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
            if(expirationDate <= new Date()){
                yield put(actions.logOut());
            }else{
                const userId = localStorage.getItem('userID');
                yield put(actions.authSuccess(token, userId))
                yield put(actions.authLogout((expirationDate.getTime() - new Date().getTime())/1000))
            }
        }
}