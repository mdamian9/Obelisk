import React, { Component } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Select from 'react-select';
import UserNavbar from '../UserNavbar/UserNavbar';
import Footer from '../Footer/Footer';
import Currencies from '../../assets/currencies';
import withAuth from '../withAuth/withAuth';

class CalculateRoiPage extends Component {

    constructor() {
        super();
        this.state = {
            selectedOption: null,
            currency: '',
            initialInvestment: '0.0',
            finalDivestment: '0.0',
            roi_x: '0.0',
            roi_percent: '0.0',
            totalProfit: '0.0'
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

    handleFormSubmit = event => {
        event.preventDefault();
        console.log(this.state);
        const investment = parseFloat(this.state.initialInvestment);
        const divestment = parseFloat(this.state.finalDivestment);
        const roi_x = divestment / investment;
        const roi_percent = ((divestment / investment) - 1) * 100;
        let totalProfit = divestment - investment;
        switch (this.state.currency) {
            case 'USD': totalProfit = totalProfit.toFixed(4); break;
            case 'USDT': totalProfit = totalProfit.toFixed(7); break;
            case 'BTC': case 'ETH': case 'BNB': totalProfit = totalProfit.toFixed(8); break;
            default: /* Do nothing */ break;
        };    
        this.setState({
            roi_x: roi_x.toFixed(2),
            roi_percent: roi_percent.toFixed(2),
            totalProfit: totalProfit
        });
    };

    // Reset state (calculation display) and all form fields. Basically start with a clean calculation
    resetCalculation = () => {
        this.setState({
            currency: '',
            initialInvestment: '0.0',
            finalDivestment: '0.0',
            roi_x: '0.0',
            roi_percent: '0.0',
            totalProfit: '0.0'
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
                                    <FontAwesomeIcon icon='hand-holding-usd' />&nbsp;Calculate Return on Investment
                                    </h3>
                                    <hr className='ln-white' />
                                    <Form id='calc-form' onSubmit={this.handleFormSubmit}>
                                        <FormGroup>
                                            <Label for='currency'>Select currency:</Label>
                                            <Select value={selectedOption} onChange={this.handleSelect} options={selectOptions}
                                                id='currency' name='currency' />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for='initial-investment'>Initial investment:</Label>
                                            <Input type='number' name='initialInvestment' id='initial-investment'
                                                placeholder='0.00000000' min='0.00000001' step='0.00000001'
                                                onChange={this.handleChange} required />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for='final-divestment'>Final divestment:</Label>
                                            <Input type='number' name='finalDivestment' id='final-divestment'
                                                placeholder='0.00000000' min='0.00000001' step='0.00000001'
                                                onChange={this.handleChange} required />
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
                                                Return of Investment Calculation
                                            </h3>
                                        </Col>
                                    </Row>
                                    <hr className='ln-white' />
                                    <Row className='align-items-center'>
                                        <Col>
                                            Initial investment: {this.state.initialInvestment} {this.state.currency}
                                            <br />
                                        Final divestment: {this.state.finalDivestment} {this.state.currency}
                                        </Col>
                                        <Col>
                                            <Row>
                                                <Col>
                                                    ROI (multiple): {this.state.roi_x}x
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    ROI (percentage): {this.state.roi_percent}%
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    Total profit: {this.state.totalProfit} {this.state.currency}
                                                </Col>
                                            </Row>
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
                </div>
                <Footer />
            </div>
        );
    };

};

export default withAuth(CalculateRoiPage);
