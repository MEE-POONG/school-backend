import LoadModal from '@/components/modal/LoadModal';
import { CourseList } from '@prisma/client';
import useAxios from 'axios-hooks';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaPen } from 'react-icons/fa';

interface ModalFormEditProps {
    selectID: CourseList;
    onEditSuccess: () => void;
}
const ModalFormEdit: React.FC<ModalFormEditProps> = ({ selectID, onEditSuccess }) => {
    const router = useRouter();
    const { id } = router.query;
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [formData, setFormData] = useState<CourseList | null>();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [inputForm, setInputForm] = useState<boolean>(false);

    const [{ data, loading, error }, CourseListAPI] = useAxios('/api/CourseList');

    useEffect(() => {
        setFormData(selectID);
    }, [selectID]);

    const handleInputChange = (title: string, value: any) => {
        setFormData((prev: any) => ({
            ...prev,
            [title]: value
        }));
    }
    const handleToggleChange = (title: string) => {
        setFormData((prev: any) => ({
            ...prev,
            [title]: !prev[title] // Toggle the boolean value
        }));
    }

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setIsLoading(true);
        setInputForm(true);

        let missingFields = [];
        if (!formData?.FieldStudy) missingFields.push("FieldStudy");
        if (formData?.regular && !formData?.First) missingFields.push("First");
        if (formData?.regular && !formData?.Second) missingFields.push("Second");
        if (formData?.associate && !formData?.associateFirst) missingFields.push("First");
        if (formData?.associate && !formData?.associateSecond) missingFields.push("Second");
        if (missingFields.length > 0) {
            setIsLoading(false);
            alert(`กรอกข้อมูลไม่ครบ: ${missingFields.join(', ')}`);
            return; // Stop the submission
        }
        try {
            const response = await CourseListAPI({
                url: `/api/CourseList/${formData?.id}`,
                method: "PUT",
                data: {
                    FieldStudy: formData?.FieldStudy,
                    regular: formData?.regular,
                    First: formData?.First,
                    Second: formData?.Second,
                    associate: formData?.associate,
                    associateFirst: formData?.associateFirst,
                    associateSecond: formData?.associateSecond,
                    courseGroupId: formData?.courseGroupId,
                }
            });

            if (response?.status === 200) {
                handleClose();
                setTimeout(() => {
                    setIsLoading(false);
                    onEditSuccess();
                }, 1000);
            } else {
                setIsLoading(false);
                alert("Failed to add information.");
            }
        } catch (error) {
            setIsLoading(false);
            alert("An error occurred during submission.");
        }

    };

    return (
        <>
            <LoadModal checkLoad={isLoading || loading} status={"add"} detail={`กำลังเพิ่มสาขา ${formData?.FieldStudy}`} />
            <Button bsPrefix='btn info icon' onClick={handleShow}>
                <FaPen />
            </Button>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>แก้ไขสาขาวิชา</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FloatingLabel controlId="FieldStudy" label="ชื่อสาขา" className="mb-3" >
                        <Form.Control
                            isValid={inputForm && formData?.FieldStudy !== ""}
                            isInvalid={inputForm && !formData?.FieldStudy}
                            type="text"
                            defaultValue={formData?.FieldStudy || ""}
                            onChange={(e) => handleInputChange("FieldStudy", e.target.value)}
                            placeholder="ชื่อสาขา"
                        />
                    </FloatingLabel>
                    <Button className="mb-3 w-100"
                        onClick={() => handleToggleChange('regular')} // Update the 'regular' field
                    >
                        {formData?.regular ? "เปิด" : "ปิด"} ภาคเรียนปกติ
                    </Button>
                    <Row>
                        <Col md={6}>
                            <FloatingLabel controlId="First" label="ค่าเทียบโอน" className="mb-3" >
                                <Form.Control
                                    isValid={inputForm && formData?.regular && formData?.First !== ""}
                                    isInvalid={inputForm && formData?.regular && !formData?.First}
                                    type="number"
                                    defaultValue={formData?.First || ""}
                                    onChange={(e) => handleInputChange("First", e.target.value)}
                                    placeholder="ชื่อสาขา"
                                    min={0}
                                    disabled={!formData?.regular}
                                />
                            </FloatingLabel>
                        </Col>
                        <Col md={6}>
                            <FloatingLabel controlId="Second" label="เรียน ปกติ" className="mb-3" >
                                <Form.Control
                                    isValid={inputForm && formData?.regular && formData?.Second !== ""}
                                    isInvalid={inputForm && formData?.regular && !formData?.Second}
                                    type="number"
                                    defaultValue={formData?.Second || ""}
                                    onChange={(e) => handleInputChange("Second", e.target.value)}
                                    placeholder="ชื่อสาขา"
                                    min={0}
                                    disabled={!formData?.regular}
                                />
                            </FloatingLabel>
                        </Col>
                    </Row>
                    <Button className="mb-3 w-100"
                        onClick={() => handleToggleChange('associate')} // Update the 'associate' field
                    >
                        {formData?.associate ? "เปิด" : "ปิด"} ภาคเรียนปกติ
                    </Button>
                    <Row>
                        <Col md={6}>
                            <FloatingLabel controlId="associateFirst" label="ค่าเทียบโอน" className="mb-3" >
                                <Form.Control
                                    isValid={inputForm && formData?.associate && formData?.associateFirst !== ""}
                                    isInvalid={inputForm && formData?.associate && !formData?.associateFirst}
                                    type="number"
                                    defaultValue={formData?.associateFirst || ""}
                                    onChange={(e) => handleInputChange("associateFirst", e.target.value)}
                                    placeholder="ชื่อสาขา"
                                    min={0}
                                    disabled={!formData?.associate}
                                />
                            </FloatingLabel>
                        </Col>
                        <Col md={6}>
                            <FloatingLabel controlId="associateSecond" label="เรียน ปกติ" className="mb-3" >
                                <Form.Control
                                    isValid={inputForm && formData?.associate && formData?.associateSecond !== ""}
                                    isInvalid={inputForm && formData?.associate && !formData?.associateSecond}
                                    type="number"
                                    defaultValue={formData?.associateSecond || ""}
                                    onChange={(e) => handleInputChange("associateSecond", e.target.value)}
                                    placeholder="ชื่อสาขา"
                                    min={0}
                                    disabled={!formData?.associate}
                                />
                            </FloatingLabel>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        ยกเลิก
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        ยืนยัน
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalFormEdit;