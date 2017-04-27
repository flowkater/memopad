import React, { Component } from 'react';
import { Authentication } from '../components';
import { connect } from 'react-redux';
import { loginRequest } from '../actions/authentication';
import Auth from '../modules/Auth';
import { $, Materialize } from '../modules/Window'

class Login extends Component {
    constructor(props){
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin(email, pw){
        return this.props.loginRequest(email, pw).then(() => {
            if (this.props.login_status === "SUCCESS") {
                Auth.authenticateUser(this.props.status.token);

                Materialize.toast('Welcome, ' + email + '!', 2000);
                this.props.history.push('/');
                return true;
            } else {
                let $toastContent = $('<span style="color: #FFB4BA">Incorrect email or password</span>');
                Materialize.toast($toastContent, 2000);
                return false;
            }
        });
    }

    render() {
        return (
            <div>
                <Authentication mode={true}
                    onLogin={this.handleLogin} />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        login_status: state.authentication.login.status,
        status: state.authentication.status
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        loginRequest: (email, pw) => {
            return dispatch(loginRequest(email, pw));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);