import React, { Component } from 'react';
import { Card, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import axios from 'axios';

const RenderTweet = ({ tweet }) => {
    return (
        <Card>

        </Card>
    );
};

class TwitterWidget extends Component {

    constructor(props) {
        super(props);
        this.state = {
            keyphrase: null,
            tweets: null
        };
    };

    componentDidMount = () => {
        if (this.props.keyphrase) {
            console.log(this.props.keyphrase);
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
