import React, { Component } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Select from 'react-select';
import UserNavbar from '../UserNavbar/UserNavbar';
import Footer from '../Footer/Footer';
import withAuth from '../withAuth/withAuth';
import Currencies from '../../assets/currencies';

class GetTargetPricePage extends Component {

    constructor() {
        super();
        this.state = {
            currency: '',
            entryPrice: '0.0',
            percentChange: '0.0',
            targetPrice: '0.0'
        };
    };

    // Handles the change of a form field and sets new state
    handleChange = event => {
        // Extract name & value from event target and set to state
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleSelect = selectedOption => {
        this.setState({ selectedOption, currency: selectedOption.value });
    };

    // Handle target price calculation and set to state, reset form fields
    handleFormSubmit = event => {
        event.preventDefault();
        const entryPrice = parseFloat(this.state.entryPrice);
        const percentChange = parseFloat(this.state.percentChange) / 100;
        let targetPrice = entryPrice * percentChange + entryPrice;
        switch (this.state.currency) {
            case 'USD': targetPrice = targetPrice.toFixed(4); break;
            case 'USDT': targetPrice = targetPrice.toFixed(7); break;
            case 'BTC': case 'ETH': case 'BNB': targetPrice = targetPrice.toFixed(8); break;
            default: /* Do nothing */ break;
        };
        this.setState({
            targetPrice: targetPrice.replace(/\.?0+$/, '')
        });
        event.target.reset();
    };

    // Reset state (calculation display) and all form fields. Basically start with a clean calculation
    resetCalculation = () => {
        this.setState({
            selectedOption: null,
            currency: '',
            entryPrice: '0.0',
            percentChange: '0.0',
            targetPrice: '0.0'
        });
        document.getElementById('calc-form').reset();
    };

    render = () => {
        const { selectedOption } = this.state;
        const selectOptions = [
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
        return (
            <div>
                <div className='content'>
                    <UserNavbar history={this.props.history} />
                    <br />
                    <Container>
                        <Row className='justify-content-center align-items-center'>
                            <Col className='text-white'>
                                <div className='section-solid-white'>
                                    <h3 className='text-center'>
                                        Get Target Exit Price
                                    </h3>
                                    <hr className='ln-white' />
                                    <Form id='calc-form' onSubmit={this.handleFormSubmit}>
                                        <FormGroup>
                                            <Label for='currency'>Select currency:</Label>
                                            <Select value={selectedOption} onChange={this.handleSelect} options={selectOptions}
                                                id='currency' name='currency' />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for='entry-price'>Entry price:</Label>
                                            <Input type='number' name='entryPrice' id='entry-price' placeholder='0.00000000'
                                                step='0.00000001' min='0.00000001' onChange={this.handleChange} required />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for='percent-change'>Percent change desired:</Label>
                                            <Input type='number' name='percentChange' id='percent-change' placeholder='00.00'
                                                step='0.01' min='0.01' onChange={this.handleChange} required />
                                        </FormGroup>
                                        <Button>Submit</Button>
                                    </Form>
                                </div>
                            </Col>
                            <Col className='text-white text-center'>
                                <div className='section-solid-white'>
                                    <Row>
                                        <Col>
                                            <h3>
                                                Target Price Calculation
                                            </h3>
                                        </Col>
                                    </Row>
                                    <hr className='ln-white' />
                                    <Row className='align-items-center'>
                                        <Col>
                                            Entry price: {this.state.entryPrice} {this.state.currency}
                                            <br />
                                            Percent change desired: {this.state.percentChange}%
                                        </Col>
                                        <Col>
                                            Target exit price: {this.state.targetPrice} {this.state.currency}
                                        </Col>
                                    </Row>
                                    <hr className='ln-white' />
                                    <Row>
                                        <Col>
                                            <Button onClick={this.resetCalculation}>Reset Calculation</Button>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                    <br />
                </div>
                <Footer />
            </div>
        );
    };

};

export default withAuth(GetTargetPricePage);