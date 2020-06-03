import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserNavbar from '../UserNavbar/UserNavbar';
import Footer from '../Footer/Footer';
import ChangeEmailCollapse from './ChangeEmailCollapse';
import ChangeUsernameCollapse from './ChangeUsernameCollapse';
import ChangePasswordCollapse from './ChangePasswordCollapse';
import ResetAccountCollapse from './ResetAccountCollapse';
import DeleteAccountModal from './DeleteAccountModal';
import withAuth from '../withAuth/withAuth';
import './AccountPage.css';

class AccountPage extends Component {

    constructor(props) {
        super(props);
    };

    render = () => {
        return (
            <div>
                <div className='content'>
                    <UserNavbar history={this.props.history} />
                    <br />
                    <Container style={{ marginTop: '1vh', marginBottom: '1vh' }}>
                        <Row>
                            <Col xs={8} className='section-solid-white text-white mx-auto'>
                                <h3 className='text-center'>
                                    Account Settings
                                </h3>
                                <hr className='ln-white' />
                                <div style={{ padding: '50px' }}>
                                    <ChangeEmailCollapse currentEmail={this.props.user.email} />
                                    <br />
                                    <ChangeUsernameCollapse currentUsername={this.props.user.username} />
                                    <br />
                                    <ChangePasswordCollapse />
                                    <br />
                                    <ResetAccountCollapse />
                                    <br />
                                    <Row className='align-items-center'>
                                        <Col>
                                            <h5><FontAwesomeIcon icon='user-slash' /> Delete Account:</h5>
                                        </Col>
                                        <Col className='d-flex justify-content-end align-items-center'>
                                            <DeleteAccountModal />
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                        <br />
                    </Container>
                </div>
                <Footer />
            </div>
        );
    };

};

export default withAuth(AccountPage);