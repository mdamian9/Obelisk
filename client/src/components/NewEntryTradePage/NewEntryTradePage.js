import React, { Component } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import UserNavbar from '../UserNavbar/UserNavbar';
import withAuth from '../withAuth/withAuth';

class NewEntryTradePage extends Component {

    constructor() {
        super();
        
    };

    render = () => {
        return (
            <div>
                <UserNavbar history={this.props.history} />
                <br />
                <div>

                </div>
            </div>
        );
    };

};

export default withAuth(NewEntryTradePage);
