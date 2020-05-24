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

    // Sometimes wallet balances are not updated correctly. Not sure why
    deleteTrade = () => {
        if (this.props.exitTradeId) {
            axios.delete(`/exitTrade/${this.props.exitTradeId}`).then(() => {
                console.log('Deleted respective exit trade');
            }).catch(err => {
                console.log(err);
            });
        };
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
        if (this.props.sold === true) {
            modalBody =
                <div>
                    This position has been sold and deleting this entry trade will also delete its respective exit trade. Your
                    total profit on this position will be removed and your initial investment of {this.props.totalInvestment}&nbsp;
                    {this.props.currency} will be returned to your {this.props.currency} trading balance. Are you sure you want to
                    delete this trade?
                </div>
        };

        return (
            <div>
                <Button color='danger' onClick={this.toggleModal}>Delete</Button>
                <Modal isOpen={this.state.isOpen} toggle={this.toggleModal} className={this.props.className}>
                    <ModalHeader toggle={this.toggleModal} className='text-danger'>Confirm Delete</ModalHeader>
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
