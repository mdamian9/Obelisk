import React, { Component } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import AuthService from '../AuthService/AuthService';
import withAuth from '../withAuth/withAuth';
import UserNavbar from '../UserNavbar/UserNavbar';
import './FindPercentChangePage.css';

const Auth = new AuthService();

class FindPercentChangePage extends Component {

    constructor() {
        super();
        this.state = {
            tradingPair: '',
            entryPrice: '',
            exitPrice: '',
            percentChange: ''
        };
    };

    handleLogout = () => {
        Auth.logout();
        this.props.history.replace('/');
    };

    handleFormSubmit = event => {
        event.preventDefault();
    };

    render = () => {
        return (
            <div>
                <UserNavbar handleLogout={this.handleLogout} />
                <br />
                <div>
                    <Container>
                        <Row>
                            <Col xs={7} className='section-solid-white text-white mx-auto text-center'>
                                <h3>
                                    Find Percent Change
                                </h3>
                                <hr className='ln-white' />
                                <Form>

                                </Form>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        );
    };

};

export default withAuth(FindPercentChangePage);
