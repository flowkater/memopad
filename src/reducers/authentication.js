import * as types from '../actions/ActionTypes';
import update from 'immutability-helper';

const authInitialState = {
    login: {
        status: 'INIT'
    },
    register: {
        status: 'INIT',
        error: -1
    },
    status: {
        valid: false,
        isLoggedIn: false,
        token: '',
        currentUserId: -1
    }
};


export default function authentication(state, action) {
    if( typeof state === "undefined")
        state = authInitialState;

    switch(action.type) {
        case types.AUTH_LOGIN:
            return update(state,{
                login: {
                    status: { $set: 'WAITING' }
                }
            });
        case types.AUTH_LOGIN_SUCCESS:
            return update(state,{
                login: {
                    status: { $set: 'SUCCESS' }
                },
                status: {
                    isLoggedIn: { $set: true },
                    token: { $set: action.token },
                    currentUserId: { $set: action.userId }
                }
            });
        case types.AUTH_LOGIN_FAILURE:
            return update(state, {
                login: {
                    status: { $set: 'FAILURE' }
                }
            });
        case types.AUTH_REGISTER:
            return update(state, {
                register: {
                    status: { $set: 'WAITING' },
                    error: { $set: -1 }
                }
            });
        case types.AUTH_REGISTER_SUCCESS:
            return update(state, {
                register: {
                    status: { $set: 'SUCCESS' }
                }
            });
        case types.AUTH_REGISTER_FAILURE:
            return update(state, {
                register: {
                    status: { $set: 'FAILURE' },
                    error: { $set: action.error }
                }
            });
        case types.AUTH_GET_STATUS:
            return update(state, {
                status: {
                    isLoggedIn: { $set: true }
                }    
            });
        case types.AUTH_GET_STATUS_SUCCESS:
            return update(state, {
               status: {
                   valid: { $set: true },
                   token: { $set: action.token },
                   currentUserId: { $set: action.userId }
               } 
            });
        case types.AUTH_GET_STATUS_FAILURE:
            return update(state, {
               status: {
                   valid: { $set: false },
                   isLoggedIn: { $set: false }
               } 
            });
        case types.AUTH_LOGOUT:
            return update(state, {
                status: {
                    isLoggedIn: { $set: false },
                    token: { $set: '' },
                    currentUserId: { $set: -1 }
                }
            });
        default:
            return state;
    }
}