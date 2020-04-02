import React, { Component } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import UserNavbar from '../UserNavbar/UserNavbar';
import withAuth from '../withAuth/withAuth';

class GetTargetPricePage extends Component {

    constructor() {
        super();
        this.state = {
            tradingPair: '',
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

    // Handle target price calculation and set to state, reset form fields
    handleFormSubmit = event => {
        event.preventDefault();
        const entryPrice = parseFloat(this.state.entryPrice);
        const percentChange = parseFloat(this.state.percentChange) / 100;
        let targetPrice = (entryPrice * percentChange) + entryPrice;
        switch (this.state.tradingPair) {
            case 'USD': targetPrice = targetPrice.toFixed(4); break;
            case 'USDT': targetPrice = targetPrice.toFixed(7); break;
            case 'BTC': case 'ETH': case 'BNB': targetPrice = targetPrice.toFixed(8); break;
            default: /* Do nothing */ break;
        };
        this.setState({
            targetPrice: parseFloat(targetPrice.toString().trim('0'))
        });
        event.target.reset();
    };

    // Reset state (calculation display) and all form fields. Basically start with a clean calculation
    resetCalculation = () => {
        this.setState({
            tradingPair: '',
            entryPrice: '0.0',
            percentChange: '0.0',
            targetPrice: '0.0'
        });
        document.getElementById('calc-form').reset();
    };

    render = () => {
        return (
            <div>
                <UserNavbar history={this.props.history} />
                <br />
                <div>
                    <Container>
                        <Row>
                            <Col xs={7} className='section-solid-white text-white mx-auto'>
                                <h3 className='text-center'>
                                    Get Target Exit Price
                                </h3>
                                <hr className='ln-white' />
                                <Form id='calc-form' onSubmit={this.handleFormSubmit}>
                                    <FormGroup>
                                        <Label for='trading-pair'>Trading Pair:</Label>
                                        <Input type='select' name='tradingPair' id='trading-pair'
                                            defaultValue='-- select trading pair --' onChange={this.handleChange} required>
                                            <option disabled>-- select trading pair --</option>
                                            <option>USD</option>
                                            <option>USDT</option>
                                            <option>BTC</option>
                                            <option>ETH</option>
                                            <option>BNB</option>
                                        </Input>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for='entry-price'>Entry price:</Label>
                                        <Input type='text' name='entryPrice' id='entry-price' placeholder='Enter entry price'
                                            onChange={this.handleChange} required />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for='percent-change'>Percent change desired:</Label>
                                        <Input type='text' name='percentChange' id='percent-change'
                                            placeholder='Enter percent change desired' onChange={this.handleChange} required />
                                    </FormGroup>
                                    <Button>Submit</Button>
                                </Form>
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col xs={7} className='section-solid-white text-white mx-auto'>
                                <Row>
                                    <Col>
                                        <h3 className='text-center'>
                                            Target Price Calculation
                                        </h3>
                                    </Col>
                                </Row>
                                <hr className='ln-white' />
                                <Row className='align-items-center text-center'>
                                    <Col>
                                        Entry price: {this.state.entryPrice} {this.state.tradingPair}
                                        <br />
                                        Percent change desired: {this.state.percentChange}%
                                    </Col>
                                    <Col>
                                        Target exit price: {this.state.targetPrice} {this.state.tradingPair}
                                    </Col>
                                </Row>
                                <hr className='ln-white' />
                                <Row>
                                    <Col>
                                        <Button onClick={this.resetCalculation}>Reset Calculation</Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        );
    };

};

export default withAuth(GetTargetPricePage);