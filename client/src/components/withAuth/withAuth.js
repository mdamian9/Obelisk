import React, { Component } from 'react';
import AuthService from '../AuthService/AuthService';

const withAuth = (AuthComponent) => {

    const Auth = new AuthService();

    return class AuthWrapped extends Component {

        constructor() {
            super();
            this.state = {
                user: null
            };
        };

        /* Check for localStorage token to see if logged in. Decode token so that we 
        may set it to our state. If we failed to decode it so we will redirect to login page */
        componentWillMount = () => {
            if (!Auth.loggedIn()) {
                this.props.history.replace('/login');
            } else {
                try {
                    const profile = Auth.getProfile();
                    this.setState({
                        user: profile
                    });
                } catch (err) {
                    Auth.logout();
                    this.props.history.replace('/login');
                };
            };
        };

        // Check if user exists and pass user to the AuthComponent
        render = () => {
            if (this.state.user) {
                return (
                    <AuthComponent history={this.props.history} user={this.state.user} />
                );
            } else {
                return null;
            };
        };

    };

};

export default withAuth;
