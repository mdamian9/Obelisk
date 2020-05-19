import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import UserNavbar from '../UserNavbar/UserNavbar';
import Footer from '../Footer/Footer';
import withAuth from "../withAuth/withAuth";

const TutorialPage = props => {
    return (
        <div>
            <div className='content'>
                <UserNavbar history={props.history} />
                <br />
                <Container fluid='lg' className='text-white' >
                    <Row className='text-center'>
                        <Col>
                            <h2>
                                Tutorial
                            </h2>
                        </Col>
                    </Row>
                </Container>
                <br />
            </div>
            <Footer />
        </div>
    );
};

export default withAuth(TutorialPage);
