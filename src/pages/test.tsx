// UpdateHeadPage.tsx
import React, { useEffect, useState } from 'react';
import useAxios from 'axios-hooks';
import { HeadPage } from '@prisma/client';
import { Button, Card, Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import LayOut from '@/components/RootPage/TheLayOut';
import Link from 'next/link';
import axios from 'axios';



const TestPage: React.FC = (props) => {
    const [imgOne, setImgOne] = useState<File | null>(null);
    const [imgTwo, setImgTwo] = useState<File | null>(null);
    const [imgThree, setImgThree] = useState<File | null>(null);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, setImage: React.Dispatch<React.SetStateAction<File | null>>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        const images = [imgOne, imgTwo, imgThree];
        images.forEach(async (image) => {
            if (image) {
                const formData = new FormData();
                formData.append("file", image);
                const uploadResponse = await axios.post(
                    "https://upload-image.me-prompt-technology.com/",
                    formData
                );
                if (uploadResponse.status === 200) {
                    console.log("Upload status: ", uploadResponse.status);
                }
            }
        });
    };

    return (
        <LayOut>
            <div className='herdpage-page'>
                <form>
                    <Card>
                        <Card.Header className="d-flex space-between">
                            <h4 className="mb-0 py-1">แก้ไขข้อมูล</h4>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                {/* Repeat this block for imgTwo and imgThree */}
                                <Col md={4}>
                                    <FloatingLabel controlId="imgOne" label="รูปภาพ" className="mb-3">
                                        <Form.Control
                                            type="file"
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleFileUpload(event, setImgOne)}
                                        />
                                    </FloatingLabel>
                                    <div className='ratio ratio-16x9 bg-dark'>
                                        {/* <img
                                            src={imgOne || `https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/4500f404-dbac-40f3-6696-ae768a38e800/500`}
                                            alt="Image One Preview"
                                            className="w-100 object-fit-contain"
                                            loading="lazy"
                                        /> */}
                                    </div>
                                </Col>
                                <Col md={4}>
                                    <FloatingLabel controlId="imgOne" label="รูปภาพ" className="mb-3">
                                        <Form.Control
                                            type="file"
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleFileUpload(event, setImgTwo)}
                                        />
                                    </FloatingLabel>
                                    <div className='ratio ratio-16x9 bg-dark'>
                                        {/* <img
                                            src={imgTwo || `https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/4500f404-dbac-40f3-6696-ae768a38e800/500`}
                                            alt="Image One Preview"
                                            className="w-100 object-fit-contain"
                                            loading="lazy"
                                        /> */}
                                    </div>
                                </Col>
                                <Col md={4}>
                                    <FloatingLabel controlId="imgOne" label="รูปภาพ" className="mb-3">
                                        <Form.Control
                                            type="file"
                                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleFileUpload(event, setImgThree)}
                                        />
                                    </FloatingLabel>
                                    <div className='ratio ratio-16x9 bg-dark'>
                                        {/* <img
                                            src={imgThree || `https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/4500f404-dbac-40f3-6696-ae768a38e800/500`}
                                            alt="Image One Preview"
                                            className="w-100 object-fit-contain"
                                            loading="lazy"
                                        /> */}
                                    </div>
                                </Col>
                                {/* ... */}
                            </Row>
                        </Card.Body>
                        <Card.Footer className="text-end">
                            <Button variant="success mx-2" onClick={handleSubmit}>
                                ยืนยัน
                            </Button>
                            {/* Additional buttons if needed */}
                        </Card.Footer>
                    </Card>
                </form>
            </div>
        </LayOut>
    );
};

export default TestPage;

