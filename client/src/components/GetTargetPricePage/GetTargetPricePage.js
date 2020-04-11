import React, { Component } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import UserNavbar from '../UserNavbar/UserNavbar';
import withAuth from '../withAuth/withAuth';

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
            currency: '',
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
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        );
    };

};

export default withAuth(GetTargetPricePage);