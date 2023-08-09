import { User } from '@prisma/client';
import React, { useState } from 'react';
import { Badge, Col, Form, InputGroup, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaRegEye, FaSearch, FaUserNinja } from 'react-icons/fa';

interface UserAddUserModalProps {
    data: User ; // replace this with the actual type of your data
}
const UserAddUserModal: React.FC<UserAddUserModalProps> = ({ data }) => {
    const [show, setShow] = useState<boolean>(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button className="mx-1 btn gold" bsPrefix="icon" onClick={handleShow}>
                <FaUserNinja />
                <span className="h-tooltiptext">เพิ่มยูเซอร์</span>
            </Button>
            <Modal show={show} onHide={handleClose} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>ยูเซอร์</Modal.Title>
                    <InputGroup className="w-auto mx-auto" bsPrefix="input-icon">
                        <InputGroup.Text id="basic-addon1">
                            <FaSearch />
                        </InputGroup.Text>
                        <Form.Control
                            placeholder="fname"
                            aria-label="fname"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm="12">
                            <div className='text-center'>Master</div>
                            <Badge className="mx-1" bg="info">
                                Info
                            </Badge>
                        </Col>
                        <Col sm="12">
                            <div className='text-center'>Agent</div>
                            <Badge className="mx-1" bg="info">
                                Info
                            </Badge>
                        </Col>
                    </Row>
                </Modal.Body >
                <Modal.Footer>
                    <Button variant="success" onClick={handleClose}>
                        ปิด
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    );
}

export default UserAddUserModal;
