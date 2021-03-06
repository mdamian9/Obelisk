import React, { Component } from 'react';
import { Container, Row, Col, Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import moment from 'moment';
import UserNavbar from '../UserNavbar/UserNavbar';
import DeleteTradeModal from '../DeleteTradeModal/DeleteTradeModal';
import TradeInfoModal from '../TradeInfoModal/TradeInfoModal';
import Footer from '../Footer/Footer';
import withAuth from '../withAuth/withAuth';

const TableRow = ({ trade, updateTrades }) => {
    const date = moment.utc(trade.date).local().format('MM/D/YYYY');
    const time = moment.utc(trade.date).local().format('h:mm a');
    return (
        <tr>
            <th scope="row">{date},<br />{time}</th>
            <td>{trade.tradingPair}</td>
            <td>{trade.totalCoins} {trade.coinName}</td>
            <td>{trade.exitPrice} {trade.currency}</td>
            <td>{trade.totalDivestment} {trade.currency}</td>
            <td className='d-flex'>
                <TradeInfoModal type='entryTrade' trade={trade} oppTradeId={trade.entryTrade} />
                &ensp;
                <DeleteTradeModal type='exitTrade' tradeId={trade._id} updateTrades={updateTrades} />
            </td>
        </tr >
    );
};

const TableBody = ({ trades, updateTrades }) => {
    const tradeRows = trades.map(trade => {
        return <TableRow key={trade._id} trade={trade} updateTrades={updateTrades} />
    });
    return (
        <tbody>
            {tradeRows}
        </tbody>
    );
};

class ExitTradeLogPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            exitTrades: []
        };
    };

    componentDidMount = () => {
        this.getExitTrades();
    };

    getExitTrades = () => {
        axios.get(`/exitTrade/userTrades/${this.props.user.id}`).then(res => {
            this.setState({
                exitTrades: res.data
            });
        }).catch(err => {
            console.log(err);
        });
    };

    render = () => {
        return (
            <div>
                <div className='content'>
                    <UserNavbar history={this.props.history} />
                    <br />
                    <Container>
                        <Row>
                            <Col xs={10} className='section-solid-white text-white mx-auto'>
                                <h3 className='text-center'>
                                    <FontAwesomeIcon icon='file-export' />&nbsp;Exit Trade Log
                                </h3>
                                <hr className='ln-white' />
                                <Table responsive dark striped>
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Trading Pair</th>
                                            <th>Total Coins</th>
                                            <th>Exit Price</th>
                                            <th>Total Divestment</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <TableBody trades={this.state.exitTrades} updateTrades={this.getExitTrades} />
                                </Table>
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

export default withAuth(ExitTradeLogPage);
