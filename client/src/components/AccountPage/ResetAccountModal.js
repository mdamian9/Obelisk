import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AuthService from '../AuthService/AuthService';
import axios from 'axios';
import './AccountPage.css';

class ResetAccountModal extends Component {

    constructor(props) {
        super(props);
        this.Auth = new AuthService();
        this.state = {
            isOpen: false
        };
    };

    toggleModal = () => {
        this.setState(prevState => ({ isOpen: !prevState.isOpen }));
    };

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        axios.patch(`/user/resetAccount/${this.Auth.getProfile().id}`, { password: this.state.password }).then(res => {
            alert(res.data.message);
            this.toggleModal();
        }).catch(err => {
            console.log(err);
            alert('The password you entered was incorrect');
            this.toggleModal();
        });
    };

    render = () => {
        return (
            <div>
                <Button className='account-btn' onClick={this.toggleModal}><FontAwesomeIcon icon='edit' /> Reset Account</Button>
                <Modal isOpen={this.state.isOpen} toggle={this.toggleModal} className={this.props.className}>
                    <ModalHeader toggle={this.toggleModal} className='text-danger'>Reset Account</ModalHeader>
                    <ModalBody>
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
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    };

};

export default ResetAccountModal;
