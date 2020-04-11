import React, { Component } from 'react';
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import axios from 'axios';
import UserNavbar from '../UserNavbar/UserNavbar';
import withAuth from '../withAuth/withAuth';

class EntryTradeLogPage extends Component {

    // constructor() {
    //     super();
    //     this.state = {

    //     }
    // }

    // componentDidMount = () => {
    //     this.setState({
    //         entryTrades: this.props.user.
    //     })
    // }

    render = () => {
        return (
            <div>
                <UserNavbar history={this.props.history} />
                <br />
                <div>
                    <Container>
                        <Row>   
                            <Col xs={!2} className='section-solid-white text-white mx-auto'>
                                <h3 className='text-center'>
                                    Entry Trades
                                </h3>
                                <hr className='ln-white' />

                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        );
    };

};

export default withAuth(EntryTradeLogPage);
