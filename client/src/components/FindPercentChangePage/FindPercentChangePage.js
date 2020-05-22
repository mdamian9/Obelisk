import React, { Component } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Select from 'react-select';
import UserNavbar from '../UserNavbar/UserNavbar';
import Footer from '../Footer/Footer';
import Currencies from '../../assets/currencies';
import withAuth from '../withAuth/withAuth';

class FindPercentChangePage extends Component {

    constructor() {
        super();
        this.state = {
            selectedOption: null,
            currency: '',
            entryPrice: '0.0',
            exitPrice: '0.0',
            percentChange: '0.0'
        };
    };

    handleSelect = selectedOption => {
        this.setState({ selectedOption, currency: selectedOption.value });
    };

    // Handles the change of a form field and sets new state
    handleChange = event => {
        // Extract name & value from event target and set to state
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    // Handle percent change calculation and set to state, reset form fields
    handleFormSubmit = event => {
        event.preventDefault();
        const { entryPrice, exitPrice } = event.target;
        const percentChange = (exitPrice.value - entryPrice.value) / entryPrice.value * 100;
        this.setState({
            percentChange: percentChange.toFixed(2)
        });
        event.target.reset();
    };

    // Reset state (calculation display) and all form fields. Basically start with a clean calculation
    resetCalculation = () => {
        this.setState({
            currency: '',
            entryPrice: '0.0',
            exitPrice: '0.0',
            percentChange: '0.0'
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
                    <Container className='tool'>
                        <Row className='justify-content-center align-items-center'>
                            <Col className='text-white'>
                                <div className='section-solid-white'>
                                    <h3 className='text-center'>
                                        <FontAwesomeIcon icon='chart-line' />&nbsp;Find Percent Change
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
                                            <Label for='exit-price'>Exit price:</Label>
                                            <Input type='number' name='exitPrice' id='exit-price' placeholder='0.00000000'
                                                step='0.00000001' min='0.00000001' onChange={this.handleChange} required />
                                        </FormGroup>
                                        <Button>Submit</Button>
                                    </Form>
                                </div>
                            </Col>
                            <Col className='text-center text-white'>
                                <div className='section-solid-white'>
                                    <Row>
                                        <Col>
                                            <h3 className='text-center'>
                                                Percent Change Calculation
                                            </h3>
                                        </Col>
                                    </Row>
                                    <hr className='ln-white' />
                                    <Row className='align-items-center'>
                                        <Col>
                                            Entry price: {this.state.entryPrice} {this.state.currency}
                                            <br />
                                            Exit price: {this.state.exitPrice} {this.state.currency}
                                        </Col>
                                        <Col>
                                            Percent change: {this.state.percentChange}%
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

export default withAuth(FindPercentChangePage);
