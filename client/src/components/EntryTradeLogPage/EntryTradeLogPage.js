import React, { Component } from 'react';
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import axios from 'axios';
import AuthService from '../AuthService/AuthService';
import withAuth from '../withAuth/withAuth';
import UserNavbar from '../UserNavbar/UserNavbar';

const TableRow = ({ trade, toggleModal }) => {
    return (
        <tr>
            <th scope="row">{trade.date}</th>
            <td>{trade.tradingPair}</td>
            <td>{trade.totalInvestment} {trade.currency}</td>
            <td>{trade.coinPrice} {trade.currency}</td>
            <td>{trade.totalCoins} {trade.coinName}</td>
            <td>
                <Button onClick={() => { toggleModal(trade); }} color='danger'>Delete</Button>
            </td>
        </tr >
    );
};

const TableBody = ({ trades, toggleModal }) => {
    const tradeRows = trades.map(trade => {
        return <TableRow key={trade._id} trade={trade} toggleModal={toggleModal} />
    });
    return (
        <tbody>
            {tradeRows}
        </tbody>
    );
};

class EntryTradeLogPage extends Component {

    constructor(props) {
        super(props);
        this.Auth = new AuthService();
        this.state = {
            entryTrades: []
        };
    };

    componentDidMount = () => {
        const config = { headers: { Authorization: `Bearer ${this.Auth.getToken()}` } };
        axios.get(`/entryTrade/userTrades/${this.props.user.id}`, config).then(res => {
            this.setState({
                entryTrades: res.data
            });
        }).catch(err => {
            console.log(err);
        });
    };

    toggleModal = () => {
        console.log('Toggle delete trade modal');
    };

    render = () => {
        return (
            <div>
                <UserNavbar history={this.props.history} />
                <br />
                <div>
                    <Container>
                        <Row>
                            <Col xs={10} className='section-solid-white text-white mx-auto'>
                                <h3 className='text-center'>
                                    Entry Trades
                                </h3>
                                <hr className='ln-white' />
                                <Table dark striped>
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Trading Pair</th>
                                            <th>Total Investment</th>
                                            <th>Entry Price</th>
                                            <th>Total Coins</th>
                                        </tr>
                                    </thead>
                                    <TableBody trades={this.state.entryTrades} toggleModal={this.toggleModal} />
                                </Table>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        );
    };

};

export default withAuth(EntryTradeLogPage);
