import { useRouter } from 'next/router';
import React from 'react';
import { Modal, Spinner } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

interface LoadModalProps {
    checkLoad: boolean;
    checkBody: string;

}

const LoadModal: React.FC<LoadModalProps> = ({ checkLoad }) => {
    const router = useRouter();
console.log("checkLoad : ",checkLoad);

    let variant;
    let heading;
    let boding;


    return (
        <>
            <Modal show={checkLoad} centered>
                <Alert variant={variant} className='m-0' dismissible>
                    <Alert.Heading className='m-0'>{heading}</Alert.Heading>
                    <p className='m-0'>{boding}</p>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </Alert>
            </Modal>
        </>
    );
}

export default LoadModal;