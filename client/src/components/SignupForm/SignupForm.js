import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios';
import AlertModal from '../AlertModal/AlertModal';

class SignupForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            alertModalOpen: false,
            alertMsg: null,
            error: false,
            login: false
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
        event.preventDefault();
        event.persist();
        // Create user in the backend through /signup route
        axios.post('/signup', this.state).then(res => {
            event.target.reset();
            this.setState({ alertMsg: res.data.message, error: false, login: true });
            this.toggleAlertModal();
        }).catch(err => {
            event.target.reset();
            this.setState({
                email: '', username: '', password: '', alertMsg: err.response.data.message, error: true, login: false
            });
            this.toggleAlertModal();
        });
    };

    render = () => {
        return (
            <div>
                <AlertModal isOpen={this.state.alertModalOpen} toggleAlertModal={this.toggleAlertModal}
                    message={this.state.alertMsg} error={this.state.error} login={this.state.login} history={this.props.history} />
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
            </div>
        );
    };

};

export default SignupForm;
