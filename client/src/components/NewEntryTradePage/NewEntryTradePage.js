import React, { Component } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios';
import UserNavbar from '../UserNavbar/UserNavbar';
import NewEntryTradeErrModal from './NewEntryTradeErrorModal';
import AuthService from '../AuthService/AuthService';
import withAuth from '../withAuth/withAuth';

class NewEntryTradePage extends Component {

    constructor(props) {
        super(props);
        this.Auth = new AuthService();
        this.state = {
            wallet: this.props.user.tradingWallet,
            errModalOpen: false
        };
    };

    toggleErrModal = () => {
        this.setState(prevState => ({
            errModalOpen: !prevState.errModalOpen
        }));
    };

    // Handles the change of a form field
    handleChange = event => {
        // Extract name & value from event.target and set to state
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    // Create new entry trade and save to database
    handleFormSubmit = event => {
        event.preventDefault();
        const availableFunds = this.state.wallet[this.state.currency.toLowerCase()].funds;
        // If total investment is greater than available trading funds, toggle error modal
        if (this.state.totalInvestment > availableFunds) {
            event.target.reset();
            this.toggleErrModal();
            this.setState({
                totalInvestment: 0
            });
        } else {
            const totalCoins = parseFloat(this.state.totalInvestment) / parseFloat(this.state.entryPrice);
            const entryTrade = {
                currency: this.state.currency,
                totalInvestment: this.state.totalInvestment,
                coinName: this.state.coinName,
                tradingPair: `${this.state.coinName}/${this.state.currency}`,
                entryPrice: this.state.entryPrice,
                totalCoins: totalCoins.toFixed(8).replace(/\.?0+$/, ''),
                user: this.props.user.id
            };
            axios.post('/entryTrade', entryTrade).then(() => {
                this.props.history.replace('/entry-trades');
            }).catch(err => { console.log(err); });
            event.target.reset();
        };
    };

    render = () => {
        let renderAvailableFunds = <p></p>;
        if (this.state.currency) {
            const availableFunds = this.state.wallet[this.state.currency.toLowerCase()].funds;
            renderAvailableFunds = <p>Available {this.state.currency}: {availableFunds}</p>
            if (this.state.totalInvestment > availableFunds) {
                renderAvailableFunds = <b className='text-danger'>You do not have enough funds in your trading wallet.</b>
            };
        };
        return (
            <div>
                <NewEntryTradeErrModal isOpen={this.state.errModalOpen} toggleErrModal={this.toggleErrModal} />
                <UserNavbar history={this.props.history} />
                <br />
                <div>
                    <Container>
                        <Row>
                            <Col xs={7} className='section-solid-white text-white mx-auto'>
                                <h3 className='text-center'>
                                    New Entry Trade
                                </h3>
                                <hr className='ln-white' />
                                <Form id='entry-form' onSubmit={this.handleFormSubmit}>
                                    <FormGroup>
                                        <Label for='currency'>Select currency:</Label>
                                        <Input type='select' name='currency' id='currency'
                                            defaultValue='-- select currency --' onChange={this.handleChange} required>
                                            <option disabled>-- select currency --</option>
                                            <option>USD</option>
                                            <option>USDT</option>
                                            <option>BTC</option>
                                            <option>ETH</option>
                                            <option>BNB</option>
                                        </Input>
                                        {renderAvailableFunds}
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for='total-investment'>Total investment:</Label>
                                        <Input type='number' name='totalInvestment' id='total-investment'
                                            placeholder='0.00000000' step='0.00000001' min='0.00000001'
                                            onChange={this.handleChange} required />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for='coin-name'>Coin name:</Label>
                                        <Input type='text' name='coinName' id='coin-name'
                                            placeholder='Enter name of coin bought' onChange={this.handleChange} required />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for='entry-price'>Coin entry price:</Label>
                                        <Input type='number' name='entryPrice' id='entry-price'
                                            placeholder='0.00000000' step='0.00000001' min='0.00000001'
                                            onChange={this.handleChange} required />
                                    </FormGroup>
                                    <Button>Submit</Button>
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        );
    };

};

export default withAuth(NewEntryTradePage);
