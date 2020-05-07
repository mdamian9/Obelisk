import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import axios from 'axios';

class DeleteTradeModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
    };

    toggleModal = () => {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }));
    };

    deleteTrade = () => {
        axios.delete(`/${this.props.type}/${this.props.tradeId}`).then(() => {
            this.props.updateTrades();
            this.toggleModal();
        }).catch(err => {
            console.log(err);
        });
    };

    render = () => {
        let modalBody =
            <div>
                Are you sure you want to delete this trade?
            </div>;
        return (
            <div>
                <Button color='danger' onClick={this.toggleModal}>Delete</Button>
                <Modal isOpen={this.state.isOpen} toggle={this.toggleModal} className={this.props.className}>
                    <ModalHeader toggle={this.toggleModal}>Confirm Delete</ModalHeader>
                    <ModalBody>
                        {modalBody}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" onClick={this.deleteTrade}>Delete</Button>{' '}
                        <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    };

};

export default DeleteTradeModal;
