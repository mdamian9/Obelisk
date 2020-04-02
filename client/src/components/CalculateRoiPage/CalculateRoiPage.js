import React, { Component } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import UserNavbar from '../UserNavbar/UserNavbar';
import withAuth from '../withAuth/withAuth';

class CalculateRoiPage extends Component {

    constructor() {
        super();
        this.state = {
            tradingPair: '',
            initialInvestment: '0.0',
            finalDivestment: '0.0',
            roi_x: '0.0',
            roi_percent: '0.0',
            totalProfit: '0.0'
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

    handleFormSubmit = event => {
        event.preventDefault();
        console.log(this.state);
        const investment = parseFloat(this.state.initialInvestment);
        const divestment = parseFloat(this.state.finalDivestment);
        const roi_x = divestment / investment;
        const roi_percent = ((divestment / investment) - 1) * 100;
        const totalProfit = divestment - investment;
        this.setState({
            roi_x: roi_x.toFixed(2),
            roi_percent: roi_percent.toFixed(2),
            totalProfit: totalProfit
        });
    };

    // Reset state (calculation display) and all form fields. Basically start with a clean calculation
    resetCalculation = () => {
        this.setState({
            tradingPair: '',
            initialInvestment: '0.0',
            finalDivestment: '0.0',
            roi_x: '0.0',
            roi_percent: '0.0',
            totalProfit: '0.0'
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
                                    Calculate Return of Investment
                                </h3>
                                <hr className='ln-white' />
                                <Form id='calc-form' onSubmit={this.handleFormSubmit}>
                                    <FormGroup>
                                        <Label for='trading-pair'>Trading pair:</Label>
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
                                        <Label for='initial-investment'>Initial investment:</Label>
                                        <Input type='text' name='initialInvestment' id='initial-investment'
                                            placeholder='Enter your initial investment' onChange={this.handleChange} required />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for='final-divestment'>Final divestment:</Label>
                                        <Input type='text' name='finalDivestment' id='final-divestment'
                                            placeholder='Enter your final divestment' onChange={this.handleChange} required />
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
                                            Return of Investment Calculation
                                        </h3>
                                    </Col>
                                </Row>
                                <hr className='ln-white' />
                                <Row className='align-items-center text-center'>
                                    <Col>
                                        Initial investment: {this.state.initialInvestment} {this.state.tradingPair}
                                        <br />
                                        Final divestment: {this.state.finalDivestment} {this.state.tradingPair}
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
                                                Total profit: {this.state.totalProfit} {this.state.tradingPair}
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
                            </Col>
                        </Row>
                    </Container>
                </div>
                <br />
            </div>
        );
    };

};

export default withAuth(CalculateRoiPage);
