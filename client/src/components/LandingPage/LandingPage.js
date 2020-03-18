import React from 'react';
import './LandingPage.css';
import { Container, Row, Col } from 'reactstrap';
import LandingNavbar from '../LandingNavbar/LandingNavbar';

const LandingPage = () => {
    return (
        <div>
            <LandingNavbar />
            <div id='remaining-div'>
                <Container>
                    <Row>
                        <Col id='welcome'>
                            <h3>
                                Welcome to obelisk.trade, where you can practice trading highly volatile cryptocurrencies without
                                risking real capital.
                            </h3>
                            <br />
                            <h5>
                                Log in above or create an account below!
                            </h5>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default LandingPage;
