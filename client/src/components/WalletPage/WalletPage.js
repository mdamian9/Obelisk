import React, { Component } from 'react';
import { Container, Row, Col, Table } from 'reactstrap';
import withAuth from '../withAuth/withAuth';
import UserNavbar from '../UserNavbar/UserNavbar';

const TableRow = ({ currency }) => {
    return (
        <tr>
            <td>{currency.name}</td>
            <td>{currency.funds} {currency.ticker}</td>
        </tr>
    );
};

const TableBody = ({ wallet }) => {
    const currencyRows = [];
    for (const currency in wallet) {
        currencyRows.push(<TableRow key={wallet[currency].name} currency={wallet[currency]} />)
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
            wallet: {}
        };
    };

    componentDidMount = () => {
        this.setState({
            wallet: this.props.user.wallet
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
                            <Col xs={10} className='section-solid-white text-white mx-auto'>
                                <h3 className='text-center'>
                                    Wallet
                                </h3>
                                <hr className='ln-white' />
                                <Table dark striped>
                                    <thead>
                                        <tr>
                                            <th>Currency</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <TableBody wallet={this.state.wallet} />
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
