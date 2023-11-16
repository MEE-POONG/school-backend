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
    const [imgOne, setImgOne] = useState<File | null>(null);
    const [imgTwo, setImgTwo] = useState<File | null>(null);
    const [imgThree, setImgThree] = useState<File | null>(null);

    const [imgOnePreview, setImgOnePreview] = useState<string | null>(null);
    const [imgTwoPreview, setImgTwoPreview] = useState<string | null>(null);
    const [imgThreePreview, setImgThreePreview] = useState<string | null>(null);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [alertForm, setAlertForm] = useState<string>("not");
    const [inputForm, setInputForm] = useState<boolean>(false);
    const [checkBody, setCheckBody] = useState<string>("");

    // Initialize formData once headPageData is loaded
    useEffect(() => {
        if (headPageData && !formData) {
            setFormData(headPageData);
        }
    }, [headPageData]);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData!, // Non-null assertion
            [e.target.name]: e.target.defaultValue,
        });
    };

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, setImage: React.Dispatch<React.SetStateAction<File | null>>, setPreview: React.Dispatch<React.SetStateAction<string | null>>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                const splittedString = base64String.split(",")[1];
                setPreview(splittedString); // Update the state with the base64 image data
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        let imageIdOne = null;
        let imageIdTwo = null;
        let imageIdThree = null;

        if (imgOne) {
            const uploadFormData = new FormData();
            uploadFormData.append("file", imgOne);

            try {
                const uploadResponse = await axios.post(
                    "https://upload-image.me-prompt-technology.com/",
                    uploadFormData
                );

                if (uploadResponse?.status === 200) {
                    imageIdOne = uploadResponse?.data?.result?.id;
                    setFormData({
                        ...formData!, // Non-null assertion
                        imgOne: imageIdOne,
                    });
                }
            } catch (error) {
                console.error("Upload failed: ", error);
            }
        }
        if (imgTwo) {
            const uploadFormData = new FormData();
            uploadFormData.append("file", imgTwo);

            try {
                const uploadResponse = await axios.post(
                    "https://upload-image.me-prompt-technology.com/",
                    uploadFormData
                );

                if (uploadResponse?.status === 200) {
                    imageIdTwo = uploadResponse?.data?.result?.id;
                    setFormData({
                        ...formData!, // Non-null assertion
                        imgTwo: imageIdTwo,
                    });
                }
            } catch (error) {
                console.error("Upload failed: ", error);
            }
        }
        if (imgThree) {
            const uploadFormData = new FormData();
            uploadFormData.append("file", imgThree);

            try {
                const uploadResponse = await axios.post(
                    "https://upload-image.me-prompt-technology.com/",
                    uploadFormData
                );

                if (uploadResponse?.status === 200) {
                    imageIdThree = uploadResponse?.data?.result?.id;
                    setFormData({
                        ...formData!, // Non-null assertion
                        imgThree: imageIdThree,
                    });
                }
            } catch (error) {
                console.error("Upload failed: ", error);
            }
        }

        submitFormData();


    };

    const submitFormData = async () => {
        console.log(131);
        
        try {
            const response = await axios.put('/api/HeadPage', formData, {
                headers: {
                    'Content-Type': 'application/json' // or 'multipart/form-data' if sending files
                }
            });
            console.log('Form data submitted successfully:', response.data);
            // Additional logic on successful submission
        } catch (error) {
            console.error('Failed to submit form data:', error);
            // Error handling
        }
    };
    // if (isLoading || loading) return <div>Loading...</div>;
    // if (error) return <div>Error: {error.message}</div>;

    return (
        <LayOut>
            <div className='herdpage-page'>
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
                                        defaultValue={formData?.title || ""}
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
                                        defaultValue={formData?.subTitle || ""}
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
                                        defaultValue={formData?.detail || ""}
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
                                        defaultValue={formData?.pathBtn || ""}
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
                                        defaultValue={formData?.btnTitle || ""}
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
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleFileUpload(event, setImgOne, setImgOnePreview)}
                                    />
                                </FloatingLabel>
                                <div className='ratio ratio-16x9 bg-dark'>
                                    <img
                                        src={imgOnePreview ? `data:image/jpeg;base64,${imgOnePreview}` : formData?.imgOne ? `https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${formData.imgOne}/500` : `https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/4500f404-dbac-40f3-6696-ae768a38e800/500`}
                                        alt="Image Two Preview"
                                        className="w-100 object-fit-contain"
                                        loading="lazy"
                                    />
                                </div>
                            </Col>
                            <Col md={4}>
                                <FloatingLabel controlId="imgTwo" label="รูปภาพ" className="mb-3">
                                    <Form.Control
                                        type="file"
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleFileUpload(event, setImgTwo, setImgTwoPreview)}
                                    />
                                </FloatingLabel>
                                <div className='ratio ratio-16x9 bg-dark'>
                                    <img
                                        src={imgTwoPreview ? `data:image/jpeg;base64,${imgTwoPreview}` : formData?.imgTwo ? `https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${formData.imgTwo}/500` : `https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/4500f404-dbac-40f3-6696-ae768a38e800/500`}
                                        alt="Image Two Preview"
                                        className="w-100 object-fit-contain"
                                        loading="lazy"
                                    />
                                </div>
                            </Col>
                            <Col md={4}>
                                <FloatingLabel controlId="imgThree" label="รูปภาพ" className="mb-3">
                                    <Form.Control
                                        type="file"
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleFileUpload(event, setImgThree, setImgThreePreview)}
                                    />
                                </FloatingLabel>
                                <div className='ratio ratio-16x9 bg-dark'>
                                    <img
                                        src={imgThreePreview ? `data:image/jpeg;base64,${imgThreePreview}` : formData?.imgThree ? `https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${formData.imgThree}/500` : `https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/4500f404-dbac-40f3-6696-ae768a38e800/500`}
                                        alt="Image Two Preview"
                                        className="w-100 object-fit-contain"
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
            </div>
        </LayOut>
    );
};

export default UpdateHeadPage;

