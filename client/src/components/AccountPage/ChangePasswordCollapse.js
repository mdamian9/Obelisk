import React, { Component } from 'react';
import { Row, Col, Card, CardBody, Collapse, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import AuthService from '../AuthService/AuthService';
import AlertModal from '../AlertModal/AlertModal';
import './AccountPage.css';

class ChangePasswordCollapse extends Component {

    constructor(props) {
        super(props);
        this.Auth = new AuthService();
        this.state = {
            isOpen: false,
            alertModalOpen: false,
            alertMsg: null,
            error: false
        };
    };

    toggleCollapse = () => {
        this.setState(prevState => ({ isOpen: !prevState.isOpen }));
    };

    toggleAlertModal = () => {
        this.setState(prevState => ({ alertModalOpen: !prevState.alertModalOpen }));
    };

    handleChange = event => {
        // Extract name & value from event target and set to state
        const { name, value } = event.target;
        this.setState({ [name]: value })
    };

    resolve = event => {
        event.target.reset();
        this.setState({ username: '', currentPassword: '', newPassword: '' });
        this.toggleCollapse();
        this.toggleAlertModal();
    };

    handleFormSubmit = event => {
        event.preventDefault();
        event.persist();
        if (this.state.username === this.props.username) {
            const update = { currentPassword: this.state.currentPassword, newPassword: this.state.newPassword };
            axios.patch(`/user/changePassword/${this.Auth.getProfile().id}`, update).then(res => {
                this.setState({ alertMsg: res.data.message, error: false });
                this.resolve(event);
            }).catch(err => {
                this.setState({ alertMsg: err.response.data.message, error: true });
                this.resolve(event);
            });
        } else {
            this.setState({ alertMsg: 'The username you entered is incorrect!', error: true });
            this.resolve(event);
        };
    };

    render = () => {
        let editButton = <div><FontAwesomeIcon icon='edit' /> Change Password</div>
        if (this.state.isOpen === true) {
            editButton = <div style={{ padding: '0px 10px 0px 10px' }}><FontAwesomeIcon icon='angle-double-up' /></div>
        };
        return (
            <div>
                <AlertModal isOpen={this.state.alertModalOpen} toggleAlertModal={this.toggleAlertModal}
                    message={this.state.alertMsg} error={this.state.error} reload={true} />
                <Row>
                    <Col>
                        <h5><FontAwesomeIcon icon='key' /> Password:</h5>
                    </Col>
                    <Col className='d-flex justify-content-end align-items-center'>
                        <Button className='account-btn' onClick={this.toggleCollapse}>{editButton}</Button>
                    </Col>
                </Row >
                <Collapse isOpen={this.state.isOpen} style={{ marginTop: 5, color: 'black' }}>
                    <Card>
                        <CardBody>
                            <Form onSubmit={this.handleFormSubmit}>
                                <FormGroup>
                                    <Label for='username'>Username:</Label>
                                    <Input type='username' id='username' name='username' onChange={this.handleChange}
                                        placeholder='Enter your username' required />
                                </FormGroup>
                                <FormGroup>
                                    <Label for='currentPassword'>Current password:</Label>
                                    <Input type='password' id='currentPassword' name='currentPassword' onChange={this.handleChange}
                                        placeholder='Enter your current password' required />
                                </FormGroup>
                                <FormGroup>
                                    <Label for='newPassword'>New password:</Label>
                                    <Input type='password' id='newPassword' name='newPassword' onChange={this.handleChange}
                                        placeholder='Enter your new password' required />
                                </FormGroup>
                                <Button color='danger'>Confirm</Button>
                            </Form>
                        </CardBody>
                    </Card>
                </Collapse>
            </div>
        );
    };

};

export default ChangePasswordCollapse;
