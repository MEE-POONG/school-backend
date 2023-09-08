
import React, { useState, useEffect, useRef } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { FaNewspaper } from "react-icons/fa";
import { RegisterForm } from "@prisma/client";
import { useReactToPrint } from 'react-to-print';
import ActivityAdd from '../addActivity';


export default function ViewDetail(props: { data: any }) {
    const conponentPDF = useRef<HTMLDivElement>(null);
    const [showCheck, setShowCheck] = useState(false);
    const handleShow = () => setShowCheck(true);
    const handleClose = () => setShowCheck(false);

    const generatePDF = useReactToPrint({
        content: () => conponentPDF.current!,
        documentTitle: "Userdata",
        // onAfterPrint: () => alert("Data saved in PDF")
    });
    return (
        <>
            <Button
                bsPrefix="create"
                className={`btn icon ${showCheck ? "active" : " "} `}
                onClick={handleShow}
            >
                <FaNewspaper />
                <span className="h-tooltiptext">ดูรายละเอียด</span>
            </Button>


            <Modal show={showCheck} onHide={handleClose} centered size="xl">
                <Modal.Header closeButton>
                    <Modal.Title>
                        รายละเอียดข่าว : {props?.data?.activityName}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>


                        <div className="container">
                            <div className="my-2">
                                <h4 className="">ชื่อข่าว : {props?.data?.activityName} </h4>
                                <h4 className="my-2">หัวข้อข่าว : {props?.data?.activityTitle} </h4>
                                <Row className="my-2">
                                    <img className="my-2" src={`https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${props?.data?.activityImg}/500`} alt="newImg" />
                                </Row>
                                <h4>หัวข้อย่อยข่าว : {props?.data?.activitySubTitle} </h4>
                                <h4 className="my-2">รายละเอียดข่าว :</h4>

                                <p>
                                    {props?.data?.activitySubDetail}
                                </p>



                            </div>
                        </div>
                    </div>

                    {/* <div className="d-grid d-md-flex justify-content-md-end mb-3">
                        <button className="btn btn-success" onClick={generatePDF}>สั่งพิมพ์</button>
                    </div> */}



                </Modal.Body>
            </Modal>

        </>
    )
}