// UpdateHeadPage.tsx
import React, { useEffect, useState } from 'react';
import useAxios from 'axios-hooks';
import { About } from '@prisma/client';
import { Button, Card, Col, FloatingLabel, Form, FormLabel, Row } from 'react-bootstrap';
import LayOut from '@/components/RootPage/TheLayOut';
import axios from 'axios';
import LoadModal from '@/components/modal/LoadModal';

const UpdateHeadPage: React.FC = (props) => {
    const [{ data: headPageData, loading, error }, refetch] = useAxios('/api/About');
    const [formData, setFormData] = useState<About | null>(null);
    const [imgOne, setImgOne] = useState<File | null>(null);
    const [imgTwo, setImgTwo] = useState<File | null>(null);
    const [imgThree, setImgThree] = useState<File | null>(null);

    const [imgOnePreview, setImgOnePreview] = useState<string | null>(null);
    const [imgTwoPreview, setImgTwoPreview] = useState<string | null>(null);
    const [imgThreePreview, setImgThreePreview] = useState<string | null>(null);

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [inputForm, setInputForm] = useState<boolean>(false);

    useEffect(() => {
        if (headPageData && !formData) {
            setFormData(headPageData);
        }
    }, [headPageData]);

    const handleInputChange = (title: string, value: any) => {
        setFormData((prev: any) => ({
            ...prev,
            [title]: value
        }));
    }

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
    const deleteImage = async (imageId: string) => {
        try {
            await axios.delete(`https://upload-image.me-prompt-technology.com/?name=${imageId}`);
        } catch (error) {
            console.error("Delete failed: ", error);
        }
    };
    const uploadImage = async (img: any, image: any) => {
        const uploadFormData = new FormData();
        uploadFormData.append("file", image);
        try {
            const uploadResponse = await axios.post(
                "https://upload-image.me-prompt-technology.com/",
                uploadFormData
            );

            if (uploadResponse?.status === 200) {
                deleteImage(img);
                return uploadResponse?.data?.result?.id;
            }
        } catch (error) {
            console.error("Upload failed: ", error);
        }
        return null;
    };

    const reloadPage = () => {
        window.location.reload();
    };

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setIsLoading(true);
        setInputForm(true);
        const imageIDs = await Promise.all([
            imgOne ? uploadImage(formData?.img, imgOne) : null,
            imgTwo ? uploadImage(formData?.logo, imgTwo) : null,
            imgThree ? uploadImage(formData?.personChart, imgThree) : null
        ]);

        try {
            const response = await refetch({
                url: `/api/About/${formData?.id}`,
                method: "PUT",
                data: {
                    id: formData?.id,
                    title: formData?.title,
                    subTitle: formData?.subTitle,
                    detail: formData?.detail,
                    detailTo: formData?.detailTo,
                    StudyingCount: formData?.StudyingCount,
                    img: imageIDs[0] !== null ? imageIDs[0] : formData?.img,
                    logo: imageIDs[1] !== null ? imageIDs[1] : formData?.logo,
                    personChart: imageIDs[2] !== null ? imageIDs[2] : formData?.personChart,
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
                            แก้ไขข้อมูล Header
                        </h4>
                    </Card.Header>
                    <Card.Body className="overflow-hidden">
                        <Row>
                            <Col md={5}>
                                <FloatingLabel controlId="title" label="ระบุหัวข้อข่าว" className="mb-3" >
                                    <Form.Control
                                        isValid={inputForm && formData?.title !== ""}
                                        isInvalid={inputForm && formData?.title === ""}
                                        type="text"
                                        defaultValue={formData?.title || ""}
                                        onChange={(e) => handleInputChange("title", e.target.value)}
                                        placeholder="ระบุหัวข้อ"
                                    />
                                </FloatingLabel>
                            </Col>
                            <Col md={5}>
                                <FloatingLabel controlId="subTitle" label="บทย่อ" className="mb-3" >
                                    <Form.Control
                                        isValid={inputForm && formData?.subTitle !== ""}
                                        isInvalid={inputForm && formData?.subTitle === ""}
                                        type="text"
                                        defaultValue={formData?.subTitle || ""}
                                        onChange={(e) => handleInputChange("subTitle", e.target.value)}
                                        placeholder="ระบุหัวข้อ"
                                    />
                                </FloatingLabel>
                            </Col>
                            <Col md={2}>
                                <FloatingLabel controlId="StudyingCount" label="ยอดเข้าเรียน" className="mb-3" >
                                    <Form.Control
                                        isValid={inputForm && formData?.StudyingCount !== undefined}
                                        type="text"
                                        defaultValue={formData?.StudyingCount || ""}
                                        onChange={(e) => handleInputChange("StudyingCount", e.target.value)}
                                        placeholder="ยอดเข้าศึกษา"
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
                                        onChange={(e) => handleInputChange("detail", e.target.value)}
                                        placeholder="ระบุหัวข้อ"
                                    />
                                </FloatingLabel>
                            </Col>
                            <Col md={12}>
                                <FloatingLabel controlId="detailTo" label="ระบุหัวข้อข่าว" className="mb-3" >
                                    <Form.Control
                                        isValid={inputForm && formData?.detailTo !== ""}
                                        isInvalid={inputForm && formData?.detailTo === ""}
                                        as="textarea"
                                        defaultValue={formData?.detailTo || ""}
                                        style={{ height: '100px' }}
                                        onChange={(e) => handleInputChange("detailTo", e.target.value)}
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
                                <FormLabel>รูปภาพเกี่ยวกัวเรา</FormLabel>
                                <FloatingLabel controlId="img" label="รูปภาพเกี่ยวกัวเรา" className="mb-3">
                                    <Form.Control
                                        type="file"
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleFileUpload(event, setImgOne, setImgOnePreview)}
                                    />
                                </FloatingLabel>
                                <div className='ratio ratio-16x9 bg-dark'>
                                    <img
                                        src={imgOnePreview ? `data:image/jpeg;base64,${imgOnePreview}` : formData?.img ? `https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${formData.img}/500` : `https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/4500f404-dbac-40f3-6696-ae768a38e800/500`}
                                        alt="Image Two Preview"
                                        className="w-100 object-fit-contain"
                                        loading="lazy"
                                    />
                                </div>
                            </Col>
                            <Col md={4}>
                                <FormLabel>โลโก้</FormLabel>
                                <FloatingLabel controlId="imgTwo" label="โลโก้" className="mb-3">
                                    <Form.Control
                                        type="file"
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleFileUpload(event, setImgTwo, setImgTwoPreview)}
                                    />
                                </FloatingLabel>
                                <div className='ratio ratio-16x9 bg-dark'>
                                    <img
                                        src={imgTwoPreview ? `data:image/jpeg;base64,${imgTwoPreview}` : formData?.logo ? `https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${formData.logo}/500` : `https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/4500f404-dbac-40f3-6696-ae768a38e800/500`}
                                        alt="Image Two Preview"
                                        className="w-100 object-fit-contain"
                                        loading="lazy"
                                    />
                                </div>
                            </Col>
                            <Col md={4}>
                                <FormLabel>ผังบุคคลกร</FormLabel>
                                <FloatingLabel controlId="imgThree" label="ผังบุคคลกร" className="mb-3">
                                    <Form.Control
                                        type="file"
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleFileUpload(event, setImgThree, setImgThreePreview)}
                                    />
                                </FloatingLabel>
                                <div className='ratio ratio-16x9 bg-dark'>
                                    <img
                                        src={imgThreePreview ? `data:image/jpeg;base64,${imgThreePreview}` : formData?.personChart ? `https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${formData.personChart}/500` : `https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/4500f404-dbac-40f3-6696-ae768a38e800/500`}
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
                        <Button variant="primary mx-2" onClick={reloadPage}>
                            ล้าง
                        </Button>
                    </Card.Footer>
                </Card>
            </div>
        </LayOut>
    );
};

export default UpdateHeadPage;

