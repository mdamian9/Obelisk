import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import UserNavbar from '../UserNavbar/UserNavbar';
import withAuth from '../withAuth/withAuth';

class HomePage extends Component {

    render = () => {
        return (
            <div>
                <UserNavbar history={this.props.history} />
                <br />
                <div>
                    <Container fluid='lg text-white' >
                        <Row>
                            <Col className='section-solid-white text-center' xs={6} style={{ marginLeft: '20px' }}>
                                <Row>
                                    <Col>
                                        <h2>
                                            Welcome {this.props.user.username}!
                                        </h2>
                                    </Col>
                                </Row>
                                <hr className='ln-white' />
                                <Row>
                                    <Col className='d-flex justify-content-center'>
                                        <Button color='info' href='/wallet'>Wallet</Button>
                                        &ensp;
                                        <Button color='success' href='/new-entry-trade'>New Entry Trade</Button>
                                        &ensp;
                                        <Button color='danger' href='/new-exit-trade'>New Exit Trade</Button>
                                    </Col>
                                </Row>
                                <br />
                                <Row>
                                    <Col className='d-flex justify-content-center'>
                                        <Button color='primary' href='/entry-trades'>View Entry Trades</Button>
                                        &ensp;
                                        <Button color='secondary'>View Exit Trades</Button>
                                    </Col>
                                </Row>
                                <hr className='ln-white' />
                                <Row>
                                    <Col>
                                        <Button color='light' href='/find-percent-change'>Find % Change</Button>
                                    </Col>
                                    <Col>
                                        <Button color='dark' href='/get-target-price'>Get Target Price</Button>
                                    </Col>
                                    <Col>
                                        <Button color='warning' href='calculate-roi'>Calculate ROI</Button>
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

};

export default withAuth(HomePage);
