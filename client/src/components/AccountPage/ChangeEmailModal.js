import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AuthService from '../AuthService/AuthService';
import axios from 'axios';
import './AccountPage.css';

class ChangeEmailModal extends Component {

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
        // Extract name & value from event target and set to state
        const { name, value } = event.target;
        this.setState({ [name]: value })
    };

    handleFormSubmit = event => {
        event.preventDefault();
        const update = { newEmail: this.state.newEmail };
        if (this.state.currentEmail === this.props.currentEmail) {
            axios.patch(`/user/changeEmail/${this.Auth.getProfile().id}`, update).then(() => {
                window.location.reload();
            }).catch(err => {
                console.log(err);
            });
        };
        this.toggleModal();
    };

    render = () => {
        return (
            <div>
                <Button className='account-btn' onClick={this.toggleModal}><FontAwesomeIcon icon='edit' /> Edit</Button>
                <Modal isOpen={this.state.isOpen} toggle={this.toggleModal} className={this.props.className}>
                    <ModalHeader toggle={this.toggleModal} className='text-danger'>Change Email</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleFormSubmit}>
                            <FormGroup>
                                <Label for='currentEmail'>Current Email:</Label>
                                <Input type='email' id='currentEmail' name='currentEmail' onChange={this.handleChange}
                                    placeholder='Enter your current email' required />
                            </FormGroup>
                            <FormGroup>
                                <Label for='newEmail'>New Email:</Label>
                                <Input type='email' id='newEmail' name='newEmail' onChange={this.handleChange}
                                    placeholder='Enter your new email' required />
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

export default ChangeEmailModal;
