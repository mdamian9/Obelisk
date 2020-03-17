import React from 'react';
import './LandingPage.css';
import { Container, Row, Col } from 'reactstrap';
import '../LandingNavbar/LandingNavbar';
import LandingNavbar from '../LandingNavbar/LandingNavbar';

const LandingPage = () => {
    return (
        <Container>
            <LandingNavbar />
            <Row>
                <Col className='text-center'>
                    This is the LandingPage
                </Col>
            </Row>
        </Container>
    );
};

export default LandingPage;
