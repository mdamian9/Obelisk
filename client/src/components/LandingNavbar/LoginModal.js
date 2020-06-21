import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LoginForm from '../LoginForm/LoginForm';
import './LandingNavbar.css';

class LoginModal extends Component {

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
            <div className='login-modal'>
                <Button onClick={this.toggleModal}><FontAwesomeIcon icon='sign-in-alt' /> Log In</Button>
                <Modal isOpen={this.state.isOpen} toggle={this.toggleModal} className={this.props.className}>
                    <ModalHeader toggle={this.toggleModal}>Log In</ModalHeader>
                    <ModalBody>
                        <LoginForm history={this.props.history} />
                    </ModalBody>
                    <ModalFooter>
                        <div className="mx-auto">
                            Don't have an account? Sign up <Link to='/signup'>here</Link>
                        </div>
                    </ModalFooter>
                </Modal>
            </div>
        );
    };

};

export default LoginModal;
