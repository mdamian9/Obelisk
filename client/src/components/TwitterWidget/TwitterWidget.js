import React, { Component } from 'react';
import { Card, CardText, CardBody, CardTitle, CardSubtitle, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios';

const RenderTweet = ({ tweet }) => {
    return (
        <Card style={{ color: 'black', marginBottom: '5px', backgroundColor: 'lightblue' }}>
            <CardBody>
                <CardTitle><img src={tweet.profilePic} alt='profilePic' />&ensp;<b>{tweet.author}</b></CardTitle>
                <CardSubtitle>
                    <i><a href={tweet.profileLink} target='_blank' rel='noopener noreferrer'>
                        @{tweet.twitterHandle}
                    </a></i>
                </CardSubtitle>
                <CardText>{tweet.text}</CardText>
                <Button color='primary' href={tweet.link} target="_blank">Link</Button>
            </CardBody>
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
            axios.get(`/tweets/${this.props.keyphrase}`).then(res => {
                this.setState({ tweets: res.data });
            }).catch(err => {
                console.log(err);
            });
        };
    };

    searchTweets = event => {
        event.preventDefault();
        console.log(event.target.value);
    };

    render = () => {
        let searchBar = <div></div>;
        if (this.props.type === 'search') {
            searchBar =
                <div>
                    <Form className='d-flex justify-content-center' style={{ padding: '10px' }} onSubmit={this.searchTweets}>
                        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                            <Input type="text" name="searchTweets" id="search-tweets" placeholder="Enter keyword(s)" required />
                        </FormGroup>
                        <Button>Search</Button>
                    </Form>
                    <hr className='ln-white' />
                </div>
        };
        let renderTweets = <div></div>;
        if (this.state.tweets) {
            renderTweets = this.state.tweets.map(tweet => {
                return (
                    <RenderTweet key={tweet.id} tweet={tweet} />
                );
            });
        };
        return (
            <div style={this.props.style}>
                {searchBar}
                {renderTweets}
                <br />
            </div>
        );
    };

};

export default TwitterWidget;
