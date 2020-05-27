import React, { Component } from 'react';
import axios from 'axios';
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
        componentDidMount = () => {
            if (!Auth.loggedIn()) {
                this.props.history.replace('/login');
            } else {
                try {
                    const profile = Auth.getProfile();
                    // Get complete user data, and set entryTrades to profile
                    axios.get(`/user/${profile.id}`).then(res => {
                        profile.email = res.data.email;
                        profile.mainWallet = res.data.mainWallet;
                        profile.tradingWallet = res.data.tradingWallet;
                        profile.entryTrades = res.data.entryTrades;
                        this.setState({
                            user: profile
                        });
                    }).catch(err => {
                        console.log(err);
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
