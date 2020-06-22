import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import LandingNavbar from '../LandingNavbar/LandingNavbar';
import SignupModal from '../SignupModal/SignupModal';
import Logo from '../Logo/Logo';
import Footer from '../Footer/Footer';
import AuthService from '../AuthService/AuthService';
import './LandingPage.css';

class LandingPage extends Component {

    constructor() {
        super();
        this.Auth = new AuthService();
    };

    // Do not stay on landing page if already logged in
    componentDidMount = () => {
        if (this.Auth.loggedIn()) {
            this.props.history.replace('/home');
        };
    };

    render = () => {
        return (
            <div>
                <LandingNavbar history={this.props.history} />
                <div className='landing-content'>
                    <Container>
                        <Row>
                            <Col className='text-center'>
                                <div className='d-flex align-items-center justify-content-center' style={{ color: 'black' }}>
                                    <Logo className='logo' /><h3>Obelisk.Trade</h3>
                                </div>
                                <hr className='ln-white' />
                                <div style={{ color: 'white' }}>
                                    <h3 id='lnd-middle-text'>
                                        Welcome to obelisk.trade, where you can practice trading highly volatile cryptocurrencies without
                                        risking real capital.
                                    </h3>
                                    <hr className='ln-white' />
                                    <h5 id='lnd-bottom-text'>
                                        Log in above or create an account below!
                                    </h5>
                                </div>
                                <SignupModal history={this.props.history} />
                            </Col>
                        </Row>
                    </Container>
                    <div style={footerStyle}><Footer /></div>
                </div>
            </div>
        );
    };

};

const footerStyle = {
    position: 'fixed',
    left: 0,
    bottom: 0,
    width: '100%',
}

export default LandingPage;
