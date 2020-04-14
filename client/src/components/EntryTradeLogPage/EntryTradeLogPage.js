import React, { Component } from 'react';
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import axios from 'axios';
import AuthService from '../AuthService/AuthService';
import withAuth from '../withAuth/withAuth';
import UserNavbar from '../UserNavbar/UserNavbar';

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
            console.log(res.data);
        }).catch(err => {
            console.log(err);
        });
    };

    render = () => {
        console.log(this.props.user);
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
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        );
    };

};

export default withAuth(EntryTradeLogPage);
