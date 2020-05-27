import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserNavbar from '../UserNavbar/UserNavbar';
import Footer from '../Footer/Footer';
import ChangePasswordModal from './ChangePasswordModal';
import withAuth from '../withAuth/withAuth';
import './AccountPage.css';

class AccountPage extends Component {

    constructor(props) {
        super(props);
    };

    render = () => {
        console.log(this.props.user)
        return (
            <div>
                <div className='content'>
                    <UserNavbar history={this.props.history} />
                    <br />
                    <Container className='tool'>
                        <Row>
                            <Col xs={8} className='section-solid-white text-white mx-auto'>
                                <h3 className='text-center'>
                                    Account Settings
                                </h3>
                                <hr className='ln-white' />
                                <div style={{ padding: '50px' }}>
                                    <Row>
                                        <Col>
                                            <h5><FontAwesomeIcon icon='at' /> Email:</h5>
                                        </Col>
                                        <Col className='d-flex justify-content-end align-items-center'>
                                            <h5 style={{ marginBottom: '0px' }}>{this.props.user.email}</h5>&ensp;
                                            <Button className='account-btn'><FontAwesomeIcon icon='edit' /> Edit</Button>
                                        </Col>
                                    </Row>
                                    <br />
                                    <Row className='d-flex align-items-center'>
                                        <Col>
                                            <h5><FontAwesomeIcon icon='user' /> Username:</h5>
                                        </Col>
                                        <Col className='d-flex justify-content-end align-items-center'>
                                            <h5 style={{ marginBottom: '0px' }}>{this.props.user.username}</h5>&ensp;
                                            <Button className='account-btn'><FontAwesomeIcon icon='edit' /> Edit</Button>
                                        </Col>
                                    </Row>
                                    <br />
                                    <Row>
                                        <Col>
                                            <h5><FontAwesomeIcon icon='key' /> Password:</h5>
                                        </Col>
                                        <Col className='d-flex justify-content-end align-items-center'>
                                            <ChangePasswordModal />
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <Footer />
            </div>
        );
    };

};

export default withAuth(AccountPage);