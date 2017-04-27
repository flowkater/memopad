import React, { Component } from 'react';
import { Header } from '../components';
import { Route } from 'react-router-dom';
import { Home, Login, Register } from './index'
import { connect } from 'react-redux';
import { getStatusRequest, logoutRequest } from '../actions/authentication';
import Auth from '../modules/Auth';
import { $, Materialize } from '../modules/Window'
 
class App extends Component {

    constructor(props){
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        this.props.logoutRequest().then(() => {
            Materialize.toast('Good Bye!', 2000);

            Auth.deauthenticateUser();
        });
    }

    componentDidMount() {
        if(!Auth.isUserAuthenticated()) return;

        this.props.getStatusRequest().then(() => {
            console.log(this.props.status);

            if(!this.props.status.valid) {
                Auth.deauthenticateUser();

                let $toastContent = $('<span style="color: #FFB4BA">Your session is expired, please log in again</span>');
                Materialize.toast($toastContent, 4000);
            }
        });
    }
    

    render() {
        let re = /(login|register)/;
        let isAuth = re.test(this.props.location.pathname);

        return (
            <div>
                { isAuth ? undefined : <Header isLoggedIn={this.props.status.isLoggedIn}
                                                onLogout={this.handleLogout} /> }
                <Route exact path="/" component={ Home } />
                <Route path="/home" component={ Home } />
                <Route path="/login" component={ Login } />
                <Route path="/register" component={ Register } />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        status: state.authentication.status
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getStatusRequest: () => {
            return dispatch(getStatusRequest());
        },
        logoutRequest: () => {
            return dispatch(logoutRequest());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);