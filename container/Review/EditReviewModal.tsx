import {  Review } from '@prisma/client';
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaPen, FaTrashAlt } from 'react-icons/fa';
interface EditReviewModalProps {
    data: Review;
    apiEdit: () => Promise<any>; // add this line
}
const EditReviewModal: React.FC<EditReviewModalProps> = ({ data, apiEdit }) => {
    const [show, setShow] = useState<boolean>(false);
    const [checkEdit, setCheckEdit] = useState<string>("not");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let heading = `ลบข้อมูล : ${data?.title} ${data.title2} ${data.category} ${data.subTitle}${data.reviewDetail}${data.reviewerName}`;
    let detail = `ต้องการลบข้อมูลใช่หรือไม่`;
    let variant = "";

    if (checkEdit === 'success') {
        variant = 'success';
        detail = 'ลบข้อมูลสำเร็จ';
    } else if (checkEdit === 'primary') {
        variant = 'primary';
        detail = 'กำลังลบข้อมูล';
    } else if (checkEdit === 'danger') {
        variant = 'danger';
        detail = 'Error ลบข้อมูลไม่สำเร็จ';
    } else if (checkEdit === 'warning') {
        variant = 'warning';
        detail = 'กรอกข้อมูลไม่ครบ';
    }
    const handleEdit = () => {
        setCheckEdit("primary");
        apiEdit().then(() => {
            setCheckEdit("success");
            setTimeout(() => {
                setCheckEdit("not");
                handleClose();
            }, 1000);
        }).catch(() => {
            setCheckEdit("danger");
        });
    };
    const handleCloseAndReset = () => {
        handleClose();
        setCheckEdit("not");
    };

    return (
        <>
            <Button className="mx-2 btn" bsPrefix="icon" onClick={handleShow}>
                <FaPen />
            </Button>
            <Modal show={show} onHide={handleCloseAndReset}>
                <Modal.Header  >
                    <Modal.Title >ลบ {heading} </Modal.Title>
                    <Button variant="close" onClick={handleCloseAndReset} />
                </Modal.Header>
                <Modal.Body>
                    <Alert variant={variant} className='data m-0'>
                        <Alert.Heading className='p-0'>{detail}</Alert.Heading>
                    </Alert>
                </Modal.Body>
                <Modal.Footer className='d-flex justify-content-around'>
                    <Button variant="secondary" className={checkEdit === 'not' || checkEdit === 'danger' ? "my-2" : "d-none"} onClick={handleCloseAndReset}>
                        Close
                    </Button>
                    <Button variant="primary" className={checkEdit === 'not' || checkEdit === 'danger' ? "my-2" : "d-none"} onClick={handleEdit}>
                        {/* <Button variant="primary" className={checkEdit === 'not' || checkEdit === 'danger' ? "my-2" : "d-none"} onClick={() => setCheckEdit("primary")}> */}
                        ยืนยันการแก้ไข
                    </Button>
                </Modal.Footer>

            </Modal>
        </>
    );
}

export default EditReviewModal;
