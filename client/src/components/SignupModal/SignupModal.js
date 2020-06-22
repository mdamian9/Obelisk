import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import SignupForm from '../SignupForm/SignupForm';

class SignupModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
    };

    toggleModal = () => {
        this.setState(prevState => ({ isOpen: !prevState.isOpen }));
    };

    render = () => {
        return (
            <div>
                <Button color='primary' onClick={this.toggleModal}>Create Account</Button>
                <Modal isOpen={this.state.isOpen} toggle={this.toggleModal} className={this.props.className}>
                    <ModalHeader toggle={this.toggleModal}>Create Account</ModalHeader>
                    <ModalBody>
                        <SignupForm history={this.props.history} />
                    </ModalBody>
                    <ModalFooter>
                        <div className="mx-auto">
                            Already have an account? Log in&nbsp;<Link to="/login">here</Link>
                        </div>
                    </ModalFooter>
                </Modal>
            </div>
        )
    };

};

export default SignupModal;