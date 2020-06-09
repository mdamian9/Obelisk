import React, { Component } from 'react';
import { Row, Col, Card, CardBody, Collapse, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AlertModal from './AlertModal';
import AuthService from '../AuthService/AuthService';
import axios from 'axios';
import './AccountPage.css';

class DeleteAccountCollapse extends Component {

    constructor(props) {
        super(props);
        this.Auth = new AuthService();
        this.state = {
            isOpen: false,
            alertModalOpen: false,
            alertMsg: null,
            error: null
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
        this.setState({ email: '', username: '', password: '' });
        this.toggleCollapse();
        this.toggleAlertModal();
    };

    handleFormSubmit = event => {
        event.preventDefault();
        event.persist();
        if (this.state.email !== this.props.email) {
            this.setState({ error: 'email' });
            if (this.state.username !== this.props.username) {
                this.setState({ error: 'email and username info' });
            };
            this.resolve(event);
        } else if (this.state.username !== this.props.username) {
            this.setState({ error: 'username' });
            this.resolve(event);
        } else {
            axios.delete(`/user/${this.Auth.getProfile().id}/${this.state.password}`).then(res => {
                alert(res.data.message);
                this.Auth.logout();
                this.props.history.replace('/');
            }).catch(err => {
                console.log(err);
                this.setState({ error: 'password' });
                this.resolve(event);
            });
        };
    };

    render = () => {
        let editButton = <div><FontAwesomeIcon icon='edit' /> Delete Account</div>
        if (this.state.isOpen === true) {
            editButton = <div style={{ padding: '0px 10px 0px 10px' }}><FontAwesomeIcon icon='angle-double-up' /></div>
        };
        return (
            <div>
                <AlertModal isOpen={this.state.alertModalOpen} toggleAlertModal={this.toggleAlertModal}
                    message={this.state.alertMsg} error={this.state.error} />
                <Row>
                    <Col>
                        <h5><FontAwesomeIcon icon='user-slash' /> Delete Account:</h5>
                    </Col>
                    <Col className='d-flex justify-content-end align-items-center'>
                        <Button className='account-btn' onClick={this.toggleCollapse}>{editButton}</Button>
                    </Col>
                </Row >
                <Collapse isOpen={this.state.isOpen} style={{ marginTop: 5, color: 'black' }}>
                    <Card>
                        <CardBody>
                            <b className='text-danger'>
                                Are you sure you want to delete your account? This will delete your entire account, there is no
                                going back.
                            </b>
                            <hr />
                            <Form onSubmit={this.handleFormSubmit}>
                                <FormGroup>
                                    <Label for='email'>Email:</Label>
                                    <Input type='email' id='email' name='email' onChange={this.handleChange}
                                        placeholder='Enter your email' required />
                                </FormGroup>
                                <FormGroup>
                                    <Label for='username'>Username</Label>
                                    <Input type='text' id='username' name='username' onChange={this.handleChange}
                                        placeholder='Enter your username' required />
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

export default DeleteAccountCollapse;
