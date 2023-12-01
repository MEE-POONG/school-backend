import React, { useEffect, useState } from 'react';
import { Modal, Spinner, Alert } from 'react-bootstrap';

interface LoadModalProps {
    checkSuccess: boolean;
}

const ModalSuccess: React.FC<LoadModalProps> = ({ checkSuccess }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (checkSuccess) {
            setShow(true);
            const timer = setTimeout(() => {
                setShow(false);
            }, 1000); // Hide after 1 second

            return () => clearTimeout(timer);
        }
    }, [checkSuccess]);

    return (
        <Modal show={show} centered onHide={() => setShow(false)}>
            <Alert variant={'success'} className='m-0 text-center'>
                <Alert.Heading className='m-0'>ทำรายการสำเร็จ</Alert.Heading>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Alert>
        </Modal>
    );
};

export default ModalSuccess;
