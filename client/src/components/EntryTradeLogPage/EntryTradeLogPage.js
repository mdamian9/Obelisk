import React, { Component } from 'react';
import { Container, Row, Col, Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import UserNavbar from '../UserNavbar/UserNavbar';
import EntryTradeRow from './EntryTradeRow';
import Footer from '../Footer/Footer';
import withAuth from '../withAuth/withAuth';

const TableBody = ({ trades, updateTrades, history }) => {
    const tradeRows = trades.map(trade => {
        return <EntryTradeRow key={trade._id} trade={trade} updateTrades={updateTrades} history={history} />
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
        this.state = {
            entryTrades: []
        };
    };

    componentDidMount = () => {
        this.getEntryTrades();
    };

    getEntryTrades = () => {
        axios.get(`/entryTrade/userTrades/${this.props.user.id}`).then(res => {
            this.setState({
                entryTrades: res.data
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
                                    <FontAwesomeIcon icon='file-import' />&nbsp;Entry Trade Log
                                </h3>
                                <hr className='ln-white' />
                                <Table responsive dark striped>
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Trading Pair</th>
                                            <th>Total Investment</th>
                                            <th>Entry Price</th>
                                            <th>Total Coins</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <TableBody
                                        trades={this.state.entryTrades}
                                        updateTrades={this.getEntryTrades}
                                        history={this.props.history}
                                    />
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

export default withAuth(EntryTradeLogPage);
