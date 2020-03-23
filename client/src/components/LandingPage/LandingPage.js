import React from 'react';
import './LandingPage.css';
import { Container, Row, Col } from 'reactstrap';
import LandingNavbar from '../LandingNavbar/LandingNavbar';
import SignupModal from '../SignupModal/SignupModal';
import Logo from '../Logo/Logo';

const LandingPage = () => {
    return (
        <div>
            <LandingNavbar />
            <div id='remaining-div'>
                <Container>
                    <Row>
                        <Col className='text-center'>
                            <div className='d-flex align-items-center justify-content-center' style={{ color: 'black' }}>
                                <Logo width='100px' height='100px' /><h4>Obelisk.Trade</h4>
                            </div>
                            <hr />
                            <div style={{ color: 'white' }}>
                                <h3>
                                    Welcome to obelisk.trade, where you can practice trading highly volatile cryptocurrencies without
                                    risking real capital.
                                </h3>
                                <br />
                                <h5>
                                    Log in above or create an account below!
                                </h5>
                            </div>
                            <SignupModal />
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default LandingPage;
