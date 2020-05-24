import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Currencies from '../../assets/currencies';
import axios from 'axios';
import moment from 'moment';


class TradeInfoModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            oppTrade: {}
        };
    };

    componentDidMount = () => {
        axios.get(`/${this.props.type}/${this.props.oppTradeId}`).then(res => {
            this.setState({ oppTrade: res.data });
        }).catch(err => { console.log(err); });
    };

    toggleModal = () => {
        this.setState(prevState => ({ isOpen: !prevState.isOpen }));
    };

    render = () => {
        const tradeDate = moment.utc(this.props.trade.date).local().format('MM/D/YYYY, h:mm a');
        const oppTradeDate = moment.utc(this.state.oppTrade.date).local().format('MM/D/YYYY, h:mm a');
        let renderTradeInfo =
            <ModalBody>
                • Bought this position on: <b>{tradeDate}</b>
                <br />
                • Bought <b>{this.props.trade.totalCoins} {this.props.trade.coinName} </b>
                at <b>{this.props.trade.entryPrice} {this.props.trade.currency} </b>each
                <br />
                • Sold this position on: <b>{oppTradeDate}</b>
                <br />
                • Sold <b>{this.state.oppTrade.totalCoins} {this.state.oppTrade.coinName} </b>
                at <b>{this.state.oppTrade.exitPrice} {this.state.oppTrade.currency} </b>each
                <br />
                • Entry price: <b>{this.props.trade.entryPrice} {this.props.trade.currency}</b>
                <br />
                • Exit price: <b>{this.state.oppTrade.exitPrice} {this.state.oppTrade.currency}</b>
                <br />
                • Total investment: <b>{this.props.trade.totalInvestment} {this.props.trade.currency}</b>
                <br />
                • Total divestment: <b>{this.state.oppTrade.totalDivestment} {this.state.oppTrade.currency}</b>
                <br />
                • Total profit: <b>{this.state.oppTrade.totalProfit} {this.state.oppTrade.currency}</b>
                <br />
                • Return on investment (percentage): <b>{this.state.oppTrade.percentChange}% ROI</b>
                <br />
                • Return on investment (multiple): <b>{this.state.oppTrade.x_roi}x ROI</b>
            </ModalBody >;
        if (this.props.type === 'entryTrade') {
            renderTradeInfo =
                <ModalBody>
                    • Bought this position on: <b>{oppTradeDate}</b>
                    <br />
                    • Bought <b>{this.state.oppTrade.totalCoins} {this.state.oppTrade.coinName} </b>
                    at <b>{this.state.oppTrade.entryPrice} {this.state.oppTrade.currency} </b>each
                    <br />
                    • Sold this position on: <b>{tradeDate}</b>
                    <br />
                    • Sold <b>{this.props.trade.totalCoins} {this.props.trade.coinName} </b>
                    at <b>{this.props.trade.exitPrice} {this.props.trade.currency} </b>each
                    <br />
                    • Entry price: <b>{this.state.oppTrade.entryPrice} {this.state.oppTrade.currency}</b>
                    <br />
                    • Exit price: <b>{this.props.trade.exitPrice} {this.props.trade.currency}</b>
                    <br />
                    • Total investment: <b>{this.state.oppTrade.totalInvestment} {this.state.oppTrade.currency}</b>
                    <br />
                    • Total divestment: <b>{this.props.trade.totalDivestment} {this.props.trade.currency}</b>
                    <br />
                    • Total profit: <b>{this.props.trade.totalProfit} {this.props.trade.currency}</b>
                    <br />
                    • Return on investment (percentage): <b>{this.props.trade.percentChange}% ROI</b>
                    <br />
                    • Return on investment (multiple): <b>{this.props.trade.x_roi}x ROI</b>
                </ModalBody>;
        };

        return (
            <div>
                <Button color='primary' onClick={this.toggleModal}>Info</Button>
                <Modal isOpen={this.state.isOpen} toggle={this.toggleModal} className={this.props.className}>
                    <ModalHeader>
                        <b>Trade information:</b><br />
                        <div className='d-flex align-items-center'>
                            <img src={Currencies[this.props.trade.coinName].icon} width={20} height={20} style={{ marginRight: '2px' }}
                                alt={`icon-${this.props.trade.coinName}`} />
                            {this.props.trade.coinName}
                            <span style={{margin: '0px 3px'}}>/</span>
                            <img src={Currencies[this.props.trade.currency].icon} width={20} height={20} style={{ marginRight: '2px' }}
                                alt={`icon-${this.props.trade.currency}`} />
                            {this.props.trade.currency}
                        </div>
                    </ModalHeader>
                    {renderTradeInfo}
                    <ModalFooter>
                        <Button onClick={this.toggleModal}>Close</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );

    };

};

export default TradeInfoModal;
