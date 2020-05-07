import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import UserNavbar from '../UserNavbar/UserNavbar';
import withAuth from "../withAuth/withAuth";

const TutorialPage = props => {
    return (
        <div>
            <UserNavbar history={props.history} />
            <br />
            <div>
                <Container fluid='lg' className='text-white' >
                    <Row className='text-center'>
                        <Col>
                            <h2>
                                Tutorial
                            </h2>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default withAuth(TutorialPage);
