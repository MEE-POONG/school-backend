import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Modal, Spinner } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

interface LoadModalProps {
    checkLoad: boolean;
    title: string;
    detail: string;
}

const LoadModal: React.FC<LoadModalProps> = ({ checkLoad, title, detail }) => {
    const router = useRouter();

    let variant;

    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(checkLoad);
    }, [checkLoad]);
    return (
        <>
            <Modal show={show} centered>
                <Alert variant={variant} className='m-0 text-center' dismissible>
                    <Alert.Heading className='m-0'>{title}</Alert.Heading>
                    <p className='m-0'>{detail}</p>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </Alert>
            </Modal>
        </>
    );
}

export default LoadModal;