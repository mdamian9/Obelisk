import React, { Component } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import UserNavbar from '../UserNavbar/UserNavbar';
import withAuth from '../withAuth/withAuth';

class CalculateRoiPage extends Component {

    constructor() {
        super();
        this.state = {
            tradingPair: '',
            initialInvestment: '0.0',
            finalDivestment: '0.0',
            totalProfit: '0.0',
            roi_x: '0.0',
            roi_percent: '0.0' 
        };
    };

    // Handles the change of a form field and sets new state
    handleChange = event => {
        // Extract name & value from event target and set to state
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
    };

    render = () => {
        return (
            <div>
                <UserNavbar history={this.props.history} />
                <div>
                    
                </div>
            </div>
        );
    };

};

export default withAuth(CalculateRoiPage);
