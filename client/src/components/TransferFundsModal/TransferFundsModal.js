import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import AuthService from '../AuthService/AuthService';
import axios from 'axios';

class TransferFundsModal extends Component {

    constructor(props) {
        super(props);
        this.Auth = new AuthService();
        this.state = {
            isOpen: false
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
        console.log(this.Auth.getProfile().id);
        console.log(`Transferring funds ${this.state.totalTransfer}`);
    };

    render = () => {
        let oppWallet;
        if (this.props.walletName === 'tradingWallet') {
            oppWallet = 'main wallet'
        } else {
            oppWallet = 'trading wallet'
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
