import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import AuthService from '../AuthService/AuthService';
import axios from 'axios';

class SellTradeModal extends Component {

    render = () => {
        return (
            <div>
                <Button></Button>
                <Modal>
                    <ModalHeader>
                        Sell position:
                    </ModalHeader>
                </Modal>
            </div>
        );
    };

};

export default SellTradeModal;
