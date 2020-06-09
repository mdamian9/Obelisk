import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

const AlertModal = props => {
    let className = 'text-success';
    let header = 'Success:';
    let message = props.message;
    let errType = null;
    if (props.error) {
        className = 'text-danger';
        header = 'Error:';
        errType = props.error;
        message = `The ${errType} you entered is incorrect!`;
    };
    const resolve = () => {
        props.toggleAlertModal();
        if (!props.error) {
            window.location.reload();
        };
    };
    return (
        <Modal isOpen={props.isOpen} toggle={props.toggleAlertModal} className={props.className}>
            <ModalHeader className={className}>
                <b style={{ fontSize: '24px' }}>{header}</b>
            </ModalHeader>
            <ModalBody>
                {message}
            </ModalBody>
            <ModalFooter>
                <Button onClick={() => { resolve(); }}>Close</Button>
            </ModalFooter>
        </Modal>
    );
};

export default AlertModal;
