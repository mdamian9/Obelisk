import React, { Component } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import UserNavbar from '../UserNavbar/UserNavbar';
import Footer from '../Footer/Footer';
import withAuth from '../withAuth/withAuth';

class CalculateRoiPage extends Component {

    constructor() {
        super();
        this.state = {
            currency: '',
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
                                        Calculate Return on Investment
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
