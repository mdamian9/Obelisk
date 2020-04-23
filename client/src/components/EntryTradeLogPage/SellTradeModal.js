import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
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

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        let totalDivestment = this.props.trade.totalCoins * this.state.exitPrice;
        
        // Double check if switch statement returns correct output

        switch (this.props.trade.currency) {
            case 'USD': totalDivestment = totalDivestment.toFixed(4); break;
            case 'USDT': totalDivestment = totalDivestment.toFixed(7); break;
            case 'BTC': case 'ETH': case 'BNB': totalDivestment = totalDivestment.toFixed(8); break;
            default: /* Do nothing */ break;
        };
        console.log(totalDivestment);
        const exitTrade = {
            currency: this.props.trade.currency,
            totalDivestment: totalDivestment,
            coinName: this.props.trade.coinName,
            tradingPair: this.props.trade.tradingPair,
            exitPrice: this.state.exitPrice,
            totalCoins: this.props.trade.totalCoins,
            user: this.props.trade.user,
            entryTrade: this.props.trade._id
        };
        axios.post('/exitTrade', exitTrade).then(() => {
            this.props.history.replace('/exit-trades');
        }).catch(err => { console.log(err); });
        event.target.reset();
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
