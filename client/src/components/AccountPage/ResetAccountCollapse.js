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

    handleFormSubmit = event => {
        event.preventDefault();
        event.persist();
        axios.patch(`/user/resetAccount/${this.Auth.getProfile().id}`, { password: this.state.password }).then(res => {
            alert(res.data.message);
            event.target.reset();
            this.setState({ password: '' });
            this.toggleCollapse();
        }).catch(err => {
            console.log(err);
            alert('The password you entered was incorrect!');
            event.target.reset();
            this.setState({ password: '' });
            this.toggleCollapse();
        });
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
                            <p>
                                Are you sure you want to reset your account? This will reset all balances in both your main wallet and
                                trading wallet to 0, and will delete all of your entry trades and exit trades.
                            </p>
                            <Form onSubmit={this.handleFormSubmit}>
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

export default ResetAccountCollapse;
