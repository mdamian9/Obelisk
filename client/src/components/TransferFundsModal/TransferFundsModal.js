import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import AuthService from '../AuthService/AuthService';
import axios from 'axios';

class TransferFundsModal extends Component {

    constructor(props) {
        super(props);
        this.Auth = new AuthService();
        const from = this.props.walletName; let to;
        if (from === 'mainWallet') {
            to = 'tradingWallet';
        } else {
            to = 'mainWallet'
        };
        this.state = {
            isOpen: false,
            from: from,
            to: to
        };
    };

    toggleModal = () => {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }));
    };

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        const update = {
            from: this.state.from,
            to: this.state.to,
            currency: this.props.currency.ticker.toLowerCase(),
            totalTransfer: this.state.totalTransfer
        };
        axios.patch(`/user/transferFunds/${this.Auth.getProfile().id}`, update).then(res => {
            console.log(res.data);
        }).catch(err => {
            console.log(err);
        });
        this.toggleModal();
        // Refresh wallet page to render updated wallet
        document.location.reload();
    };

    render = () => {
        let oppWallet = 'trading wallet'
        if (this.state.from === 'tradingWallet') {
            oppWallet = 'main wallet';
        };
        return (
            <div>
                <Button color='primary' onClick={this.toggleModal}>Transfer</Button>
                <Modal isOpen={this.state.isOpen} toggle={this.toggleModal} className={this.props.className}>
                    <ModalHeader>
                        Transfer {this.props.currency.ticker}:
                    </ModalHeader>
                    <Form id='transfer-funds-form' onSubmit={this.handleFormSubmit}>
                        <ModalBody>
                            <FormGroup>
                                <Label for='total-transfer'>Transfer funds to {oppWallet}:</Label>
                                <Input type='number' name='totalTransfer' id='total-transfer' placeholder='0.00000000'
                                    step='0.00000001' onChange={this.handleChange} required />
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button color='success'>Confirm</Button>
                            <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </div>
        );
    };

};

export default TransferFundsModal;
