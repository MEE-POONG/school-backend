
import React, { useState, useEffect, useRef } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { FaUserNinja } from "react-icons/fa";
import { RegisterForm } from "@prisma/client";
import { useReactToPrint } from 'react-to-print';


export default function ProfileDetailModal(props: { data: any }) {
  const conponentPDF = useRef<HTMLDivElement>(null);  
  const [showCheck, setShowCheck] = useState(false);
  const handleShow = () => setShowCheck(true);
  const handleClose = () => setShowCheck(false);

  const generatePDF = useReactToPrint({
    content: () => conponentPDF.current!,
    documentTitle: "Userdata",
    onAfterPrint: () => alert("Data saved in PDF")
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


      <Modal show={showCheck} onHide={handleClose} centered size="xl">
        <Modal.Header closeButton>
          <Modal.Title>
            รายละเอียด คุณ : {props?.data?.regName + " " + props?.data?.regLastname}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div ref={conponentPDF} style={{ width:'595px',height:'842px'}}>
          

          <div className="container">
         <div className="p-4">
          <Row>
            <Col><img className="md:justify-center"src={`https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${props?.data?.regImg}/500`} alt=""width={200} height={250} /></Col>
          </Row>
          <h3 className="py-2">รายละเอียดข้อมูล</h3>
            <h4>ข้อมูลผู้สมัคร</h4>
      <Row className="py-2">
        <Col xs={5}>ชื่อ:{props?.data?.regPrefix} {props?.data?.regName} {props?.data?.regLastname}</Col>
        <Col xs={5}>Name:{props?.data?.regEname} {props?.data?.regElastname}</Col>
        <Col className=" mt-2" xs={7}>บัตรประจำตัวประชาชน:{props?.data?.regIdpersonal}</Col> 
      </Row>
      <Row className="py-2">
        <Col xs={3} >วัน/เดือน/ปีเกิด: {props?.data?.regBirth} </Col>
        <Col xs={2}>เพศ:{props?.data?.regSex}</Col>
        <Col xs={3}>สัญชาติ: {props?.data?.regNation}</Col>
        <Col xs={4}>เบอร์โทรศัพท์: {props?.data?.regPhone} </Col>
       <Row className="py-2"><Col>Email: {props?.data?.regEmail}</Col></Row>
      </Row>
    
    <h4>ประวัติการศึกษา</h4>
            
      <Row className="py-2">
        <Col xs={4}>สถาบันการศึกษา: {props?.data?.regSchool}</Col>
        <Col xs={5}> สำเร็จการศึกษาระดับ: {props?.data?.regDegree}</Col>
        <Row><Col>เกรดเฉลี่ย: {props?.data?.regGpa}</Col></Row>
      </Row>
      <h4>คณะ/สาขา</h4>
            
            <Row className="py-2">
              <Col xs={2}>หลักสูตร: {props?.data?.regProgram}</Col> 
              <Col xs={4}>คณะ: {props?.data?.regFaculty}</Col>
              <Row className="py-2"><Col>สาขา: {props?.data?.regMajor}</Col></Row>
            </Row>
            </div>
            </div>
      </div>
            {/* <p >คำนำหน้าชื่อ: {props?.data?.regPrefix}</p>
            <p>ชื่อ: {props?.data?.regName}</p>
            <p>นามสกุล: {props?.data?.regLastname}</p>
            <p>Name: {props?.data?.regEname}</p>
            <p>Surname: {props?.data?.regElastname}</p>
            <p>บัตรประจำตัวประชาชน: {props?.data?.regIdpersonal}</p>
            <p>วัน/เดือน/ปีเกิด: {props?.data?.regBirth}</p>
            <p>เพศ: {props?.data?.regSex}</p>
            <p>สัญชาติ: {props?.data?.regNation}</p>
            <p>เบอร์โทรศัพท์ติดต่อ: {props?.data?.regPhone}</p>
            <p>Email: {props?.data?.regEmail}</p> */}

           
            {/* <h4>ประวัติการศึกษา</h4>
            <p>สถาบันการศึกษา: {props?.data?.regSchool}</p>
            <p>สำเร็จการศึกษาระดับ: {props?.data?.regDegree}</p>
            <p>เกรดเฉลี่ย: {props?.data?.regGpa}</p> */}

            {/* <h4>คณะ/สาขา</h4>
            <p>หลักสูตร: {props?.data?.regProgram}</p>
            <p>คณะ: {props?.data?.regFaculty}</p>
            <p>สาขา: {props?.data?.regMajor}</p> */}
             <div className="d-grid d-md-flex justify-content-md-end mb-3">
                            <button className="btn btn-success" onClick={generatePDF}>PDF</button>
                        </div>

         

        </Modal.Body>
      </Modal>

    </>
  )
}