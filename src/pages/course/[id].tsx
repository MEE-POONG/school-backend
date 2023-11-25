import React, { useEffect, useState } from "react";
import { CourseGroup as PrismaCourseGroup, CourseList as PrismaCourseList } from '@prisma/client';
import useAxios from "axios-hooks";
import axios from 'axios';
import LayOut from "@/components/RootPage/TheLayOut";
import { Button, Card, Col, FloatingLabel, Form, FormLabel, Image, Row, Table } from "react-bootstrap";
import { useRouter } from "next/router";
import DeleteModal from "@/components/modal/DeleteModal";
import Link from "next/link";
import { FaPager, FaPen } from "react-icons/fa";
import CourseList from "@/container/Course/list";

interface CourseList extends PrismaCourseList {
}
interface CourseGroup extends PrismaCourseGroup {
}

interface Params {
    page: number;
    pageSize: number;
    search: string;
    totalPages: number;
}

const CourseView: React.FC = (props) => {
    const router = useRouter();
    const [params, setParams] = useState<Params>({
        page: 1,
        pageSize: 10,
        search: "",
        totalPages: 1,
    });

    const { id } = router.query;
    const [formData, setFormData] = useState<CourseGroup | null>();

    const [{ data, loading, error }, courseGroupAPI] = useAxios('');
    useEffect(() => {
        // setFormData(data);
        if (id) {
            courseGroupAPI({ url: `/api/CourseGroup/${id}` }).then((response) => {
                setFormData(response.data);
            }).catch((error) => {
                console.error('Error fetching news:', error);
            });
        }
    }, [id]);


    return (
        <LayOut>

            <div className='CoursePage'>
                <Card>
                    <Card.Header className="d-flex space-between">
                        <h4 className="mb-0 py-1">
                            {`คณะ ${formData?.nameTH}`}
                        </h4>
                        <div>
                            <Link href={`/course/edit/${id}`} className="btn btn-warning mx-2" >
                                แก้ไข
                            </Link>

                            <Link href={'/course'} className="btn btn-danger mx-2" >
                                กลับรายการคณะ
                            </Link>
                        </div>
                    </Card.Header>
                    <Card.Body className="overflow-x-hidden">
                        <Row>
                            <Col md={6}>
                                <FloatingLabel controlId="nameTH" label="ระบุหัวข้อข่าว" className="mb-3" >
                                    <Form.Control
                                        // isValid={inputForm && formData?.nameTH !== ""}
                                        // isInvalid={inputForm && !formData?.nameTH}
                                        type="text"
                                        defaultValue={formData?.nameTH || ""}
                                        // onChange={(e) => handleInputChange("nameTH", e.target.value)}
                                        placeholder="ระบุหัวข้อ"
                                        readOnly
                                    />
                                </FloatingLabel>
                                <FloatingLabel controlId="nameEN" label="ระบุหัวข้อข่าว" className="mb-3" >
                                    <Form.Control
                                        // isValid={inputForm && formData?.nameEN !== ""}
                                        // isInvalid={inputForm && !formData?.nameEN}
                                        type="text"
                                        defaultValue={formData?.nameEN || ""}
                                        // onChange={(e) => handleInputChange("nameEN", e.target.value)}
                                        placeholder="ระบุหัวข้อ"
                                        readOnly
                                    />
                                </FloatingLabel>
                            </Col>
                            <Col md={6}>
                                <div className='ratio img-preview ratio-16x9 bg-dark'>
                                    <Image
                                        src={formData?.img ? `https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${formData.img}/500` : `https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/4500f404-dbac-40f3-6696-ae768a38e800/500`}
                                        alt="Image Two Preview"
                                        className="w-100 object-fit-contain"
                                        loading="lazy"
                                    />
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                    <CourseList />
                    <Card.Footer className="text-end">
                        <Link href={`/course/edit/${id}`} className="btn btn-warning mx-2" >
                            แก้ไข
                        </Link>

                        <Link href={'/course'} className="btn btn-danger mx-2" >
                            กลับรายการคณะ
                        </Link>
                    </Card.Footer>
                </Card>
            </div>
        </LayOut >
    );
}
export default CourseView;