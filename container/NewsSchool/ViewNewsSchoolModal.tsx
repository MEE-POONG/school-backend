import { NewsSchool } from '@prisma/client';
import React, { useState } from 'react';
import { Badge, Col, Image, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaRegEye } from 'react-icons/fa';

interface NewsSchoolViewNewsSchoolModalProps {
    data: NewsSchool;
}
const NewsSchoolViewNewsSchoolModal: React.FC<NewsSchoolViewNewsSchoolModalProps> = ({ data }) => {
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
                        ชื่อรีวิว : {data?.newName}
                        </Col>
                        <Col lg="4">
                        บริการที่ใช้ : {data?.newTitle}
                        </Col>
                        <Col lg="4">
                        หมวดหมู่  : {data?.newSubTitle}
                        </Col>
                        <Col lg="4">
                        ผู้รีวิว : {data?.newSubDetail}
                        </Col>
                        <Col lg="4">
                        รายละเอียดรีวิว : {data?.newDate}
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

export default NewsSchoolViewNewsSchoolModal;
