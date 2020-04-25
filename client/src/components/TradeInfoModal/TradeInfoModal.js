import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import moment from 'moment';

class TradeInfoModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            oppTrade: {}
        };
    };

    componentDidMount = () => {
        console.log(`GET request for ${this.props.oppTradeId}`);
        axios.get(`/${this.props.type}/${this.props.oppTradeId}`).then(res => {
            console.log(res.data);
            this.setState({
                oppTrade: res.data
            });
        }).catch(err => {
            console.log(err);
        });
    };

    toggleModal = () => {
        this.setState(prevState => ({ isOpen: !prevState.isOpen }));
    };

    render = () => {
        const oppTradeDate = moment.utc(this.state.oppTrade.date).local().format('MM/D/YYYY, h:mm a');
        let renderTradeInfo =
            <ModalBody>
                <b>Sold this entry trade on: </b>{oppTradeDate}
                <br />
                <b>Sold {this.state.oppTrade.totalCoins} {this.state.oppTrade.coinName} at:</b>
                <br />
            </ModalBody>;
        if (this.props.type === 'entryTrade') {
            renderTradeInfo =
                <ModalBody>
                    <h6>Entry trade: {this.state.oppTrade.totalInvestment}</h6>
                </ModalBody>;
        };

        return (
            <div>
                <Button color='primary' onClick={this.toggleModal}>Info</Button>
                <Modal isOpen={this.state.isOpen} toggle={this.toggleModal} className={this.props.className}>
                    <ModalHeader>
                        <b>Trade information:</b>
                    </ModalHeader>
                    {renderTradeInfo}
                    <ModalFooter>
                        <Button onClick={this.toggleModal}>Close</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );

    };

};

export default TradeInfoModal;
