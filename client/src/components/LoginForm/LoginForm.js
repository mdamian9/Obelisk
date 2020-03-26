import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import AuthService from '../AuthService/AuthService';

class LoginForm extends Component {

    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.Auth = new AuthService();
    };

    // Do not stay on log in page if already logged in
    componentWillMount = () => {
        if (this.Auth.loggedIn()) {
            this.props.history.replace('/');
        };
    };


    handleChange = event => {
        // Extract name & value from event target and set to state
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        // Once the user is logged in, redirect them to their profile page
        this.Auth.login(this.state.username, this.state.password).then(res => {
            this.props.history.replace(`/profile/${res.data.user._id}`);
        }).catch(err => {
            console.log(err.response);
            alert(err.response.data.message);
        });
        // Clear form fields
        event.target.reset();
        // Reset state
        this.setState({
            username: '',
            password: ''
        });
    };

    render = () => {
        return (
            <Form onSubmit={this.handleFormSubmit}>
                <FormGroup>
                    <Label for='login-username'>Username:</Label>
                    <Input type='text' name='username' id='login-username'
                        placeholder='Enter your username' onChange={this.handleChange} required />
                </FormGroup>
                <FormGroup>
                    <Label for='login-password'>Password:</Label>
                    <Input type='password' name='password' id='login-password'
                        placeholder='Enter your password' onChange={this.handleChange} required />
                </FormGroup>
                <Button color='primary'>Log in</Button>
            </Form>
        );
    };

};

export default LoginForm;
