import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import LandingNavbar from '../LandingNavbar/LandingNavbar';
import SignupModal from '../SignupModal/SignupModal';
import Logo from '../Logo/Logo';
import AuthService from '../AuthService/AuthService';

class LandingPage extends Component {

    constructor() {
        super();
        this.Auth = new AuthService();
        this.handleLogin = this.handleLogin.bind(this);
    };

    // Do not stay on landing page if already logged in
    componentWillMount = () => {
        if (this.Auth.loggedIn()) {
            this.props.history.replace('/home');
        };
    };

    // Log in the user and redirect them to the user home page
    handleLogin = (username, password) => {
        this.Auth.login(username, password).then(() => {
            this.props.history.replace('/home');
        }).catch(err => {
            console.log(err);
            alert(err.response.data.message);
        });
    };

    render = () => {
        return (
            <div>
                <LandingNavbar handleLogin={this.handleLogin} />
                <div className='full-r-div'>
                    <Container>
                        <Row>
                            <Col className='text-center'>
                                <div className='d-flex align-items-center justify-content-center' style={{ color: 'black' }}>
                                    <Logo width='100px' height='100px' /><h3>Obelisk.Trade</h3>
                                </div>
                                <hr className='ln-white' />
                                <div style={{ color: 'white' }}>
                                    <h3>
                                        Welcome to obelisk.trade, where you can practice trading highly volatile cryptocurrencies without
                                        risking real capital.
                                    </h3>
                                    <hr className='ln-white' />
                                    <h5>
                                        Log in above or create an account below!
                                    </h5>
                                </div>
                                <SignupModal history={this.props.history} />
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        );
    };

};

export default LandingPage;
