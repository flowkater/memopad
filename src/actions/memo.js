import {
    MEMO_POST,
    MEMO_POST_SUCCESS,
    MEMO_POST_FAILURE
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