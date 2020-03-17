import React from 'react';
import './LandingPage.css';
import { Container, Row, Col } from 'reactstrap';
import LandingNavbar from '../LandingNavbar/LandingNavbar';

const LandingPage = () => {
    return (
        <div>
            <LandingNavbar />
            <Container>
                <Row>
                    <Col className='text-center'>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default LandingPage;
