import React, { Component } from 'react';
import { Container, Row, Col, Card, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import axios from 'axios';

class TwitterWidget extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tweets: []
        };
    };

    render = () => {
        return (
            <div>

            </div>
        );
    };

};

export default TwitterWidget;
