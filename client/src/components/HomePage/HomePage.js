import React, { Component } from 'react';
import { Container, Row, Col, Button, Collapse } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserNavbar from '../UserNavbar/UserNavbar';
import TwitterWidget from '../TwitterWidget/TwitterWidget';
import Footer from '../Footer/Footer';
import withAuth from '../withAuth/withAuth';
import './HomePage.css';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapseOneOpen: false,
            collapseTwoOpen: false
        };
    };

    toggleCollapseOne = () => {
        this.setState(prevState => ({ collapseOneOpen: !prevState.collapseOneOpen }))
    };

    toggleCollapseTwo = () => {
        this.setState(prevState => ({ collapseTwoOpen: !prevState.collapseTwoOpen }))
    };

    render = () => {
        return (
            <div>
                <div className='content'>
                    <UserNavbar history={this.props.history} />
                    <br />
                    <Container className='text-white'>
                        <Row className='justify-content-center'>
                            <Col>
                                <div className='section-solid-white text-center'>
                                    <h2 style={{marginBottom: '0px'}}>
                                        Welcome {this.props.user.username}!
                                    </h2>
                                    <hr className='ln-white' />
                                    <Row>
                                        <Col className='d-flex justify-content-center'>
                                            <Button color='info' href='/wallet'>
                                                <FontAwesomeIcon icon='wallet' /> Wallet
                                    </Button>
                                    &ensp;
                                    <Button color='primary' href='/new-entry-trade'>
                                                <FontAwesomeIcon icon='file-import' /> New Entry Trade
                                    </Button>
                                        </Col>
                                    </Row>
                                    <br />
                                    <Row>
                                        <Col className='d-flex justify-content-center'>
                                            <Button color='success' href='/entry-trades'>
                                                <FontAwesomeIcon icon='file-import' /> Entry Trade Log
                                    </Button>
                                    &ensp;
                                    <Button color='danger' href='/exit-trades'>
                                                <FontAwesomeIcon icon='file-export' /> Exit Trade Log
                                    </Button>
                                        </Col>
                                    </Row>
                                    <hr className='ln-white' />
                                    <Row>
                                        <Col className='d-flex justify-content-center'>
                                            <Button color='light' href='/find-percent-change'>
                                                <FontAwesomeIcon icon='chart-line' /> Find % Change
                                    </Button>
                                    &ensp;
                                    <Button color='dark' href='/get-target-price'>
                                                <FontAwesomeIcon icon='search-dollar' /> Get Target Price
                                    </Button>
                                    &ensp;
                                    <Button color='warning' href='calculate-roi'>
                                                <FontAwesomeIcon icon='hand-holding-usd' /> Calculate ROI
                                    </Button>
                                        </Col>
                                    </Row>
                                </div>
                                <br />
                                <div className='section-solid-white'>
                                    <TwitterWidget style={{ maxHeight: '65vh', overflowY: 'scroll' }} type='search' />
                                </div>
                                <br />
                            </Col>
                            <Col>
                                <div className='section-solid-white' style={{width: '500px'}}>
                                    <div>
                                        <h2 style={{marginBottom: '0px'}} className='d-flex justify-content-center align-items-center'>
                                            <FontAwesomeIcon icon={['fab', 'twitter-square']} />&nbsp;Twitter News
                                            <Button id='home-colBtn-one' color='primary' onClick={this.toggleCollapseOne}>
                                                <FontAwesomeIcon icon='angle-double-down' />
                                            </Button>
                                        </h2>
                                        <Collapse isOpen={this.state.collapseOneOpen}>
                                            <hr className='ln-white' />
                                            <TwitterWidget style={{ maxHeight: '114.4vh', overflowY: 'scroll' }} keyphrase='bitcoin' />
                                        </Collapse>
                                        <div id='twit-widg-one'>
                                            <hr className='ln-white' />
                                            <TwitterWidget style={{ maxHeight: '114.4vh', overflowY: 'scroll' }} keyphrase='bitcoin' />
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <br />
                    </Container>
                </div>
                <Footer />
            </div>
        );
    };
};

export default withAuth(HomePage);
