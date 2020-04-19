import React, { Component } from 'react';
import { Container, Row, Col, Table } from 'reactstrap';
import withAuth from '../withAuth/withAuth';
import UserNavbar from '../UserNavbar/UserNavbar';
import AddFundsModal from '../AddFundsModal/AddFundsModal';
import TransferFundsModal from '../TransferFundsModal/TransferFundsModal';

const TableRow = ({ currency, walletName }) => {
    let ActionButton;
    if (walletName === 'mainWallet') {
        ActionButton =
            <div className='d-flex'>
                <AddFundsModal currency={currency} />&ensp;<TransferFundsModal currency={currency} walletName={walletName} />
            </div>
            ;
    } else {
        ActionButton = <TransferFundsModal currency={currency} walletName={walletName} />
    };
    return (
        <tr>
            <td>{currency.name}</td>
            <td>{currency.funds} {currency.ticker}</td>
            <td>{ActionButton}</td>
        </tr>
    );
};

const TableBody = ({ wallet, walletName }) => {
    const currencyRows = [];
    for (const currency in wallet) {
        currencyRows.push(
            <TableRow key={wallet[currency].name} currency={wallet[currency]} walletName={walletName} />
        );
    };
    return (
        <tbody>
            {currencyRows}
        </tbody>
    );
};

class WalletPage extends Component {

    constructor() {
        super();
        this.state = {
            mainWallet: {},
            tradingWallet: {}
        };
    };

    componentDidMount = () => {
        this.setState({
            mainWallet: this.props.user.mainWallet,
            tradingWallet: this.props.user.tradingWallet
        });
    };

    render = () => {
        return (
            <div>
                <UserNavbar history={this.props.history} />
                <br />
                <div>
                    <Container>
                        <Row>
                            <Col className='section-solid-white text-white'>
                                <h3 className='text-center'>
                                    Main Wallet
                                </h3>
                                <hr className='ln-white' />
                                <Table dark striped>
                                    <thead>
                                        <tr>
                                            <th>Currency</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <TableBody wallet={this.state.mainWallet} walletName='mainWallet' />
                                </Table>
                            </Col>
                            <Col xs={1} />
                            <Col className='section-solid-white text-white'>
                                <h3 className='text-center'>
                                    Trading Wallet
                                </h3>
                                <hr className='ln-white' />
                                <Table dark striped>
                                    <thead>
                                        <tr>
                                            <th>Currency</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <TableBody wallet={this.state.tradingWallet} walletName='tradingWallet' />
                                </Table>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        );
    };

};

export default withAuth(WalletPage);
