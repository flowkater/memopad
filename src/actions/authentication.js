import { AUTH_LOGIN, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAILURE } from './ActionTypes';
import axios from 'axios';
import Auth from '../modules/Auth';

const res = axios.create({
    baseURL: 'http://localhost:3001/api/',
    timeout: 10000,
    headers: {
        'Accept': 'appliction/json',
        'Content-Type':'application/json'
    }
});

export function loginRequest(email, password) {
    return (dispatch) => {
        dispatch(login());

        console.log("check");

        return res.post('/signin', { email, password})
        .then((response) => {
            Auth.authenticateUser('token', response.data.auth_token);
            dispatch(loginSuccess(email));
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

export function loginSuccess(email) {
    return {
        type: AUTH_LOGIN_SUCCESS,
        email
    };
}

export function loginFailure() {
    return {
        type: AUTH_LOGIN_FAILURE
    };
}