import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { App } from './containers';
import './style.css';

const rootElement = document.getElementById('root');

ReactDOM.render(
  <Router>
    <Route path="/" component={ App } />
  </Router>,
  rootElement
);
