import React, { Component } from 'react';
import { Row, Col, Card, CardBody, Collapse, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AuthService from '../AuthService/AuthService';
import axios from 'axios';
import './AccountPage.css';

class DeleteAccountCollapse extends Component {

    constructor(props) {
        super(props);
        this.Auth = new AuthService();
        this.state = {
            isOpen: false
        };
    };

    toggleCollapse = () => {
        this.setState(prevState => ({ isOpen: !prevState.isOpen }));
    };

    handleChange = event => {
        // Extract name & value from event target and set to state
        const { name, value } = event.target;
        this.setState({ [name]: value })
    };

    handleFormSubmit = event => {
        event.preventDefault();
        if (this.state.username === this.props.username) {
            axios.delete(`/user/${this.Auth.getProfile().id}/${this.state.password}`).then(res => {
                alert(res.data.message);
                this.Auth.logout();
                this.props.history.replace('/');
            }).catch(err => {
                console.log(err);
            });
        } else {
            alert('The current username you entered is incorrect!');
            event.target.reset();
            this.setState({ username: '', password: '' });
            this.toggleCollapse();
        };
    };

    render = () => {
        let editButton = <div><FontAwesomeIcon icon='edit' /> Delete Account</div>
        if (this.state.isOpen === true) {
            editButton = <div style={{ padding: '0px 10px 0px 10px' }}><FontAwesomeIcon icon='angle-double-up' /></div>
        };
        return (
            <div>
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
                                Are you sure you want to reset your account? This will delete your entire account, there is no
                                going back.
                            </b>
                            <Form style={{ marginTop: '1vh' }} onSubmit={this.handleFormSubmit}>
                                <FormGroup>
                                    <Label for='username'>Enter your username:</Label>
                                    <Input type='text' id='username' name='username' onChange={this.handleChange} required />
                                </FormGroup>
                                <FormGroup>
                                    <Label for='password'>Enter your password:</Label>
                                    <Input type='password' id='password' name='password' onChange={this.handleChange} required />
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
