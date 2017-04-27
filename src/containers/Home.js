import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Write, MemoList } from '../components';
import { memoPostRequest } from '../actions/memo';
import { $, Materialize } from '../modules/Window'

class Home extends Component {

    constructor(props) {
        super(props);
        this.handlePost = this.handlePost.bind(this);
    }

    handlePost(contents){
        return this.props.memoPostRequest(contents).then(
            () => {
                if(this.props.postStatus.status === "SUCCESS") {
                    // TRIGGER LOAD NEW MEMO
                    Materialize.toast('Success!', 2000);
                } else {
                    let $toastContent;

                    switch(this.props.postStatus.error) {
                        case 401:
                            $toastContent = $('<span style="color: #FFB4BA">You are not logged in</span>');
                            Materialize.toast($toastContent, 2000);
                            setTimeout(()=> {location.reload(false);}, 2000);
                            break;
                        case 2:
                            $toastContent = $('<span style="color: #FFB4BA">Please write something</span>');
                            Materialize.toast($toastContent, 2000);
                            break;
                        default:
                            $toastContent = $('<span style="color: #FFB4BA">Something Broke</span>');
                            Materialize.toast($toastContent, 2000);
                            break;
                    }
                }
            }
        );
    }

    render() {
        var mockData = [
            {
                "_id": "578b958ec1da760909c263f4",
                "writer": "flowkater",
                "contents": "Testing",
                "__v": 0,
                "is_edited": false,
                "date": {
                    "edited": "2016-07-17T14:26:22.428Z",
                    "created": "2016-07-17T14:26:22.428Z"
                },
                "starred": []
            },
            {
                "_id": "578b957ec1da760909c263f3",
                "writer": "flowkater",
                "contents": "Data",
                "__v": 0,
                "is_edited": false,
                "date": {
                    "edited": "2016-07-17T14:26:06.999Z",
                    "created": "2016-07-17T14:26:06.999Z"
                },
                "starred": []
            },
            {
                "_id": "578b957cc1da760909c263f2",
                "writer": "flowkater",
                "contents": "Mock",
                "__v": 0,
                "is_edited": false,
                "date": {
                    "edited": "2016-07-17T14:26:04.195Z",
                    "created": "2016-07-17T14:26:04.195Z"
                },
                "starred": []
            },
            {
                "_id": "578b9579c1da760909c263f1",
                "writer": "flowkater",
                "contents": "Some",
                "__v": 0,
                "is_edited": false,
                "date": {
                    "edited": "2016-07-17T14:26:01.062Z",
                    "created": "2016-07-17T14:26:01.062Z"
                },
                "starred": []
            },
            {
                "_id": "578b9576c1da760909c263f0",
                "writer": "flowkater",
                "contents": "Create",
                "__v": 0,
                "is_edited": false,
                "date": {
                    "edited": "2016-07-17T14:25:58.619Z",
                    "created": "2016-07-17T14:25:58.619Z"
                },
                "starred": []
            },
            {
                "_id": "578b8c82c1da760909c263ef",
                "writer": "flowkater",
                "contents": "blablablal",
                "__v": 0,
                "is_edited": false,
                "date": {
                    "edited": "2016-07-17T13:47:46.611Z",
                    "created": "2016-07-17T13:47:46.611Z"
                },
                "starred": []
            }
        ];

        return (
            <div className="wrapper">
                { this.props.isLoggedIn ? <Write onPost={this.handlePost} /> : undefined }
                <MemoList data={mockData} currentUser="flowkater" />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isLoggedIn: state.authentication.status.isLoggedIn,
        postStatus: state.memo.post
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        memoPostRequest: (contents) => {
            return dispatch(memoPostRequest(contents));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);