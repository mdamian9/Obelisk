import React, { Component } from 'react';
import { Form, FormGroup, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';

class AddFundsModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
    };

    toggleModal = () => {
        console.log('Toggle Modal');
        // this.setState(prevState => ({
        //     isOpen: !prevState.isOpen
        // }));
    };

    render = () => {
        return (
            <div>
                <Button color='primary' onClick={this.toggleModal}>Deposit</Button>
                <Modal>
                    <ModalHeader>

                    </ModalHeader>
                    <ModalBody>
                        <Form>

                        </Form>
                    </ModalBody>
                    <ModalFooter>

                    </ModalFooter>
                </Modal>
            </div>
        );
    };

};

export default AddFundsModal;
