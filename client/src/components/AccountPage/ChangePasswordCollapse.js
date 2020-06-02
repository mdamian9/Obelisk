import React, { Component } from 'react';
import { Row, Col, Card, CardBody, Collapse, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AuthService from '../AuthService/AuthService';
import axios from 'axios';
import './AccountPage.css';

class ChangePasswordCollapse extends Component {

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
        const update = {currentPassword: this.state.currentPassword, newPassword: this.state.newPassword};
        axios.patch(`/user/changePassword/${this.Auth.getProfile().id}`, update).then(res => {
            alert(res.data.message);
            this.toggleCollapse();
            window.location.reload();
        }).catch(err => {
            console.log(err);
            alert('The password you entered was incorrect!');
            event.target.reset();
            this.toggleCollapse();
        });
    };

    render = () => {
        let editButton = <div><FontAwesomeIcon icon='edit' /> Change Password</div>
        if (this.state.isOpen === true) {
            editButton = <div style={{ padding: '0px 10px 0px 10px' }}><FontAwesomeIcon icon='angle-double-up' /></div>
        };
        return (
            <div>
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
                                    <Label for='currentPassword'>Current password:</Label>
                                    <Input type='password' id='currentPassword' name='currentPassword' onChange={this.handleChange}
                                        placeholder='Enter your current password' required />
                                </FormGroup>
                                <FormGroup>
                                    <Label for='newPassword'>New Password:</Label>
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