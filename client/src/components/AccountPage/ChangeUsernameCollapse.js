import React, { Component } from 'react';
import { Row, Col, Card, CardBody, Collapse, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AuthService from '../AuthService/AuthService';
import axios from 'axios';
import './AccountPage.css';

class ChangeUsernameCollapse extends Component {

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
        event.persist();
        if (this.state.currentUsername === this.props.currentUsername) {
            const body = { newUsername: this.state.newUsername, password: this.state.password };
            axios.patch(`/user/changeUsername/${this.Auth.getProfile().id}`, body).then(res => {
                alert(res.data.message);
                window.location.reload();
            }).catch(err => {
                console.log(err);
                alert('The password you entered is incorrect!');
                event.target.reset();
                this.setState({ currentUsername: '', newUsername: '', password: '' });
                this.toggleCollapse();
            });
        } else {
            alert('The current username you entered is incorrect!');
            event.target.reset();
            this.setState({ currentUsername: '', newUsername: '', password: '' });
            this.toggleCollapse();
        };
    };

    render = () => {
        let editButton = <div><FontAwesomeIcon icon='edit' /> Edit</div>
        if (this.state.isOpen === true) {
            editButton = <div style={{ padding: '0px 10px 0px 10px' }}><FontAwesomeIcon icon='angle-double-up' /></div>
        };
        return (
            <div>
                <Row>
                    <Col>
                        <h5><FontAwesomeIcon icon='user' /> Username:</h5>
                    </Col>
                    <Col className='d-flex justify-content-end align-items-center'>
                        <h5 style={{ marginBottom: '0px' }}>{this.props.currentUsername}</h5>&ensp;
                        <Button className='account-btn' onClick={this.toggleCollapse}>{editButton}</Button>
                    </Col>
                </Row >
                <Collapse isOpen={this.state.isOpen} style={{ marginTop: 5, color: 'black' }}>
                    <Card>
                        <CardBody>
                            <Form onSubmit={this.handleFormSubmit}>
                                <FormGroup>
                                    <Label for='currentUsername'>Current username:</Label>
                                    <Input type='text' id='currentUsername' name='currentUsername' onChange={this.handleChange}
                                        placeholder='Enter your current username' required />
                                </FormGroup>
                                <FormGroup>
                                    <Label for='newUsername'>New username:</Label>
                                    <Input type='text' id='newUsername' name='newUsername' onChange={this.handleChange}
                                        placeholder='Enter your new username' required />
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

export default ChangeUsernameCollapse;
