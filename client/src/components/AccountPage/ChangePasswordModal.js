import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AuthService from '../AuthService/AuthService';
import axios from 'axios';
import './AccountPage.css';

class ChangePasswordModal extends Component {

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
        const update = {currentPassword: this.state.currentPassword, newPassword: this.state.newPassword};
        axios.patch(`/user/changePassword/${this.Auth.getProfile().id}`, update).then(res => {
            alert(res.data.message);
            window.location.reload();
        }).catch(err => {
            console.log(err);
        });
        this.toggleModal();
    };

    render = () => {
        return (
            <div>
                <Button className='account-btn' onClick={this.toggleModal}><FontAwesomeIcon icon='edit' /> Change Password</Button>
                <Modal isOpen={this.state.isOpen} toggle={this.toggleModal} className={this.props.className}>
                    <ModalHeader toggle={this.toggleModal} className='text-danger'>Change Password</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleFormSubmit}>
                            <FormGroup>
                                <Label for='currentPassword'>Current password:</Label>
                                <Input type='password' id='currentPassword' name='currentPassword' onChange={this.handleChange}
                                    placeholder='Enter your current password' required />
                            </FormGroup>
                            <FormGroup>
                                <Label for='newPassword'>New Password:</Label>
                                <Input type='text' id='newPassword' name='newPassword' onChange={this.handleChange}
                                    placeholder='Enter your new password' required />
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

export default ChangePasswordModal;
