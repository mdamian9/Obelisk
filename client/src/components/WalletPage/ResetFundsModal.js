import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AuthService from '../AuthService/AuthService';
import axios from 'axios';
import './WalletPage.css';

class ResetFundsModal extends Component {

    constructor(props) {
        super(props);
        this.Auth = new AuthService();
        this.state = {
            isOpen: false
        };
    };

    toggleModal = () => {

    };

    handleChange = event => {

    };

    handleFormSubmit = event => {

    };

    render = () => {
        return (
            <div>
                <Button className='tooltip-btn' color='danger'></Button>
            </div>
        );
    };

};

export default ResetFundsModal;
