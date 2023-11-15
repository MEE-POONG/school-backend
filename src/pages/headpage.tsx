// UpdateHeadPage.tsx
import React, { useEffect, useState } from 'react';
import useAxios from 'axios-hooks';
import { HeadPage } from '@prisma/client';
import { Button, Card, Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import LayOut from '@/components/RootPage/TheLayOut';
import Link from 'next/link';
import axios from 'axios';



const UpdateHeadPage: React.FC = (props) => {
    const [{ data: headPageData, loading, error }, refetch] = useAxios('/api/HeadPage');
    const [formData, setFormData] = useState<HeadPage | null>(null);
    const [imgOne, setImgOne] = useState<string | null>(null);
    const [imgTwo, setImgTwo] = useState<string | null>(null);
    const [imgThree, setImgThree] = useState<string | null>(null);

    const [alertForm, setAlertForm] = useState<string>("not");
    const [inputForm, setInputForm] = useState<boolean>(false);
    const [checkBody, setCheckBody] = useState<string>("");

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, setImage: React.Dispatch<React.SetStateAction<string | null>>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                const splittedString = base64String.split(",")[1];
                setImage(splittedString); // Update the state with the base64 image data
            };
            reader.readAsDataURL(file);
        }
    };

    // Initialize formData once headPageData is loaded
    useEffect(() => {
        if (headPageData && !formData) {
            console.log("Setting formData with: ", headPageData); // Diagnostic log
            setFormData(headPageData);
        }
    }, [headPageData]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData!, // Non-null assertion
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData) return;
        axios.post('/api/HeadPage', formData)
            .then(() => {
                refetch();
            })
            .catch((error: any) => console.error('Error updating HeadPage data:', error));
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <LayOut>
            <div className='herdpage-page'>
                <form onSubmit={handleSubmit}>
                    <Card>
                        <Card.Header className="d-flex space-between">
                            <h4 className="mb-0 py-1">
                                แก้ไขข้อมูล
                            </h4>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col md={6}>
                                    <FloatingLabel controlId="title" label="ระบุหัวข้อข่าว" className="mb-3" >
                                        <Form.Control
                                            isValid={inputForm && formData?.title !== ""}
                                            isInvalid={inputForm && formData?.title === ""}
                                            type="text"
                                            value={formData?.title || ""}
                                            onChange={handleInputChange}
                                            placeholder="ระบุหัวข้อ"
                                        />
                                    </FloatingLabel>
                                </Col>
                                <Col md={6}>
                                    <FloatingLabel controlId="subTitle" label="บทย่อ" className="mb-3" >
                                        <Form.Control
                                            isValid={inputForm && formData?.subTitle !== ""}
                                            isInvalid={inputForm && formData?.subTitle === ""}
                                            type="text"
                                            value={formData?.subTitle || ""}
                                            onChange={handleInputChange}
                                            placeholder="ระบุหัวข้อ"
                                        />
                                    </FloatingLabel>
                                </Col>
                                <Col md={12}>
                                    <FloatingLabel controlId="detail" label="ระบุหัวข้อข่าว" className="mb-3" >
                                        <Form.Control
                                            isValid={inputForm && formData?.detail !== ""}
                                            isInvalid={inputForm && formData?.detail === ""}
                                            as="textarea"
                                            value={formData?.detail || ""}
                                            style={{ height: '100px' }}
                                            onChange={handleInputChange}
                                            placeholder="ระบุหัวข้อ"
                                        />
                                    </FloatingLabel>
                                </Col>
                                <Col md={12}>
                                    <h5 className='mb-3 mt-4'>
                                        ปุ่มลิ้งเนื้อหา
                                    </h5>
                                </Col>
                                <Col md={6}>
                                    <FloatingLabel controlId="pathBtn" label="กำหนดปุ่ม" className="mb-3" >
                                        <Form.Control
                                            isValid={inputForm && formData?.pathBtn !== ""}
                                            isInvalid={inputForm && formData?.pathBtn === ""}
                                            type="text"
                                            value={formData?.pathBtn || ""}
                                            onChange={handleInputChange}
                                            placeholder="ระบุหัวข้อ"
                                        />
                                    </FloatingLabel>
                                </Col>
                                <Col md={6}>
                                    <FloatingLabel controlId="btnTitle" label="ระบุหัวข้อข่าว" className="mb-3" >
                                        <Form.Control
                                            isValid={inputForm && formData?.btnTitle !== ""}
                                            isInvalid={inputForm && formData?.btnTitle === ""}
                                            type="text"
                                            value={formData?.btnTitle || ""}
                                            onChange={handleInputChange}
                                            placeholder="ระบุหัวข้อ"
                                        />
                                    </FloatingLabel>
                                </Col>
                                <Col md={12}>
                                    <h5 className='mb-3 mt-4'>
                                        รูปประกอบ
                                    </h5>
                                </Col>
                                <Col md={4}>
                                    <FloatingLabel controlId="imgOne" label="รูปภาพ" className="mb-3">
                                        <Form.Control
                                            type="file"
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleFileUpload(event, setImgOne)}
                                        />
                                    </FloatingLabel>
                                    <div className='ratio ratio-16x9 bg-dark'>
                                        <img
                                            src={imgOne ? `data:image/jpeg;base64,${imgOne}` : formData?.imgOne ? `https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${formData.imgOne}/500` : `https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/4500f404-dbac-40f3-6696-ae768a38e800/500`}
                                            alt="Image One Preview"
                                            className="w-100"
                                            loading="lazy"
                                        />
                                    </div>
                                </Col>
                                <Col md={4}>
                                    <FloatingLabel controlId="imgTwo" label="รูปภาพ" className="mb-3">
                                        <Form.Control
                                            type="file"
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleFileUpload(event, setImgTwo)}
                                        />
                                    </FloatingLabel>
                                    <div className='ratio ratio-16x9 bg-dark'>
                                        <img
                                            src={imgTwo ? `data:image/jpeg;base64,${imgTwo}` : formData?.imgTwo ? `https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${formData.imgTwo}/500` : `https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/4500f404-dbac-40f3-6696-ae768a38e800/500`}
                                            alt="Image Two Preview"
                                            className="w-100"
                                            loading="lazy"
                                        />
                                    </div>
                                </Col>
                                <Col md={4}>
                                    <FloatingLabel controlId="imgThree" label="รูปภาพ" className="mb-3">
                                        <Form.Control
                                            type="file"
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleFileUpload(event, setImgThree)}
                                        />
                                    </FloatingLabel>
                                    <div className='ratio ratio-16x9 bg-dark'>
                                        <img
                                            src={imgThree ? `data:image/jpeg;base64,${imgThree}` : formData?.imgThree ? `https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${formData.imgThree}/500` : `https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/4500f404-dbac-40f3-6696-ae768a38e800/500`}
                                            alt="Image imgThree Preview"
                                            className="w-100"
                                            loading="lazy"
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                        <Card.Footer className="text-end">
                            <Button variant="success mx-2" onClick={handleSubmit}>
                                ยืนยัน
                            </Button>
                            {/* <Button variant="primary mx-2" onClick={reloadPage}>
              ล้าง
            </Button> */}
                        </Card.Footer>
                    </Card>
                </form>
            </div>
        </LayOut>
    );
};

export default UpdateHeadPage;

