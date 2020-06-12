import React, { Component } from 'react';
import { Card, CardBody, Collapse, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import moment from 'moment';
import DeleteTradeModal from '../DeleteTradeModal/DeleteTradeModal';
import TradeInfoModal from '../TradeInfoModal/TradeInfoModal';

class EntryTradeRow extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            alertModalOpen: false,
            alertMsg: null,
            error: false
        };
    };

    toggleCollapse = () => {
        this.setState(prevState => ({ isOpen: !prevState.isOpen }));
    };

    toggleAlertModal = () => {
        this.setState(prevState => ({ alertModalOpen: !prevState.alertModalOpen }));
    };

    handleChange = event => {
        // Extract name & value from event target and set to state
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleFormSubmit = event => {
        const { trade, history } = this.props;
        event.preventDefault();
        let totalDivestment = trade.totalCoins * this.state.exitPrice;
        let totalProfit = totalDivestment - trade.totalInvestment;

        // Double check if switch statement returns correct output

        switch (trade.currency) {
            case 'USD':
                totalDivestment = totalDivestment.toFixed(4);
                totalProfit = totalProfit.toFixed(4);
                break;
            case 'USDT':
                totalDivestment = totalDivestment.toFixed(7);
                totalProfit = totalProfit.toFixed(7);
                break;
            case 'BTC': case 'ETH': case 'BNB':
                totalDivestment = totalDivestment.toFixed(8);
                totalProfit = totalProfit.toFixed(8);
                break;
            default: /* Do nothing */ break;
        };
        const percentChange = (this.state.exitPrice - trade.entryPrice) / trade.entryPrice * 100;
        const x_roi = totalDivestment / trade.totalInvestment;
        const exitTrade = {
            currency: trade.currency,
            coinName: trade.coinName,
            tradingPair: trade.tradingPair,
            exitPrice: this.state.exitPrice,
            totalCoins: trade.totalCoins,
            totalDivestment: totalDivestment,
            totalProfit: totalProfit,
            percentChange: percentChange.toFixed(2),
            x_roi: x_roi.toFixed(2),
            user: trade.user,
            entryTrade: trade._id
        };
        axios.post('/exitTrade', exitTrade).catch(err => { console.log(err); });
        event.target.reset();
        history.replace('/exit-trades');
    };

    render = () => {
        const { trade, updateTrades } = this.props;
        const date = moment.utc(trade.date).local().format('MM/D/YYYY');
        const time = moment.utc(trade.date).local().format('h:mm a');
        let sellButton = 'Sell';
        if (this.state.isOpen) {
            sellButton = <div style={{ padding: '0px 7px 0px 7px' }}><FontAwesomeIcon icon='angle-double-up' /></div>;
        };
        let actionButtons =
            <div className='d-flex'>
                <Button color='danger' onClick={this.toggleCollapse}>{sellButton}</Button>
                &ensp;
                <DeleteTradeModal type='entryTrade' tradeId={trade._id} updateTrades={updateTrades} />
            </div>;
        if (trade.sold === true) {
            actionButtons =
                <div className='d-flex'>
                    <TradeInfoModal type='exitTrade' trade={trade} oppTradeId={trade.exitTrade} />
                    &ensp;
                    <DeleteTradeModal type='entryTrade' tradeId={trade._id} exitTradeId={trade.exitTrade}
                        updateTrades={updateTrades} sold={true} currency={trade.currency}
                        totalInvestment={trade.totalInvestment}
                    />
                </div>;
        };
        return ([
            <tr key={`${trade._id}_row`}>
                <th scope="row">{date},<br />{time}</th>
                <td>{trade.tradingPair}</td>
                <td>{trade.totalInvestment} {trade.currency}</td>
                <td>{trade.entryPrice} {trade.currency}</td>
                <td>{trade.totalCoins} {trade.coinName}</td>
                <td>{actionButtons}</td>
            </tr >,
            <tr key={`${trade._id}_sell`}>
                <td colSpan={6}>
                    <Collapse isOpen={this.state.isOpen} style={{ color: 'black' }}>
                        <Card style={{ width: '60%' }} className='mx-auto'>
                            <CardBody>
                                <Form id='sell-trade-form' onSubmit={this.handleFormSubmit}>
                                    <FormGroup>
                                        <b>Selling {trade.totalCoins} {trade.coinName}</b>
                                        <br />
                                        <Label for='exit-price'>Exit price ({trade.currency}):</Label>
                                        <Input type='number' name='exitPrice' id='exit-price' placeholder='0.00000000'
                                            step='0.00000001' onChange={this.handleChange} required />
                                    </FormGroup>
                                    <Button color='danger'>Confirm</Button>
                                </Form>
                            </CardBody>
                        </Card>
                    </Collapse>
                </td>
            </tr>
        ]);
    };

};

export default EntryTradeRow;
