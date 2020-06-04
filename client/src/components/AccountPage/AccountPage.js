import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import UserNavbar from '../UserNavbar/UserNavbar';
import Footer from '../Footer/Footer';
import ChangeEmailCollapse from './ChangeEmailCollapse';
import ChangeUsernameCollapse from './ChangeUsernameCollapse';
import ChangePasswordCollapse from './ChangePasswordCollapse';
import ResetAccountCollapse from './ResetAccountCollapse';
import DeleteAccountCollapse from './DeleteAccountCollapse';
import withAuth from '../withAuth/withAuth';
import './AccountPage.css';

const AccountPage = props => {
    return (
        <div>
            <div className='content'>
                <UserNavbar history={props.history} />
                <br />
                <Container style={{ marginTop: '1vh', marginBottom: '1vh' }}>
                    <Row>
                        <Col xs={8} className='section-solid-white text-white mx-auto'>
                            <h3 className='text-center'>
                                Account Settings
                                </h3>
                            <hr className='ln-white' />
                            <div style={{ padding: '50px' }}>
                                <ChangeEmailCollapse currentEmail={props.user.email} />
                                <br />
                                <ChangeUsernameCollapse currentUsername={props.user.username} />
                                <br />
                                <ChangePasswordCollapse username={props.user.username} />
                                <br />
                                <ResetAccountCollapse username={props.user.username} />
                                <br />
                                <DeleteAccountCollapse email={props.user.email} username={props.user.username} history={props.history} />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <br />
            <Footer />
        </div>
    );
};

export default withAuth(AccountPage);