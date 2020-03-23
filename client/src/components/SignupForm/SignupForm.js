import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

class SignupForm extends Component {

    handleChange = event => {
        // Extract name & value from event target and set to state
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        // Create user in the backend through /signup route
        // axios.post('/signup', this.state).then(res => {
        //     console.log(res.data.message);
        // });
        // Clear form fields
        console.log(this.state);
        event.target.reset();
        // Reset state
        this.setState({
            email: '',
            username: '',
            password: ''
        });
    };

    render = () => {
        return (
            <Form onSubmit={this.handleFormSubmit}>
                <FormGroup>
                    <Label for='signup-email'>Email:</Label>
                    <Input type='email' name='email' id='signup-email'
                        placeholder='Enter your email' onChange={this.handleChange} required />
                </FormGroup>
                <FormGroup>
                    <Label for='signup-username'>Username:</Label>
                    <Input type='text' name='username' id='signup-username'
                        placeholder='Enter your username' onChange={this.handleChange} required />
                </FormGroup>
                <FormGroup>
                    <Label for="signup-password">Password:</Label>
                    <Input type="password" name="password" id="signup-password"
                        placeholder="Enter your password" onChange={this.handleChange} required
                    />
                </FormGroup>
                <Button color='primary'>Create account</Button>
            </Form>
        );
    };

};

export default SignupForm;
