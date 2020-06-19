import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import UserNavbar from '../UserNavbar/UserNavbar';
import Footer from '../Footer/Footer';
import withAuth from '../withAuth/withAuth';
import './ResourcesPage.css';

const ResourcesPage = props => {
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
                                        <b>Twitter: <a href='https://twitter.com/' target='_blank' rel='noopener noreferrer'>https://twitter.com/</a></b>
                                    </li>
                                    <li>
                                        CoinMarketCap: <a href='https://coinmarketcap.com/' target='_blank' rel='noopener noreferrer'>https://coinmarketcap.com/</a>
                                    </li>
                                    <li>
                                        BitcoinWisdom: <a href='https://bitcoinwisdom.io/' target='_blank' rel='noopener noreferrer'>https://bitcoinwisdom.io/</a>
                                    </li>
                                    <li>
                                        TradingView: <a href='https://www.tradingview.com/' target='_blank' rel='noopener noreferrer'>https://www.tradingview.com/</a>
                                    </li>
                                    <li>
                                        Binance Markets: <a href='https://www.binance.com/en/markets' target='_blank' rel='noopener noreferrer'>https://www.binance.com/en/markets</a>
                                    </li>
                                    <li>
                                        Binance.US Markets: <a href='https://www.binance.us/en/markets' target='_blank' rel='noopener noreferrer'>https://www.binance.us/en/markets</a>
                                    </li>
                                    <li>
                                        Bittrex Markets: <a href='https://bittrex.com/home/markets' target='_blank' rel='noopener noreferrer'>https://bittrex.com/home/markets</a>
                                    </li>
                                    <li>
                                        Coinbase Pro Markets: <a href='https://pro.coinbase.com/markets' target='_blank' rel='noopener noreferrer'>https://pro.coinbase.com/markets</a>
                                    </li>
                                    <li>
                                        Bitcoin Magazine: <a href='https://bitcoinmagazine.com/' target='_blank' rel='noopener noreferrer'>https://bitcoinmagazine.com/</a>
                                    </li>
                                    <li>
                                        CoinDesk: <a href='https://www.coindesk.com/' target='_blank' rel='noopener noreferrer'>https://www.coindesk.com/</a>
                                    </li>
                                    <li>
                                        Cointelegraph: <a href='https://www.cointelegraph.com/' target='_blank' rel='noopener noreferrer'>https://www.cointelegraph.com/</a>
                                    </li>
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

export default withAuth(ResourcesPage);
