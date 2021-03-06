import { 
    AUTH_LOGIN, 
    AUTH_LOGIN_SUCCESS, 
    AUTH_LOGIN_FAILURE,
    AUTH_REGISTER, 
    AUTH_REGISTER_SUCCESS, 
    AUTH_REGISTER_FAILURE,
    AUTH_GET_STATUS, 
    AUTH_GET_STATUS_SUCCESS, 
    AUTH_GET_STATUS_FAILURE,
    AUTH_LOGOUT } from './ActionTypes';

import { res, auth_res } from '../modules/Request';

/* login actions */

export function loginRequest(email, password) {
    return (dispatch) => {
        dispatch(login());

        return res.post('/signin', { email, password})
        .then((response) => {
            dispatch(loginSuccess(response.data.auth_token, response.data.account.id));
        }).catch((error) => {
            dispatch(loginFailure());
        });

    };
}

export function login() {
    return {
        type: AUTH_LOGIN
    };
}

export function loginSuccess(token, userId) {
    return {
        type: AUTH_LOGIN_SUCCESS,
        token,
        userId
    };
}

export function loginFailure() {
    return {
        type: AUTH_LOGIN_FAILURE
    };
}

/* register actions */

export function registerRequest(email, password) {
    return (dispatch) => {
        dispatch(register());

        return res.post('/signup', { email, password })
        .then((response) => {
            dispatch(registerSuccess());
        }).catch((error) => {
            dispatch(registerFailure(error.response.data.error.code));
        });
    };
}

export function register() {
    return {
        type: AUTH_REGISTER
    };
}

export function registerSuccess() {
    return {
        type: AUTH_REGISTER_SUCCESS
    };
}

export function registerFailure(error) {
    return {
        type: AUTH_REGISTER_FAILURE,
        error
    };
}


/* get status actions */

export function getStatusRequest() {
    return (dispatch) => {
        dispatch(getStatus());

        return auth_res.get('/getinfo')
        .then((response) => {
            dispatch(getStatusSuccess(response.data.auth_token, response.data.account.id));
        }).catch((error) => {
            console.log(error.response);
            dispatch(getStatusFailure());
        });
    };
}

export function getStatus() {
    return {
        type: AUTH_GET_STATUS
    };
}

export function getStatusSuccess(token, userId) {
    return {
        type: AUTH_GET_STATUS_SUCCESS,
        token,
        userId
    };
}

export function getStatusFailure() {
    return {
        type: AUTH_GET_STATUS_FAILURE
    };
}

/* Logout */
export function logoutRequest() {
    return (dispatch) => {
        return auth_res.delete('/logout')
        .then((response) => {
            dispatch(logout());
        });
    };
}

export function logout() {
    return {
        type: AUTH_LOGOUT
    };
}