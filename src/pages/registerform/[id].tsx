
import React, { useState, useRef } from "react";
import { Button, Col, Modal, Row, } from 'react-bootstrap';
import { FaUserNinja } from "react-icons/fa";
import { useReactToPrint } from 'react-to-print';


export default function ProfileDetailModal(props: { data: any }) {
  const componentPDF = useRef<HTMLDivElement>(null);
  const [showCheck, setShowCheck] = useState(false);
  const handleShow = () => setShowCheck(true);
  const handleClose = () => setShowCheck(false);

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current!,
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
        <FaUserNinja />
        <span className="h-tooltiptext">ดูรายละเอียด</span>
      </Button>


      <Modal show={showCheck} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title >
            <h5>รายละเอียด คุณ : {props?.data?.nameTh + " " + props?.data?.lastnameTh}</h5>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className=" overflow-x-scroll ">
          <div ref={componentPDF} >
            <div className="regisform">
              <div className="px-2 py-4 mt-3">
                <div className="row">
                  <Row>
                    <Col xs={10} >
                      <img className="logo-pmc" src="./images/Logo.png" alt="" />
                      <span className="title">ข้อมูลของผู้สมัครเรียนต่อระดับปริญญาตรี</span>
                    </Col>
                    <Col xs={2}>
                    </Col>
                  </Row>
                  <div className="col-sm my-auto mt-3">
                    <h6 className="border-bottom border-info">ส่วนที่ 1 ข้อมูลผู้สมัคร</h6>
                    <div className="">
                      <div className="detail">
                        ชื่อ:&nbsp;&nbsp;{props?.data?.prefix} {props?.data?.nameTh} {props?.data?.lastnameTh}
                        <span className="mx-3">Name:&nbsp;&nbsp;{props?.data?.nameEng} {props?.data?.lastnameEng}</span>
                      </div>
                      <div className="detail">
                        บัตรประจำตัวประชาชน:&nbsp;&nbsp;{props?.data?.personalID}
                      </div>
                      <div className="detail">
                        วัน/เดือน/ปีเกิด:&nbsp;{props?.data?.birth}
                        <span className="mx-3">เพศ:&nbsp;{props?.data?.sex}</span>
                        <span> สัญชาติ:&nbsp;{props?.data?.nation}</span>
                      </div>
                      <div className="detail">เบอร์โทรศัพท์:&nbsp;{props?.data?.phone}</div>
                      <div className="detail">Email:&nbsp;{props?.data?.email}</div>
                    </div>
                  </div>

                  <div >
                    <h6 className="mt-4 border-bottom border-info">ส่วนที่ 2 ประวัติการศึกษา</h6>
                    <div className="detail">สถาบันการศึกษา: {props?.data?.oldSchool}</div>
                    <div className="detail"> สำเร็จการศึกษาระดับ: {props?.data?.degree}</div>
                    <div className="detail"> เกรดเฉลี่ย: {props?.data?.gpa}</div>
                  </div>

                  <div>
                    <h6 className="mt-4 border-bottom border-info">ส่วนที่ 3 หลักสูตรที่สมัคร</h6>
                    <div className="detail">หลักสูตร: {props?.data?.program}</div>
                    <div className="detail">คณะ: {props?.data?.faculty}</div>
                    <div className="detail"> สาขา: {props?.data?.major}</div>
                  </div>

                </div>

              </div>
            </div>
          </div>

          <div className="d-grid d-md-flex justify-content-md-end mb-3">
            <button className="btn btn-success" onClick={generatePDF}>สั่งพิมพ์</button>
          </div>

        </Modal.Body>
      </Modal>

    </>
  )
}