import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import AuthService from '../AuthService/AuthService';
import withAuth from '../withAuth/withAuth';
const Auth = new AuthService();

class HomePage extends Component {

    handleLogout = () => {
        Auth.logout();
        this.props.history.replace('/');
    };

    render = () => {
        console.log(this.props);
        return (
            <div>
                <div>
                    <h2>Welcome {this.props.user.username}</h2>
                </div>
                <p>
                    <button type="button" className="form-submit" onClick={this.handleLogout.bind(this)}>Logout</button>
                </p>
            </div>
        );
    };

};

export default withAuth(HomePage);
