import React, { Component } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import UserNavbar from '../UserNavbar/UserNavbar';
import withAuth from '../withAuth/withAuth';

class FindPercentChangePage extends Component {

    constructor() {
        super();
        this.state = {
            tradingPair: '',
            entryPrice: '0.0',
            exitPrice: '0.0',
            percentChange: '0.0'
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
            tradingPair: '',
            entryPrice: '0.0',
            exitPrice: '0.0',
            percentChange: '0.0'
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
                                    Find Percent Change
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
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col xs={7} className='section-solid-white text-white mx-auto'>
                                <Row>
                                    <Col>
                                        <h3 className='text-center'>
                                            Percent Change Calculation
                                        </h3>
                                    </Col>
                                </Row>
                                <hr className='ln-white' />
                                <Row className='align-items-center text-center'>
                                    <Col>
                                        Entry price: {this.state.entryPrice} {this.state.tradingPair}
                                        <br />
                                        Exit price: {this.state.exitPrice} {this.state.tradingPair}
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
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        );
    };

};

export default withAuth(FindPercentChangePage);
