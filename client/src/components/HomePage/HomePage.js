import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserNavbar from '../UserNavbar/UserNavbar';
import withAuth from '../withAuth/withAuth';

const HomePage = props => {
    return (
        <div>
            <UserNavbar history={props.history} />
            <br />
            <div>
                <Container fluid='lg' className='text-white' >
                    <Row>
                        <Col className='section-solid-white text-center' xs={6} style={{ marginLeft: '20px' }}>
                            <Row>
                                <Col>
                                    <h2>
                                        Welcome {props.user.username}!
                                    </h2>
                                </Col>
                            </Row>
                            <hr className='ln-white' />
                            <Row>
                                <Col className='d-flex justify-content-center'>
                                    <Button color='info' href='/wallet'>
                                        <FontAwesomeIcon icon='wallet' /> Wallet
                                    </Button>
                                    &ensp;
                                    <Button color='primary' href='/new-entry-trade'>
                                        <FontAwesomeIcon icon='file-import' /> New Entry Trade
                                    </Button>
                                </Col>
                            </Row>
                            <br />
                            <Row>
                                <Col className='d-flex justify-content-center'>
                                    <Button color='success' href='/entry-trades'>
                                        <FontAwesomeIcon icon='file-import' /> Entry Trade Log
                                    </Button>
                                    &ensp;
                                    <Button color='danger' href='/exit-trades'>
                                        <FontAwesomeIcon icon='file-export' /> Exit Trade Log
                                    </Button>
                                </Col>
                            </Row>
                            <hr className='ln-white' />
                            <Row>
                                <Col className='d-flex justify-content-center'>
                                    <Button color='light' href='/find-percent-change'>
                                        <FontAwesomeIcon icon='chart-line' /> Find % Change
                                    </Button>
                                    &ensp;
                                    <Button color='dark' href='/get-target-price'>
                                        <FontAwesomeIcon icon='search-dollar' /> Get Target Price
                                    </Button>
                                    &ensp;
                                    <Button color='warning' href='calculate-roi'>
                                        <FontAwesomeIcon icon='hand-holding-usd' /> Calculate ROI
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                        <Col className='section-solid-white text-center' xs={5} style={{ marginLeft: '40px' }}>
                            <h2>
                                Section 2
                            </h2>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default withAuth(HomePage);
