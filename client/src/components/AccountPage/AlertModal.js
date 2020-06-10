import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

const AlertModal = props => {
    let className = 'text-success';
    let header = 'Success:';
    if (props.error) {
        className = 'text-danger';
        header = 'Error:';
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
                {props.message}
            </ModalBody>
            <ModalFooter>
                <Button onClick={() => { resolve(); }}>Close</Button>
            </ModalFooter>
        </Modal>
    );
};

export default AlertModal;
