import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

const NewEntryTradeErrorModal = props => {
    return (
        <Modal isOpen={props.isOpen} toggle={props.toggleErrModal} className={props.className}>
            <ModalHeader className='text-danger'>
                <b style={{ fontSize: '24px' }}>Error:</b>
            </ModalHeader>
            <ModalBody>
                You do not have enough funds in your trading wallet. Please transfer enough funds from your main wallet, 
                or deposit to your main wallet and then transfer your trading wallet.
            </ModalBody>
            <ModalFooter>
                <Button color='primary' onClick={props.toggleErrModal}>Close</Button>
            </ModalFooter>
        </Modal>
    );
};

export default NewEntryTradeErrorModal;
