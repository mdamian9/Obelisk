import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import AuthService from '../AuthService/AuthService';
import AlertModal from '../AlertModal/AlertModal';

class LoginForm extends Component {

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

    handleChange = event => {
        // Extract name & value from event target and set to state
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
            </div>
        );
    };

};

export default LoginForm;
