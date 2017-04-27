import React, { Component } from 'react';
import { Authentication } from '../components';
import { connect } from 'react-redux';
import { registerRequest } from '../actions/authentication';
import { $, Materialize } from '../modules/Window'

class Register extends Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
    }

    handleRegister(email, pw) {
        return this.props.registerRequest(email, pw).then(() => {
            if(this.props.status === "SUCCESS") {
                Materialize.toast('Success! Please log in.', 2000);
                this.props.history.push('/login');
                return true;
            } else {
                let errorMessage = [
                    'E-mail 형식을 확인하세요',
                    '비밀번호는 8자리 이상이어야 합니다.',
                    'E-mail이 이미 존재합니다.'
                ];

                let $toastContent = $('<span style="color: #FFB4BA">' + errorMessage[this.props.errorCode - 1] + '</span>');
                Materialize.toast($toastContent, 2000);
                return false;
            }
        });
    }

    render() {
        return (
            <div>
                <Authentication mode={false}
                    onRegister={this.handleRegister} />  
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        status: state.authentication.register.status,
        errorCode: state.authentication.register.error
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        registerRequest: (email, pw) => {
            return dispatch(registerRequest(email, pw));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);