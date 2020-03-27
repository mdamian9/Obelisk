import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

class LoginForm extends Component {

    handleChange = event => {
        // Extract name & value from event target and set to state
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        // Log in the user and redirect them to the user home page
        this.props.handleLogin(this.state.username, this.state.password);
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
