import React, { Component } from 'react';
import { Row, Col, Card, CardBody, Collapse, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AuthService from '../AuthService/AuthService';
import axios from 'axios';
import './AccountPage.css';

class ResetAccountCollapse extends Component {

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

    resetAll = event => {
        event.target.reset();
        this.setState({ email: '', username: '', password: '' });
        this.toggleCollapse();
    };

    handleFormSubmit = event => {
        event.preventDefault();
        event.persist();
        if (this.state.username !== this.props.username) {
            alert('The username you entered is incorrect!');
            this.resetAll(event);
        } else {
            axios.patch(`/user/resetAccount/${this.Auth.getProfile().id}`, { password: this.state.password }).then(res => {
                alert(res.data.message);
                this.resetAll(event);
            }).catch(err => {
                console.log(err);
                alert('The password you entered is incorrect!');
                this.resetAll(event);
            });
        };
    };

    render = () => {
        let editButton = <div><FontAwesomeIcon icon='edit' /> Reset Account</div>
        if (this.state.isOpen === true) {
            editButton = <div style={{ padding: '0px 10px 0px 10px' }}><FontAwesomeIcon icon='angle-double-up' /></div>
        };
        return (
            <div>
                <Row>
                    <Col>
                        <h5><FontAwesomeIcon icon='redo' /> Reset Account:</h5>
                    </Col>
                    <Col className='d-flex justify-content-end align-items-center'>
                        <Button className='account-btn' onClick={this.toggleCollapse}>{editButton}</Button>
                    </Col>
                </Row >
                <Collapse isOpen={this.state.isOpen} style={{ marginTop: 5, color: 'black' }}>
                    <Card>
                        <CardBody>
                            <b className='text-danger'>
                                Are you sure you want to reset your account? This will reset all balances in both your main wallet and
                                trading wallet to 0, and will delete all of your entry trades and exit trades.
                            </b>
                            <hr />
                            <Form onSubmit={this.handleFormSubmit}>
                                <FormGroup>
                                    <Label for='username'>Username:</Label>
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

export default ResetAccountCollapse;