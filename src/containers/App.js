import React, { Component } from 'react';
import { Header } from '../components';
import { Route } from 'react-router-dom';
import { Home, Login, Register } from './index'
 
class App extends Component {
    render() {
        let re = /(login|register)/;
        let isAuth = re.test(this.props.location.pathname);

        return (
            <div>
                { isAuth? undefined : <Header /> }
                <Route exact path="/" component={ Home } />
                <Route path="/home" component={ Home } />
                <Route path="/login" component={ Login } />
                <Route path="/register" component={ Register } />
            </div>
        );
    }
}

export default App;