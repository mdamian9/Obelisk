import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import AuthService from '../AuthService/AuthService';
import axios from 'axios';
import './WalletPage.css';

class WithdrawFundsModal extends Component {

    constructor(props) {
        super(props);
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

    render = () => {
        console.log(this.props.targetWallet);
        let renderTransferError = <p></p>;
        let confirmButton = <Button color='success'>Confirm</Button>;
        if (this.state.totalTransfer > this.props.targetWallet.funds) {
            renderTransferError = <p><b className='text-danger'>You do not have enough funds to withdraw from your wallet.</b></p>
            confirmButton = <div></div>;
        };
        return (
            < div >
                <Button className='tooltip-btn' color='danger' onClick={this.toggleModal}>
                    <FontAwesomeIcon icon='minus-square' />
                    <span className='tooltip'>Withdraw funds</span>
                </Button>
                <Modal isOpen={this.state.isOpen} toggle={this.toggleModal} className={this.props.className}>
                    <ModalHeader>
                        Withdraw {this.props.targetWallet.ticker}
                    </ModalHeader>
                    <Form id='transfer-funds-form' onSubmit={this.handleFormSubmit}>
                        <ModalBody>
                            <FormGroup>
                                <Label for='total-transfer'>Withdraw funds from main {this.props.targetWallet.ticker} wallet:</Label>
                                <Input type='number' name='totalTransfer' id='total-transfer' placeholder='0.00000000'
                                    step='0.00000001' onChange={this.handleChange} required />
                                {renderTransferError}
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            {confirmButton}
                            <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
                        </ModalFooter>
                    </Form>
                </Modal>
            </div >
        );
    };

};

export default WithdrawFundsModal;
