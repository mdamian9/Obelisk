import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';

class TradeInfoModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
    };

    componentDidMount = () => {
        console.log(`GET request for ${this.props.oppTradeId}`);
        // axios.get(`/${this.props.type}/${this.props.oppTradeId}`).then(res => {
        //     console.log(res.data);
        // }).catch(err => {
        //     console.log(err);
        // });
    };

    toggleModal = () => {
        this.setState(prevState => ({ isOpen: !prevState.isOpen }));
    };

    render = () => {
        let renderTradeInfo =
            <div>
                <ModalHeader>
                    <b>Exit trade information:</b>
                </ModalHeader>
                <ModalBody>
                    <b>Sold trade on:</b>
                    <br />
                    <b>Sold {'X amount'} {'BTC'} at:</b>
                    <br />
                </ModalBody>
            </div>;
        if (this.props.type === 'entryTrade') {
            renderTradeInfo =
                <div>
                    <ModalHeader>
                        <b>Entry trade information:</b>
                    </ModalHeader>
                    <ModalBody>
                        <h6>Entry trade:</h6>
                    </ModalBody>
                </div>;
        };

        return (
            <div>
                <Button color='primary' onClick={this.toggleModal}>Info</Button>
                <Modal isOpen={this.state.isOpen} toggle={this.toggleModal} className={this.props.className}>
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
