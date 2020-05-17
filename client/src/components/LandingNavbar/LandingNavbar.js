import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Navbar, NavbarBrand, Nav } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AuthService from '../AuthService/AuthService';
import Logo from '../Logo/Logo';

class LandingNavbar extends Component {

    constructor(props) {
        super(props);
        this.Auth = new AuthService();
    };

    // Handles the change of a form field and sets new state
    handleChange = event => {
        // Extract name & value from event.target and set to state
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    // Log in the user and redirect them to the user home page
    handleLogin = (username, password) => {
        this.Auth.login(username, password).then(() => {
            this.props.history.replace('/home');
        }).catch(err => {
            console.log(err);
            alert(err.response.data.message);
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        // Log in the user and redirect them to the user home page
        this.handleLogin(this.state.username, this.state.password);
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
            <Navbar color='light' light expand='md'>
                <NavbarBrand href='/' className='d-flex align-items-center'>
                    <Logo width='30px' height='30px' /><b>Obelisk</b>
                </NavbarBrand>
                <Nav className='ml-auto' navbar>
                    <Form inline id="login-form" onSubmit={this.handleFormSubmit}>
                        <FormGroup className='mb-2 mr-sm-2 mb-sm-0'>
                            <Label for='login-username' className='mr-sm-2'>Username:</Label>
                            <Input type="text"
                                name="username" id="login-username"
                                placeholder="Enter your username"
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup className='mb-2 mr-sm-2 mb-sm-0'>
                            <Label for='login-password' className='mr-sm-2'>Password:</Label>
                            <Input type="password"
                                name="password" id="login-password"
                                placeholder="Enter your password"
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <Button><FontAwesomeIcon icon='sign-in-alt' /> Log In</Button>
                    </Form>
                </Nav>
            </Navbar>
        );
    };

};

export default LandingNavbar;

