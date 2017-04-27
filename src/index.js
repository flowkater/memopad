import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { App } from './containers';
import './style.css';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';

const store = createStore(reducers, applyMiddleware(thunk));

const rootElement = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path="/" component={ App } />
    </Router>
  </Provider>,
  rootElement
);
