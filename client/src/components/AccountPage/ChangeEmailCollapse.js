import React, { Component } from 'react';
import { Row, Col, Card, CardBody, Collapse, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AlertModal from './AlertModal';
import AuthService from '../AuthService/AuthService';
import axios from 'axios';
import './AccountPage.css';

class ChangeEmailCollapse extends Component {

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
        this.setState({ [name]: value });
    };

    resolve = event => {
        event.target.reset();
        this.setState({ currentUsername: '', newUsername: '', password: '' });
        this.toggleCollapse();
        this.toggleAlertModal();
    };

    handleFormSubmit = event => {
        event.preventDefault();
        event.persist();
        const body = { newEmail: this.state.newEmail, password: this.state.password };
        if (this.state.currentEmail === this.props.currentEmail) {
            axios.patch(`/user/changeEmail/${this.Auth.getProfile().id}`, body).then(res => {
                this.setState({ alertMsg: res.data.message, error: false });
                this.resolve(event);
            }).catch(err => {
                this.setState({ alertMsg: err.response.data.message, error: true });
                this.resolve(event);
            });
        } else {
            this.setState({ alertMsg: 'The email you entered is incorrect!', error: true });
            this.resolve(event);
        };
    };

    render = () => {
        let editButton = <div><FontAwesomeIcon icon='edit' /> Edit</div>
        if (this.state.isOpen === true) {
            editButton = <div style={{ padding: '0px 10px 0px 10px' }}><FontAwesomeIcon icon='angle-double-up' /></div>
        };
        return (
            <div>
                <AlertModal isOpen={this.state.alertModalOpen} toggleAlertModal={this.toggleAlertModal}
                    message={this.state.alertMsg} error={this.state.error} />
                <Row>
                    <Col>
                        <h5><FontAwesomeIcon icon='at' /> Email:</h5>
                    </Col>
                    <Col className='d-flex justify-content-end align-items-center'>
                        <h5 style={{ marginBottom: '0px' }}>{this.props.currentEmail}</h5>&ensp;
                        <Button className='account-btn' onClick={this.toggleCollapse}>{editButton}</Button>
                    </Col>
                </Row >
                <Collapse isOpen={this.state.isOpen} style={{ marginTop: 5, color: 'black' }}>
                    <Card>
                        <CardBody>
                            <Form onSubmit={this.handleFormSubmit}>
                                <FormGroup>
                                    <Label for='currentEmail'>Current email:</Label>
                                    <Input type='email' id='currentEmail' name='currentEmail' onChange={this.handleChange}
                                        placeholder='Enter your current email' required />
                                </FormGroup>
                                <FormGroup>
                                    <Label for='newEmail'>New email:</Label>
                                    <Input type='email' id='newEmail' name='newEmail' onChange={this.handleChange}
                                        placeholder='Enter your new email' required />
                                </FormGroup>
                                <FormGroup>
                                    <Label for='password'>Password:</Label>
                                    <Input type='password' id='password' name='password' onChange={this.handleChange}
                                        placeholder='Enter your password' required />
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

export default ChangeEmailCollapse;
