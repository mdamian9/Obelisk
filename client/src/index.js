import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';
// import axios from 'axios';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import SignupPage from './components/SignupPage/SignupPage';
import LoginPage from './components/LoginPage/LoginPage';
import HomePage from './components/HomePage/HomePage';
import FindPercentChangePage from './components/FindPercentChangePage/FindPercentChangePage';
import GetTargetPricePage from './components/GetTargetPricePage/GetTargetPricePage';

// if (localStorage.getItem('id_token')) {
//     axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('id_token')}`;
// };

ReactDOM.render(
    <Router>
        <Route exact path='/' component={App} />
        <Route exact path='/signup' component={SignupPage} />
        <Route exact path='/login' component={LoginPage} />
        <Route exact path='/home' component={HomePage} />
        <Route exact path='/find-percent-change' component={FindPercentChangePage} />
        <Route exact path='/get-target-price' component={GetTargetPricePage} />
    </Router>
    , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
