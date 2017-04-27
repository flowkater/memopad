import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Authentication extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this); 
    }

    handleChange(e){
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleLogin() {
        let email = this.state.email;
        let pw = this.state.password;

        this.props.onLogin(email, pw).then(
            (success) => {
                if(!success) {
                    this.setState({
                        password: ''
                    });
                }
            }
        );
    }

    handleRegister() {
        let email = this.state.email;
        let pw = this.state.password;

        this.props.onRegister(email, pw).then(
            (result) => {
                if(!result) {
                    this.setState({
                        email: '',
                        password: ''
                    });
                }
            }
        );
    }

    handleKeyPress(e) {
        if(e.charCode === 13) {
            if(this.props.mode) {
                this.handleLogin();
            }else {
                this.handleRegister();
            }
        }
    }

    render() {
        const inputBoxes = (
            <div>
                <div className="input-field col s12 email">
                    <label>Email</label>
                    <input
                    name="email"
                    type="text"
                    className="validate"
                    onChange={this.handleChange}
                    value={this.state.email}
                    onKeyPress={this.handleKeyPress} />
                </div>
                <div className="input-field col s12">
                    <label>Password</label>
                    <input
                    name="password"
                    type="password"
                    className="validate"
                    onChange={this.handleChange}
                    value={this.state.password}
                    onKeyPress={this.handleKeyPress} />
                </div>
            </div>
        );
        
        const loginView = (
            <div>
                <div className="card-content">
                    <div className="row">
                        {inputBoxes}
                        <a className="waves-effect waves-light btn"
                            onClick={this.handleLogin}>SUBMIT</a>
                    </div>
                </div>


                <div className="footer">
                    <div className="card-content">
                        <div className="right" >
                        New Here? <Link to="/register">Create an account</Link>
                        </div>
                    </div>
                </div>

            </div>
        );

        const registerView = (
            <div className="card-content">
                <div className="row">
                    {inputBoxes}
                    <a className="waves-effect waves-light btn"
                        onClick={this.handleRegister}>CREATE</a>
                </div>
            </div>
        );

        return (
            <div className="container auth">
                <Link className="logo" to="/"></Link>
                <div className="card">
                    <div className="header blue white-text center">
                        <div className="card-content">{ this.props.mode ? "LOGIN" : "REGISTER"}</div>
                    </div>
                    { this.props.mode ? loginView : registerView }
                </div>
            </div>
        );
    }
}

Authentication.propTypes = {
    mode: PropTypes.bool,
    onLogin: PropTypes.func,
    onRegister: PropTypes.func
};

Authentication.defaultProps = {
    mode: true,
    onLogin: (id, pw) => { console.error("login function not defined") },
    onRegister: (id, pw) => { console.error("register function not defined") }
};

export default Authentication;