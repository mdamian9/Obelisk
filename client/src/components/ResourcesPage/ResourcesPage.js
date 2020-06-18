import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import UserNavbar from '../UserNavbar/UserNavbar';
import Footer from '../Footer/Footer';
import withAuth from '../withAuth/withAuth';
import './ResourcesPage.css';

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
                                    <ul id='resources'>
                                        <li>
                                            Twitter: <Link to='https://twitter.com/'>https://twitter.com/</Link><br />
                                            Twitter is this and that
                                        </li>
                                        <li>CoinMarketCap:</li>
                                        <li>BitcoinWisdom:</li>
                                        <li>TradingView:</li>
                                        <li>Binance: <Link to='https://binance.com/'>https://binance.com/</Link></li>
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
