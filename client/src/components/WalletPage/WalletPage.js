import React, { Component } from 'react';
import { Container, Row, Table } from 'reactstrap';
import withAuth from '../withAuth/withAuth';
import Currencies from '../../assets/currencies';
import UserNavbar from '../UserNavbar/UserNavbar';
import DepositFundsModal from './DepositFundsModal';
import WithdrawFundsModal from './WithdrawFundsModal';
import TransferFundsModal from './TransferFundsModal';
import ResetFundsModal from './ResetFundsModal';
import './WalletPage.css';

const TableRow = ({ targetWallet, walletName }) => {
    let ActionButton =
        <div className='d-flex'>
            <DepositFundsModal targetWallet={targetWallet} />
            &ensp;
            <TransferFundsModal targetWallet={targetWallet} walletName={walletName} />
            &ensp;
            <WithdrawFundsModal targetWallet={targetWallet} />
            &ensp;
            <ResetFundsModal targetWallet={targetWallet} />
        </div>;
    if (walletName === 'tradingWallet') {
        ActionButton = <TransferFundsModal targetWallet={targetWallet} walletName={walletName} />;
    };
    return (
        <tr>
            <td>
                <img src={Currencies[targetWallet.ticker].icon} alt={`icon-${targetWallet.ticker}`} />
                &ensp;
                {targetWallet.name}
            </td>
            <td>{targetWallet.funds} {targetWallet.ticker}</td>
            <td>{ActionButton}</td>
        </tr>
    );
};

const TableBody = ({ wallet, walletName }) => {
    const currencyRows = [];
    for (const currency in wallet) {
        currencyRows.push(
            <TableRow key={wallet[currency].name} targetWallet={wallet[currency]} walletName={walletName} />
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
                        <Row className='d-flex justify-content-center'>
                            <div className='section-solid-white text-white'>
                                <h3 className='text-center'>
                                    Main Wallet
                                </h3>
                                <hr className='ln-white' />
                                <Table dark striped>
                                    <thead>
                                        <tr>
                                            <th>Currency</th>
                                            <th>Total</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <TableBody wallet={this.state.mainWallet} walletName='mainWallet' />
                                </Table>
                            </div>
                            &ensp;
                            <div className='section-solid-white text-white'>
                                <h3 className='text-center'>
                                    Trading Wallet
                                </h3>
                                <hr className='ln-white' />
                                <Table dark striped>
                                    <thead>
                                        <tr>
                                            <th>Currency</th>
                                            <th>Total</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <TableBody wallet={this.state.tradingWallet} walletName='tradingWallet' />
                                </Table>
                            </div>
                        </Row>
                    </Container>
                </div>
            </div>
        );
    };

};

export default withAuth(WalletPage);
