import { RegisterForm } from '@prisma/client';
import React, { useState } from 'react';
import { Badge, Col, Image, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaRegEye } from 'react-icons/fa';

interface RegisterFormViewRegisterFormModalProps {
    data: RegisterForm;
}
const RegisterFormViewRegisterFormModal: React.FC<RegisterFormViewRegisterFormModalProps> = ({ data }) => {
    const [show, setShow] = useState<boolean>(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <>
            <Button className="mx-1 btn success" bsPrefix="icon" onClick={handleShow}>
                <FaRegEye />
                <span className="h-tooltiptext">ดูข้อมูล</span>
            </Button>
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>ข้อมูล </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col lg="4">
                            ชื่อ : {data?.regId}
                        </Col>
                        <Col lg="4">
                            tel : {data?.regIdpersonal}
                        </Col>
                        <Col lg="4">
                            line : {data?.regBirth}
                        </Col>
                        <Col lg="4">
                            email : {data?.regPrefix}
                        </Col>
                        <Col lg="4">
                            email : {data?.regSex}
                        </Col>
                        <Col lg="4">
                            email : {data?.regNation}
                        </Col>
                        <Col lg="4">
                            email : {data?.regName}
                        </Col>
                        <Col lg="4">
                            email : {data?.regLastname}
                        </Col>
                        <Col lg="4">
                            email : {data?.regEname}
                        </Col>
                        <Col lg="4">
                            email : {data?.regElastname}
                        </Col>
                        <Col lg="4">
                            email : {data?.regPhone}
                        </Col>
                        <Col lg="4">
                            email : {data?.regEmail}
                        </Col>
                        <Col lg="4">
                            email : {data?.regImg}
                        </Col>
                       
                    </Row>
                    <div className='mt-3'>
                        <Badge className="mx-1" bg="success">
                            Success
                        </Badge>
                        <Badge className="mx-1" bg="success">
                            Success
                        </Badge>
                        <Badge className="mx-1" bg="success">
                            Success
                        </Badge>
                        <Badge className="mx-1" bg="success">
                            Success
                        </Badge>
                        <Badge className="mx-1" bg="success">
                            Success
                        </Badge>
                        <Badge className="mx-1" bg="success">
                            Success
                        </Badge>
                        <Badge className="mx-1" bg="success">
                            Success
                        </Badge>
                        <br />
                        <Badge className="mx-1" bg="info">
                            Info
                        </Badge>
                        <Badge className="mx-1" bg="info">
                            Info
                        </Badge>
                        <Badge className="mx-1" bg="info">
                            Info
                        </Badge>
                        <Badge className="mx-1" bg="info">
                            Info
                        </Badge>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleClose}>
                        ปิด
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default RegisterFormViewRegisterFormModal;
