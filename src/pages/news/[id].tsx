import React, { useEffect, useState } from "react";
import { News } from '@prisma/client';
import useAxios from "axios-hooks";
import axios from 'axios';
import LayOut from "@/components/RootPage/TheLayOut";
import { Card, Col, FloatingLabel, Form, FormLabel, Image, Row } from "react-bootstrap";
import { useRouter } from "next/router";
import { ReFormatDate } from "@/control/ReFormatDate";
import Link from "next/link";
// import { News } from "@prisma/client";


const NewsView: React.FC = (props) => {
    const router = useRouter();
    const { id } = router.query;
    const [formData, setFormData] = useState<News | null>();
    const [{ data: NewsData, loading, error }, newsAPI] = useAxios('');

    useEffect(() => {
        const storedNewsItem = localStorage.getItem('currentNewsItem');
        if (storedNewsItem) {
            setFormData(JSON.parse(storedNewsItem));

            localStorage.removeItem('currentNewsItem'); // Clear the stored item
        } else if (id) {
            newsAPI({ url: `/api/News/${id}` }).then((response) => {
                setFormData(response.data);
            }).catch((error) => {
                console.error('Error fetching news:', error);
            });
        }
    }, [id]);


    return (
        <LayOut>

            <div className='NewsPage'>
                <Card>
                    <Card.Header className="d-flex space-between">
                        <h4 className="mb-0 py-1">
                            {`ข่าว ${formData?.title}`}
                        </h4>
                        <div>
                            <Link href={`/news/edit/${id}`} className="btn btn-warning mx-2" >
                                แก้ไข
                            </Link>

                            <Link href={'/news'} className="btn btn-danger mx-2" >
                                กลับรายการข่าว
                            </Link>
                        </div>
                    </Card.Header>
                    <Card.Body className="overflow-x-hidden">
                        <Row>
                            <Col md={4}>
                                <Form.Label >
                                    {`ประเภท : ${formData?.type}`}
                                </Form.Label>
                            </Col>
                            <Col md={4}>
                                <Form.Label >
                                    {formData?.startDate ? `วันเริ่ม : ${ReFormatDate(formData.startDate, "TH")}` : 'วันเริ่ม : - '}{formData?.endDate ? ` สิ้นสุด : ${ReFormatDate(formData.endDate, "TH")}` : 'สิ้นสุด : -'}

                                </Form.Label>
                            </Col>
                            <Col md={12}>
                                <FloatingLabel
                                    controlId="floatingTextarea"
                                    label="สคริปย่อ"
                                    className="mb-3"
                                >
                                    <Form.Control as="textarea" placeholder="Leave a comment here"
                                        style={{ height: '100px' }}
                                        readOnly
                                        defaultValue={formData?.subTitle || ""} />
                                </FloatingLabel>
                            </Col>
                            <Col md={12}>
                                <FloatingLabel controlId="floatingTextarea2" label="เนื้อหา" className="mb-3">
                                    <Form.Control
                                        as="textarea"
                                        placeholder="Leave a comment here"
                                        style={{ height: '200px' }}
                                        readOnly
                                        defaultValue={formData?.detail || ""}
                                    />
                                </FloatingLabel>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={5}>
                                <FormLabel>รูปปก</FormLabel>
                                <div className='ratio img-preview ratio-16x9 bg-dark'>
                                    <Image
                                        src={`https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${formData?.img ? formData?.img : `4500f404-dbac-40f3-6696-ae768a38e800`}/500`}
                                        alt="Image Two Preview"
                                        className="w-100 object-fit-contain"
                                        loading="lazy"
                                    />
                                </div>
                            </Col>
                            <Col md={7}>
                                <FormLabel>รูปโปรโมท</FormLabel>
                                <div className='ratio img-preview ratio-21x9 bg-dark'>
                                    <Image
                                        src={`https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${formData?.promoteImg ? formData?.promoteImg : `4500f404-dbac-40f3-6696-ae768a38e800`}/500`}
                                        alt="Image Two Preview"
                                        className="w-100 object-fit-contain"
                                        loading="lazy"
                                    />
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                    <Card.Footer className="text-end">
                        <Link href={`/news/edit/${id}`} className="btn btn-warning mx-2" >
                            แก้ไข
                        </Link>

                        <Link href={'/news'} className="btn btn-danger mx-2" >
                            กลับรายการข่าว
                        </Link>
                    </Card.Footer>
                </Card>
            </div>
        </LayOut >
    );
}
export default NewsView;