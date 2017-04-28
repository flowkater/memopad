import {
    MEMO_POST,
    MEMO_POST_SUCCESS,
    MEMO_POST_FAILURE,
    MEMO_LIST,
    MEMO_LIST_SUCCESS,
    MEMO_LIST_FAILURE
} from './ActionTypes';

import { auth_res } from '../modules/Request';

export function memoPostRequest(contents) {
    return (dispatch) => {
        dispatch(memoPost());

        return auth_res.post('/memos', { contents })
        .then((response) => {
            dispatch(memoPostSuccess());
        }).catch((error) => {
            dispatch(memoPostFailure(error.response.data.error.code));
        });
    };
}

function memoPost() {
    return {
        type: MEMO_POST
    };
}

function memoPostSuccess() {
    return {
        type: MEMO_POST_SUCCESS
    };
}

function memoPostFailure(error) {
    return {
        type: MEMO_POST_FAILURE,
        error
    };
}

export function memoListRequest(isInitial, listType, id, username){
    return (dispatch) => {
        dispatch(memoList());

        let url = '/memos';

        return auth_res.get(url)
        .then((response) =>  {
            dispatch(memoListSuccess(response.data.memos, isInitial, listType));
        }).catch((error) => {
            dispatch(memoListFailure());
        });
    };
}

export function memoList() {
    return {
        type: MEMO_LIST  
    };
}

export function memoListSuccess(data, isInitial, listType) {
    return {
        type: MEMO_LIST_SUCCESS,
        data,
        isInitial,
        listType
    };
}

export function memoListFailure() {
    return {
        type: MEMO_LIST_FAILURE
    };
}