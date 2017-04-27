import { AUTH_LOGIN, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAILURE } from './ActionTypes';
import axios from 'axios';

const res = axios.create({
    baseURL: 'http://localhost:3001/',
    timeout: 10000,
    withCredentials: true,
    headers: {
        'Accept': 'appliction/json',
        'Content-Type':'application/json'
    }
});

export function loginRequest(username, password) {
    return (dispatch) => {
        dispatch(login());

        return res.post('/signin', { username, password})
        .then((response) => {
            dispatch(loginSuccess(username));
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

export function loginSuccess(username) {
    return {
        type: AUTH_LOGIN_SUCCESS,
        username
    };
}

export function loginFailure() {
    return {
        type: AUTH_LOGIN_FAILURE
    };
}