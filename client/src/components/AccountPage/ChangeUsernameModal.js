import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AuthService from '../AuthService/AuthService';
import axios from 'axios';
import './AccountPage.css';

class ChangeUsernameModal extends Component {

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
        const {name, value} = event.target;
        this.setState({[name]: value});
    };

    handleFormSubmit = event => {
        event.preventDefault();
        const update = { newUsername: this.state.newUsername };
        if (this.state.currentUsername === this.props.currentUsername) {
            axios.patch(`/user/changeUsername/${this.Auth.getProfile().id}`, update).then(() => {
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
                    <ModalHeader toggle={this.toggleModal} className='text-danger'>Change Username</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleFormSubmit}>
                            <FormGroup>
                                <Label for='currentUsername'>Current Username:</Label>
                                <Input type='text' id='currentUsername' name='currentUsername' onChange={this.handleChange}
                                    placeholder='Enter your current username' required />
                            </FormGroup>
                            <FormGroup>
                                <Label for='newUsername'>New Username:</Label>
                                <Input type='text' id='newUsername' name='newUsername' onChange={this.handleChange}
                                    placeholder='Enter your new username' required />
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

export default ChangeUsernameModal;
