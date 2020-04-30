import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import UserNavbar from '../UserNavbar/UserNavbar';
import withAuth from '../withAuth/withAuth';

class HomePage extends Component {

    render = () => {
        console.log(this.props.user);
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
                                        <Button color='primary' href='/new-entry-trade'>New Entry Trade</Button>
                                    </Col>
                                </Row>
                                <br />
                                <Row>
                                    <Col className='d-flex justify-content-center'>
                                        <Button color='success' href='/entry-trades'>Entry Trade Log</Button>
                                        &ensp;
                                        <Button color='danger' href='/exit-trades'>Exit Trade Log</Button>
                                    </Col>
                                </Row>
                                <hr className='ln-white' />
                                <Row>
                                    <Col className='d-flex justify-content-center'>
                                        <Button color='light' href='/find-percent-change'>Find % Change</Button>
                                        &ensp;
                                        <Button color='dark' href='/get-target-price'>Get Target Price</Button>
                                        &ensp;
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
