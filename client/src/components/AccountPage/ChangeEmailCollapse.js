import React, { Component } from 'react';
import { Row, Col, Card, CardBody, Collapse, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AuthService from '../AuthService/AuthService';
import axios from 'axios';
import './AccountPage.css';

class ChangeEmailCollapse extends Component {

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
        const update = { newEmail: this.state.newEmail };
        if (this.state.currentEmail === this.props.currentEmail) {
            axios.patch(`/user/changeEmail/${this.Auth.getProfile().id}`, update).then(() => {
                this.toggleCollapse();
                window.location.reload();
            }).catch(err => {
                console.log(err);
            });
        } else {
            alert('Incorrect current email');
            event.target.reset();
            this.setState({ currentEmail: '', newEmail: '' });
            this.toggleCollapse();
        };
    };

    render = () => {
        let editButton = <div><FontAwesomeIcon icon='edit' /> Edit</div>
        if (this.state.isOpen === true) {
            editButton = <div style={{padding: '0px 10px 0px 10px'}}><FontAwesomeIcon icon='angle-double-up' /></div>
        };
        return (
            <div>
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
                                    <Label for='currentEmail'>Current Email:</Label>
                                    <Input type='email' id='currentEmail' name='currentEmail' onChange={this.handleChange}
                                        placeholder='Enter your current email' required />
                                </FormGroup>
                                <FormGroup>
                                    <Label for='newEmail'>New Email:</Label>
                                    <Input type='email' id='newEmail' name='newEmail' onChange={this.handleChange}
                                        placeholder='Enter your new email' required />
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
