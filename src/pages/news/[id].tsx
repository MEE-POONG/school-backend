import React, { useEffect, useState } from "react";
import { News, News as PrismaNews, NewsType as PrismaNewsType } from '@prisma/client';
import useAxios from "axios-hooks";
import axios from 'axios';
import LayOut from "@/components/RootPage/TheLayOut";
import { Button, Card, Col, FloatingLabel, Form, FormLabel, Image, Row } from "react-bootstrap";
import LoadModal from "@/components/modal/LoadModal";
import moment from "moment";
import { useRouter } from "next/router";
// import { News } from "@prisma/client";


const NewsView: React.FC = (props) => {

    const router = useRouter();
    const { id } = router.query;

    const [formData, setFormData] = useState<News | null>();

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [{ data: NewsData, loading, error }, newsAPI] = useAxios('');

    useEffect(() => {
        const storedNewsItem = localStorage.getItem('currentNewsItem');
        if (storedNewsItem) {
            setFormData(JSON.parse(storedNewsItem));
            console.log("34 : ", JSON.parse(storedNewsItem));

            localStorage.removeItem('currentNewsItem'); // Clear the stored item
        } else if (id) {
            newsAPI({ url: `/api/News/${id}` }).then((response) => {
                console.log(response);
                setFormData(response.data);
            }).catch((error) => {
                console.error('Error fetching news:', error);
                // Handle error appropriately
            });
        }
    }, [id]);

    useEffect(() => {
        console.log("formData : ", formData);

    }, [formData]);






    const reloadPage = () => {
        window.location.reload();
    };

    const goBack = () => {
        window.history.back();
    };


    return (
        <LayOut>

            <div className='NewsPage'>
                <Card>
                    <LoadModal checkLoad={isLoading} status={"add"} detail={""} />
                    <Card.Header className="d-flex space-between">
                        <h4 className="mb-0 py-1">
                            {`ข่าว ${formData?.title}`}
                        </h4>
                        <div>
                            {/* <Button variant="success mx-2" onClick={handleSubmit}>
                ยืนยัน
              </Button>
              <Button variant="primary mx-2" onClick={reloadPage}>
                ล้าง
              </Button>
              <Button variant="danger mx-2" onClick={goBack}>
                กลับ
              </Button> */}
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
                                    {`วันเริ่ม ${formData?.startDate ? moment(formData.startDate).locale('th').format('HH:mm D MMMM YY') : ''} วันสิ้นสุด ${formData?.endDate ? moment(formData.endDate).locale('th').format('HH:mm D MMMM YY') : ''}`}
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
                                        defaultValue={formData?.subTitle || ""} />
                                </FloatingLabel>
                            </Col>
                            <Col md={12}>
                                <FloatingLabel controlId="floatingTextarea2" label="เนื้อหา">
                                    <Form.Control
                                        as="textarea"
                                        placeholder="Leave a comment here"
                                        style={{ height: '200px' }}
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
                        {/* <Button variant="success mx-2" onClick={handleSubmit}>
              ยืนยัน
            </Button>
            <Button variant="primary mx-2" onClick={reloadPage}>
              ล้าง
            </Button>
            <Button variant="danger mx-2" onClick={goBack}>
              กลับ
            </Button> */}
                    </Card.Footer>
                </Card>
            </div>
        </LayOut >
    );
}
export default NewsView;