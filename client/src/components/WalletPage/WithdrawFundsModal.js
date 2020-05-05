import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AuthService from '../AuthService/AuthService';
import axios from 'axios';
import './WalletPage.css';

class WithdrawFundsModal extends Component {

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
        const update = {
            currency: this.props.targetWallet.ticker,
            totalWithdrawal: this.state.totalWithdrawal
        };
        axios.patch(`/user/withdrawFunds/${this.Auth.getProfile().id}`, update).then(() => {
            this.toggleModal();
            // Refresh wallet page to render updated wallet
            document.location.reload();
        }).catch(err => {
            console.log(err);
        });
        event.target.reset();
    };

    render = () => {
        let renderAvailableFunds = <p>Available {this.props.targetWallet.ticker}: {this.props.targetWallet.funds}</p>;
        let confirmButton = <Button color='success'>Confirm</Button>;
        if (this.state.totalWithdrawal > this.props.targetWallet.funds) {
            renderAvailableFunds = <p><b className='text-danger'>You do not have enough funds to withdraw from your wallet.</b></p>
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
                    <Form id='withdraw-funds-form' onSubmit={this.handleFormSubmit}>
                        <ModalBody>
                            <FormGroup>
                                <Label for='total-withdrawal'>Withdraw funds from main {this.props.targetWallet.ticker} wallet:</Label>
                                <Input type='number' name='totalWithdrawal' id='total-withdrawal' placeholder='0.00000000'
                                    step='0.00000001' onChange={this.handleChange} required />
                                {renderAvailableFunds}
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
