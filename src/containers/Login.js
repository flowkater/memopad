import React, { Component } from 'react';
import { Authentication } from '../components';
import { connect } from 'react-redux';
import { loginRequest } from '../actions/authentication';

class Login extends Component {
    constructor(props){
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin(id, pw){
        const $ = window.$;
        const Materialize = window.Materialize;

        return this.props.loginRequest(id, pw).then(() => {
            if (this.props.status === "SUCCESS") {
                let loginData = {
                    isLoggedIn: true,
                    username: id
                };

                Materialize.toast('Welcome, ' + id + '!', 2000);
                this.props.history.push('/');
                return true;
            } else {
                let $toastContent = $('<span style="color: #FFB4BA">Incorrect username or password</span>');
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
        status: state.authentication.login.status
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        loginRequest: (id, pw) => {
            return dispatch(loginRequest(id, pw));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);