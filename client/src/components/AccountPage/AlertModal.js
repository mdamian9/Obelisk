import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

const AlertModal = props => {
    let header = 'Success:';
    let message = props.message;
    let errType = null;
    if (props.error) {
        header = 'Error:';
        errType = props.error;
        message = `The ${errType} you entered is incorrect!`;
    }; 
    return (
        <Modal isOpen={props.isOpen} toggle={props.toggleAlertModal} className={props.className}>
            <ModalHeader className='text-danger'>
                <b style={{ fontSize: '24px' }}>{header}</b>
            </ModalHeader>
            <ModalBody>
                {message}
            </ModalBody>
            <ModalFooter>
                <Button onClick={props.toggleAlertModal}>Close</Button>
            </ModalFooter>
        </Modal>
    );
};

export default AlertModal;
