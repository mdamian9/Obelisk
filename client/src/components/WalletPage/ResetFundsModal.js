import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AuthService from '../AuthService/AuthService';
import axios from 'axios';
import './WalletPage.css';

class ResetFundsModal extends Component {

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
        this.setState({ [name]: value })
    };

    handleReset = event => {
        event.preventDefault();
        const currency = this.props.targetWallet.ticker.toLowerCase();
        axios.patch(`/user/resetFunds/${this.Auth.getProfile().id}`, { currency: currency }).then(() => {
            this.toggleModal();
            // Refresh wallet page to render updated wallet
            document.location.reload();
        }).catch(err => {
            console.log(err);
        });
    };

    render = () => {
        return (
            <div>
                <Button className='tooltip-btn' color='danger' onClick={this.toggleModal}>
                    <FontAwesomeIcon icon='times-circle' />
                    <span className='tooltip'>Reset funds to 0</span>
                </Button>
                <Modal isOpen={this.state.isOpen} toggle={this.toggleModal} className={this.props.className}>
                    <ModalHeader>
                        Reset {this.props.targetWallet.ticker} wallet
                    </ModalHeader>
                    <ModalBody>
                        Are you sure you want to reset your {this.props.targetWallet.ticker} wallet funds to 0?
                    </ModalBody>
                    <ModalFooter>
                        <Button color='success' onClick={this.handleReset}>Reset</Button>
                        <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    };

};

export default ResetFundsModal;
