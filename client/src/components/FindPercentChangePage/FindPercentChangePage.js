import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import AuthService from '../AuthService/AuthService';
import withAuth from '../withAuth/withAuth';
import UserNavbar from '../UserNavbar/UserNavbar';
import './FindPercentChangePage.css';

const Auth = new AuthService();

class FindPercentChangePage extends Component {

    handleLogout = () => {
        Auth.logout();
        this.props.history.replace('/');
    };

    render = () => {
        return (
            <div>
                <UserNavbar handleLogout={this.handleLogout} />
            </div>
        );
    };

};

export default withAuth(FindPercentChangePage);
