import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import UserNavbar from '../UserNavbar/UserNavbar';
import Footer from '../Footer/Footer';
import withAuth from '../withAuth/withAuth';

class ResourcesPage extends Component {

    constructor(props) {
        super(props);
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
                                    Resources
                                </h3>
                                <hr className='ln-white' />
                                <div className='d-flex justify-content-center'>
                                    <ul>
                                        <li>Twitter:</li>
                                        <li>CoinMarketCap:</li>
                                        <li>BitcoinWisdom:</li>
                                        <li>TradingView:</li>
                                        <li>Binance:</li>
                                        <li>Binance.US:</li>
                                        <li>Bittrex:</li>
                                        <li>Coinbase:</li>
                                        <li>Bitcoin Magazine:</li>
                                        <li>Coindesk:</li>
                                        <li>CoinTelegraph:</li>
                                    </ul>
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

export default withAuth(ResourcesPage);
