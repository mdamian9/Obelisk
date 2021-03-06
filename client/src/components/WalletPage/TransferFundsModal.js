import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AuthService from '../AuthService/AuthService';
import axios from 'axios';
import './WalletPage.css';

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
            to: to,
            totalTransfer: 0
        };
    };

    toggleModal = () => {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }));
    };

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    setTransferAmount = event => {
        const { value } = event.target;
        const transferAmount = this.props.targetWallet.funds * value;
        document.getElementById('transfer-form').totalTransfer.value = transferAmount;
        this.setState({ totalTransfer: transferAmount });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        const update = {
            from: this.state.from,
            to: this.state.to,
            currency: this.props.targetWallet.ticker,
            totalTransfer: this.state.totalTransfer
        };
        axios.patch(`/user/transferFunds/${this.Auth.getProfile().id}`, update).then(() => {
            this.toggleModal();
            // Refresh wallet page to render updated wallet
            document.location.reload();
        }).catch(err => {
            console.log(err);
        });
    };

    render = () => {
        let fromWallet = 'main wallet', toWallet = 'trading wallet';
        let renderAvailableFunds =
            <div className='d-flex align-items-center'>
                <div>
                    Available {this.props.targetWallet.ticker}: {this.props.targetWallet.funds}
                </div>
                <div className='flex-grow-1' />
                <Button value={.25} color='danger' style={{ padding: '0px 5px', fontSize: '12px' }} onClick={this.setTransferAmount}>
                    25%
                </Button>
                &ensp;
                <Button value={.50} color='danger' style={{ padding: '0px 5px', fontSize: '12px' }} onClick={this.setTransferAmount}>
                    50%
                </Button>
                &ensp;
                <Button value={.75} color='danger' style={{ padding: '0px 5px', fontSize: '12px' }} onClick={this.setTransferAmount}>
                    75%
                </Button>
                &ensp;
                <Button value={1} color='danger' style={{ padding: '0px 5px', fontSize: '12px' }} onClick={this.setTransferAmount}>
                    Max
                </Button>
            </div>;
        let confirmButton = <Button color='success'>Confirm</Button>;
        if (this.state.from === 'tradingWallet') {
            fromWallet = 'trading wallet';
            toWallet = 'main wallet';
        };
        if (this.state.totalTransfer > this.props.targetWallet.funds || this.props.targetWallet.funds === 0) {
            renderAvailableFunds =
                <div>
                    <div>
                        Available {this.props.targetWallet.ticker}: {this.props.targetWallet.funds}
                    </div>
                    <b className='text-danger'>You do not have enough funds in your {fromWallet}.</b>
                </div>
            confirmButton = <div></div>;
        };
        return (
            <div>
                <Button className='tooltip-btn' color='primary' onClick={this.toggleModal}>
                    <FontAwesomeIcon icon='exchange-alt' />
                    <span className='tooltip'>Transfer funds</span>
                </Button>
                <Modal isOpen={this.state.isOpen} toggle={this.toggleModal} className={this.props.className}>
                    <ModalHeader>
                        Transfer {this.props.targetWallet.ticker}:
                    </ModalHeader>
                    <Form id='transfer-form' onSubmit={this.handleFormSubmit}>
                        <ModalBody>
                            <FormGroup>
                                <Label for='total-transfer'>Transfer {this.props.targetWallet.ticker} to {toWallet}:</Label>
                                <Input type='number' name='totalTransfer' id='total-transfer' placeholder='0.00000000'
                                    step='0.00000001' onChange={this.handleChange} required />
                            </FormGroup>
                            {renderAvailableFunds}
                        </ModalBody>
                        <ModalFooter>
                            {confirmButton}
                            <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </div>
        );
    };

};

export default TransferFundsModal;
