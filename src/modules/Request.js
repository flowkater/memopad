import axios from 'axios';
import Auth from './Auth';

const URL = 'http://localhost:3001/api/'

export const res = axios.create({
    baseURL: URL,
    timeout: 10000,
    headers: {
        'Accept': 'appliction/json',
        'Content-Type':'application/json'
    }
});

export const auth_res = axios.create({
    baseURL: URL,
    timeout: 10000,
    headers: {
        'Accept': 'appliction/json',
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + Auth.getToken()
    }
});