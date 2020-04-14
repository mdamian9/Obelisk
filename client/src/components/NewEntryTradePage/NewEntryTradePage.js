import React, { Component } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios';
import UserNavbar from '../UserNavbar/UserNavbar';
import AuthService from '../AuthService/AuthService';
import withAuth from '../withAuth/withAuth';

class NewEntryTradePage extends Component {

    constructor(props) {
        super(props);
        this.Auth = new AuthService();
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
        const totalCoins = parseFloat(this.state.totalInvestment) / parseFloat(this.state.coinPrice);
        const entryTrade = {
            currency: this.state.currency,
            totalInvestment: this.state.totalInvestment,
            coinName: this.state.coinName,
            tradingPair: `${this.state.coinName}/${this.state.currency}`,
            coinPrice: this.state.coinPrice,
            totalCoins: totalCoins.toFixed(8).replace(/\.?0+$/, ''),
            user: this.props.user.id
        };
        const config = { headers: { Authorization: `Bearer ${this.Auth.getToken()}` } };
        axios.post('/entryTrade', entryTrade, config).then(res => {
            console.log(res);
            alert(res.data.message);
        }).catch(err => {
            console.log(err);
        });
        event.target.reset();
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
                                        <Label for='coin-price'>Coin price:</Label>
                                        <Input type='number' name='coinPrice' id='coin-price'
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
