import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Navbar, NavbarBrand, Nav } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AuthService from '../AuthService/AuthService';
import Logo from '../Logo/Logo';
import AlertModal from '../AlertModal/AlertModal';
import './LandingNavbar.css';

class LandingNavbar extends Component {

    constructor(props) {
        super(props);
        this.Auth = new AuthService();
        this.state = {
            alertModalOpen: false,
            alertMsg: null,
            error: false
        };
    };

    toggleAlertModal = () => {
        this.setState(prevState => ({ alertModalOpen: !prevState.alertModalOpen }));
    };

    // Handles the change of a form field and sets new state
    handleChange = event => {
        // Extract name & value from event.target and set to state
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        const { username, password } = this.state;
        event.preventDefault();
        event.persist();
        // Log in the user and redirect them to the user home page
        this.Auth.login(username, password).then(() => {
            this.props.history.replace('/home');
        }).catch(err => {
            event.target.reset();
            this.setState({ username: '', password: '', alertMsg: err.response.data.message, error: true });
            this.toggleAlertModal();
        });
    };

    render = () => {
        return (
            <div>
                <AlertModal isOpen={this.state.alertModalOpen} toggleAlertModal={this.toggleAlertModal}
                    message={this.state.alertMsg} error={this.state.error} reload={false} />
                <Navbar color='light' light expand='md'>
                    <NavbarBrand id='nav-brand' href='/'>
                        <Logo width='30px' height='30px' /><b>Obelisk</b>
                    </NavbarBrand>
                    <Nav id='nav' className='nav-class ml-auto' navbar>
                        <Form inline id="login-form" onSubmit={this.handleFormSubmit}>
                            <FormGroup className='mb-2 mr-sm-2 mb-sm-0'>
                                <Label for='login-username' className='mr-sm-2'>Username:</Label>
                                <Input type="text"
                                    name="username" id="login-username"
                                    placeholder="Enter your username"
                                    onChange={this.handleChange} required
                                />
                            </FormGroup>
                            <FormGroup className='mb-2 mr-sm-2 mb-sm-0'>
                                <Label for='login-password' className='mr-sm-2'>Password:</Label>
                                <Input type="password"
                                    name="password" id="login-password"
                                    placeholder="Enter your password"
                                    onChange={this.handleChange} required
                                />
                            </FormGroup>
                            <Button><FontAwesomeIcon icon='sign-in-alt' /> Log In</Button>
                        </Form>
                    </Nav>
                </Navbar>
            </div>
        );
    };

};

export default LandingNavbar;

