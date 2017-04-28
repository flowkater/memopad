import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Write, MemoList } from '../components';
import { memoPostRequest, memoListRequest } from '../actions/memo';
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
        return (
            <div className="wrapper">
                { this.props.isLoggedIn ? <Write onPost={this.handlePost} /> : undefined }
                <MemoList data={this.props.memoData} currentUser={this.props.currentUser} />
            </div>
        );
    }

    componentDidMount() {
        this.props.memoListRequest(true).then(
            () => {
                console.log(this.props.memoData);
            }
        );
    }
    
}

const mapStateToProps = (state, ownProps) => {
    return {
        isLoggedIn: state.authentication.status.isLoggedIn,
        postStatus: state.memo.post,
        currentUser: state.authentication.status.currentUser,
        memoData: state.memo.list.data
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        memoPostRequest: (contents) => {
            return dispatch(memoPostRequest(contents));
        },
        memoListRequest: (isInitial, listType, id, username) => {
            return dispatch(memoListRequest(isInitial, listType, id, username));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);