import React, { Component } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Select from 'react-select';
import axios from 'axios';
import Currencies from '../../assets/currencies';
import UserNavbar from '../UserNavbar/UserNavbar';
import NewEntryTradeErrModal from './NewEntryTradeErrorModal';
import Footer from '../Footer/Footer';
import AuthService from '../AuthService/AuthService';
import withAuth from '../withAuth/withAuth';

class NewEntryTradePage extends Component {

    constructor(props) {
        super(props);
        this.Auth = new AuthService();
        this.state = {
            errModalOpen: false,
            selectedOptionOne: null,
            selectedOptionTwo: null
        };
    };

    toggleErrModal = () => {
        this.setState(prevState => ({
            errModalOpen: !prevState.errModalOpen
        }));
    };

    setMax = () => {
        const availableFunds = this.props.user.tradingWallet[this.state.currency.toLowerCase()].funds;
        document.getElementById('entry-form').totalInvestment.value = availableFunds;
        this.setState({ totalInvestment: availableFunds })
    };

    // Handles the change of a form field
    handleChange = event => {
        // Extract name & value from event.target and set to state
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    // Handles the change of the select options (currency)
    handleSelectOne = selectedOptionOne => {
        this.setState({ selectedOptionOne, currency: selectedOptionOne.value });
    };

    // Handles the change of the select options (cryptocurrencies - coinName)
    handleSelectTwo = selectedOptionTwo => {
        this.setState({ selectedOptionTwo, coinName: selectedOptionTwo.value });
    };

    // Create new entry trade and save to database
    handleFormSubmit = event => {
        event.preventDefault();
        const availableFunds = this.props.user.tradingWallet[this.state.currency.toLowerCase()].funds;
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
        const { selectedOptionOne, selectedOptionTwo } = this.state;
        const selectOptionsOne = [
            {
                value: 'USD',
                label:
                    < div style={{ color: 'black' }}>
                        <img src={Currencies['USD'].icon} alt={`icon-USD`} width={26} height={26} />&ensp;United States Dollar (USD)
                    </div >
            },
            {
                value: 'USDT',
                label:
                    < div style={{ color: 'black' }}>
                        <img src={Currencies['USDT'].icon} alt={`icon-USDT`} width={26} height={26} />&ensp;Tether (USDT)
                    </div >
            },
            {
                value: 'BTC',
                label:
                    < div style={{ color: 'black' }}>
                        <img src={Currencies['BTC'].icon} alt={`icon-BTC`} width={26} height={26} />&ensp;Bitcoin (BTC)
                    </div >
            },
            {
                value: 'ETH',
                label:
                    < div style={{ color: 'black' }}>
                        <img src={Currencies['ETH'].icon} alt={`icon-ETH`} width={26} height={26} />&ensp;Ethereum (ETH)
                    </div >
            },
            {
                value: 'BNB',
                label:
                    < div style={{ color: 'black' }}>
                        <img src={Currencies['BNB'].icon} alt={`icon-BNB`} width={26} height={26} />&ensp;Binance Coin (BNB)
                    </div >
            }
        ];
        const selectOptionsTwo = [];
        for (const currency in Currencies) {
            selectOptionsTwo.push({
                name: Currencies[currency].name.toLowerCase(),
                value: currency,
                label:
                    <div style={{ color: 'black' }}>
                        <img src={Currencies[currency].icon} alt={`icon-${currency}`} width={26} height={26} />&ensp;{Currencies[currency].name} ({currency})
                    </div>
            });
        };
        selectOptionsTwo.sort((a, b) => (a.name > b.name) ? 1 : -1);
        let renderAvailableFunds = <p></p>;
        if (this.state.currency) {
            const availableFunds = this.props.user.tradingWallet[this.state.currency.toLowerCase()].funds;
            renderAvailableFunds =
                <div className='d-flex align-items-center' style={{ marginTop: 5 }}>
                    <div>
                        Available {this.state.currency}: {availableFunds}
                    </div>
                    &ensp;
                    <Button color='danger' style={{ padding: '0px 5px', fontSize: '12px' }} onClick={this.setMax}>
                        Max
                    </Button>
                </div>;
            if (this.state.totalInvestment > availableFunds) {
                renderAvailableFunds = <b className='text-danger'>You do not have enough funds in your trading wallet.</b>
            };
        };
        return (
            <div>
                <div className='content'>
                    <NewEntryTradeErrModal isOpen={this.state.errModalOpen} toggleErrModal={this.toggleErrModal} />
                    <UserNavbar history={this.props.history} />
                    <br />
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
                                        <Select value={selectedOptionOne} onChange={this.handleSelectOne} options={selectOptionsOne}
                                            id='currency' name='currency' />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for='total-investment'>Total investment:</Label>
                                        <Input type='number' name='totalInvestment' id='total-investment'
                                            placeholder='0.00000000' step='0.00000001' min='0.00000001'
                                            onChange={this.handleChange} required
                                        />
                                        {renderAvailableFunds}
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for='coin-name'>Coin name:</Label>
                                        <Select value={selectedOptionTwo} onChange={this.handleSelectTwo} options={selectOptionsTwo}
                                            id='coin-name' name='coinName' />
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
                <Footer />
            </div>
        );
    };

};

export default withAuth(NewEntryTradePage);
