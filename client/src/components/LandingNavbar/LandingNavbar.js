import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Navbar, NavbarBrand, Nav } from 'reactstrap';
import Logo from '../Logo/Logo';

class LandingNavbar extends Component {

    handleChange = event => {
        // Extract name & value from event.target and set to state
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        console.log(this.state);
        // Clear form fields
        event.target.reset();
        // Reset state
        this.setState({
            email: '',
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
                        <Button>Log In</Button>
                    </Form>
                </Nav>
            </Navbar>
        );
    };

};

export default LandingNavbar;

