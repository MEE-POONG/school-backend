import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Modal, Spinner } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

interface LoadModalProps {
    checkLoad: boolean;
    status: string;
    detail: string;
}

const LoadModal: React.FC<LoadModalProps> = ({ checkLoad, status, detail }) => {

    const [show, setShow] = useState(false);
    const statusText = [
        { title: "กำลังเพิ่มข้อมูล", color: "info", check: "add" },
        { title: "กำลังอัพเดทข้อมูล", color: "warning", check: "update" },
        { title: "กำลังลบข้อมูล", color: "danger", check: "delete" }
    ];

    const currentStatus = statusText.find(item => item.check === status);

    useEffect(() => {
        setShow(checkLoad);
    }, [checkLoad]);

    return (
        <>
            <Modal show={show} centered>
                <Alert variant={currentStatus?.color || 'primary'} className='m-0 text-center' >
                    <Alert.Heading className='m-0'>{currentStatus?.title}</Alert.Heading>
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