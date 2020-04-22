import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import AuthService from '../AuthService/AuthService';
import axios from 'axios';

class SellTradeModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
    };

    toggleModal = () => {
        this.setState(prevState => ({ isOpen: !prevState.isOpen }));
    };

    handleFormSubmit = event => {
        event.preventDefault();
        console.log('Sell trade');
    };

    render = () => {
        return (
            <div>
                <Button color='danger' onClick={this.toggleModal}>Sell</Button>
                <Modal isOpen={this.state.isOpen} toggle={this.toggleModal} className={this.props.className}>
                    <ModalHeader className='text-danger'>
                        <b style={{ fontSize: '24px' }}>Sell Position</b>
                    </ModalHeader>
                    <Form id='add-funds-form' onSubmit={this.handleFormSubmit}>
                        <ModalBody>
                            <FormGroup>
                                <b>Selling {this.props.trade.totalCoins} {this.props.trade.coinName}</b>
                                <br />
                                <Label for='exit-price'>Exit price ({this.props.trade.currency}):</Label>
                                <Input type='number' name='exitPrice' id='exit-price' placeholder='0.00000000'
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

export default SellTradeModal;
