// UpdateContact.tsx
import React, { useEffect, useState } from 'react';
import useAxios from 'axios-hooks';
import { Button, Card, Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import LayOut from '@/components/RootPage/TheLayOut';
import axios from 'axios';
import LoadModal from '@/components/modal/LoadModal';
import { ContactUS } from '@prisma/client';

const UpdateContact: React.FC = (props) => {
    const [{ data: contactData, loading, error }, refetch] = useAxios('/api/ContactUS');
    const [formData, setFormData] = useState<ContactUS | null>(null);


    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [inputForm, setInputForm] = useState<boolean>(false);

    useEffect(() => {
        if (contactData && !formData) {
            setFormData(contactData);
        }
    }, [contactData]);

    const handleInputChange = (title: string, value: any) => {
        setFormData((prev: any) => ({
            ...prev,
            [title]: value
        }));
    }



    const reloadPage = () => {
        window.location.reload();
    };

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setIsLoading(true);
        setInputForm(true);

        try {
            const response = await refetch({
                url: `/api/ContactUS/${formData?.id}`,
                method: "PUT",
                data: {
                    id: formData?.id,
                    addressOne: formData?.addressOne,
                    addressTwo: formData?.addressTwo,
                    addressThree: formData?.addressThree,
                    subDistrict: formData?.subDistrict,
                    district: formData?.district,
                    province: formData?.province,
                    zipcode: formData?.zipcode,
                    tel: formData?.tel,
                    fax: formData?.fax,
                    email: formData?.email,
                    facebook: formData?.facebook,
                }
            });
            if (response?.data?.success) {
                setFormData(response?.data?.data);
                setIsLoading(false);
            }
        } catch (error) {
            console.error('Failed to submit form data:', error);
            setIsLoading(false);
        }

    };


    return (
        <LayOut>
            <LoadModal checkLoad={isLoading || loading} title={"กำลังอัพเดท"} detail={""} />
            <div className='herdpage-page'>
                <Card>
                    <Card.Header className="d-flex space-between">
                        <h4 className="mb-0 py-1">
                            ติดต่อเรา
                        </h4>
                    </Card.Header>
                    <Card.Body className="overflow-hidden">
                        <Row>
                            <Col md={12}>
                                <h5 className='mb-3 mt-4'>
                                    ที่อยู่
                                </h5>
                            </Col>
                            <Col md={4} lg={3}>
                                <FloatingLabel controlId="addressOne" label="ที่อยู่" className="mb-3" >
                                    <Form.Control
                                        isValid={inputForm && formData?.addressOne !== ""}
                                        isInvalid={inputForm && formData?.addressOne === ""}
                                        type="text"
                                        defaultValue={formData?.addressOne || ""}
                                        onChange={(e) => handleInputChange("addressOne", e.target.value)}
                                        placeholder="ระบุที่อยู่"
                                    />
                                </FloatingLabel>
                            </Col>
                            <Col md={4} lg={3}>
                                <FloatingLabel controlId="subDistrict" label="ตำบล" className="mb-3" >
                                    <Form.Control
                                        isValid={inputForm && formData?.subDistrict !== ""}
                                        isInvalid={inputForm && formData?.subDistrict === ""}
                                        type="text"
                                        defaultValue={formData?.subDistrict || ""}
                                        onChange={(e) => handleInputChange("subDistrict", e.target.value)}
                                        placeholder="ระบุตำบล"
                                    />
                                </FloatingLabel>
                            </Col>
                            <Col md={4} lg={3}>
                                <FloatingLabel controlId="district" label="อำเภอ" className="mb-3" >
                                    <Form.Control
                                        isValid={inputForm && formData?.district !== ""}
                                        isInvalid={inputForm && formData?.district === ""}
                                        type="text"
                                        defaultValue={formData?.district || ""}
                                        onChange={(e) => handleInputChange("district", e.target.value)}
                                        placeholder="ระบุอำเภอ"
                                    />
                                </FloatingLabel>
                            </Col>
                            <Col md={4} lg={3}>
                                <FloatingLabel controlId="province" label="จังหวัด" className="mb-3" >
                                    <Form.Control
                                        isValid={inputForm && formData?.province !== ""}
                                        isInvalid={inputForm && formData?.province === ""}
                                        type="text"
                                        defaultValue={formData?.province || ""}
                                        onChange={(e) => handleInputChange("province", e.target.value)}
                                        placeholder="ระบุจังหวัด"
                                    />
                                </FloatingLabel>
                            </Col>
                            <Col md={4} lg={3}>
                                <FloatingLabel controlId="zipcode" label="รหัสไปรษณีย์" className="mb-3" >
                                    <Form.Control
                                        isValid={inputForm && formData?.zipcode !== ""}
                                        isInvalid={inputForm && formData?.zipcode === ""}
                                        type="text"
                                        defaultValue={formData?.zipcode || ""}
                                        onChange={(e) => handleInputChange("zipcode", e.target.value)}
                                        placeholder="ระบุรหัสไปรษณีย์"
                                    />
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <h5 className='mb-3 mt-4'>
                                    ติดต่อ
                                </h5>
                            </Col>
                            <Col md={4} lg={3}>
                                <FloatingLabel controlId="tel" label="เบอร์ติดต่อ" className="mb-3" >
                                    <Form.Control
                                        isValid={inputForm && formData?.tel !== ""}
                                        isInvalid={inputForm && formData?.tel === ""}
                                        type="text"
                                        defaultValue={formData?.tel || ""}
                                        onChange={(e) => handleInputChange("tel", e.target.value)}
                                        placeholder="ระบุเบอร์"
                                    />
                                </FloatingLabel>
                            </Col>
                            <Col md={4} lg={3}>
                                <FloatingLabel controlId="fax" label="fax" className="mb-3" >
                                    <Form.Control
                                        isValid={inputForm && formData?.fax !== ""}
                                        isInvalid={inputForm && formData?.fax === ""}
                                        type="text"
                                        defaultValue={formData?.fax || ""}
                                        onChange={(e) => handleInputChange("fax", e.target.value)}
                                        placeholder="ระบุ fax"
                                    />
                                </FloatingLabel>
                            </Col>
                            <Col md={4} lg={3}>
                                <FloatingLabel controlId="email" label="อีเมล" className="mb-3" >
                                    <Form.Control
                                        isValid={inputForm && formData?.email !== ""}
                                        isInvalid={inputForm && formData?.email === ""}
                                        type="text"
                                        defaultValue={formData?.email || ""}
                                        onChange={(e) => handleInputChange("email", e.target.value)}
                                        placeholder="ระบุอีเมล"
                                    />
                                </FloatingLabel>
                            </Col>
                            <Col md={4} lg={3}>
                                <FloatingLabel controlId="facebook" label="facebook" className="mb-3" >
                                    <Form.Control
                                        isValid={inputForm && formData?.facebook !== ""}
                                        isInvalid={inputForm && formData?.facebook === ""}
                                        type="text"
                                        defaultValue={formData?.facebook || ""}
                                        onChange={(e) => handleInputChange("facebook", e.target.value)}
                                        placeholder="ระบุfacebook"
                                    />
                                </FloatingLabel>
                            </Col>


                        </Row>
                    </Card.Body>
                    <Card.Footer className="text-end">
                        <Button variant="success mx-2" onClick={handleSubmit}>
                            ยืนยัน
                        </Button>
                        <Button variant="primary mx-2" onClick={reloadPage}>
                            ล้าง
                        </Button>
                    </Card.Footer>
                </Card>
            </div>
        </LayOut>
    );
};

export default UpdateContact;

