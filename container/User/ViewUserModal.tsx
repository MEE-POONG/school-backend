import { Adminmaster } from '@prisma/client';
import React, { useState } from 'react';
import { Badge, Col, Image, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaRegEye } from 'react-icons/fa';
import { bankMap } from "@/test";

interface AdminmasterViewAdminmasterModalProps {
    data: Adminmaster;
}
const AdminmasterViewAdminmasterModal: React.FC<AdminmasterViewAdminmasterModalProps> = ({ data }) => {
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
                            ชื่อยูเซอร์แอดมิน : {data?.adminUsername}
                        </Col>
                        <Col lg="4">
                            รหัสผ่าน แอดมิน : {data?.adminPassword}
                        </Col>
                        <Col lg="4">
                            เพศ : {data?.sex}
                        </Col>
                        <Col lg="4">
                            เบอร์โทร : {data?.tel}
                        </Col>
                        <Col lg="4">
                            email : {data?.email}
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

export default AdminmasterViewAdminmasterModal;
