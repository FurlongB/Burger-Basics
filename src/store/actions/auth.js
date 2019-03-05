import * as actionTypes from './actionTypes';


export const authStart = () =>{
    return{
        type: actionTypes.AUTH_START
    }
};

export const authSuccess = (token, userId) =>{
    return{
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userID: userId
    }
};

export const authFailed = (error) =>{
    return{
        type: actionTypes.AUTH_FAILED,
        error: error
    }
};

export const authLogout = (expireTime) =>{
    return {
        type: actionTypes.AUTH_CHECK_TIMEOUT,
        expireTime: expireTime
    };
};

export const logOut = () => {
    //localStorage.removeItem('token');
    //localStorage.removeItem('expirationDate');
    //localStorage.removeItem('userID');
    return{
        type: actionTypes.AUTH_INIT_LOGOUT
    };
};

export const logOutSucceed = () =>{
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const auth = (email, password, isSignUp) =>{
    return {
        type: actionTypes.AUTH_USER,
        email: email,
        password: password,
        isSignUp: isSignUp
    }
};

export const setAuthRedirectPath = (path) =>{
    return{
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const AuthCheckOut = () =>{
    return {
        type: actionTypes.AUTH_CHECK_STATE
        
    };
};

