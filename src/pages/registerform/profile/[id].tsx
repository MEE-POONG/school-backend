

import { useState } from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import { FaUserNinja } from "react-icons/fa";
import { RegisterForm } from "@prisma/client";


export default function ProfileDetailModal(props: { data: any }) {
  const [showCheck, setShowCheck] = useState(false);
  const handleShow = () => setShowCheck(true);
  const handleClose = () => setShowCheck(false);
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
          <Row>
            <Col md={{ span: 1, offset: 8 }}><img className="" src={`https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${props?.data?.regImg}/500`} alt=""width={200} height={250} /></Col>
          </Row>

          <h2 className="">รายละเอียดข้อมูล</h2>

          <div className="p-4">
            <h4>ข้อมูลผู้สมัคร</h4>
            <Container>
      <Row className="py-2">
        <Col>ชื่อ:{props?.data?.regPrefix} {props?.data?.regName} {props?.data?.regLastname}</Col>
        <Col>Name:{props?.data?.regEname} {props?.data?.regElastname}</Col>
        <Col xs={5}>บัตรประจำตัวประชาชน:{props?.data?.regIdpersonal}</Col> 
      </Row>
      <Row className="py-2">
        <Col xs={3} >วัน/เดือน/ปีเกิด: {props?.data?.regBirth} </Col>
        <Col xs={1}>เพศ:{props?.data?.regSex}</Col>
        <Col xs={2}>สัญชาติ: {props?.data?.regNation}</Col>
        <Col xs={3}>เบอร์โทรศัพท์: {props?.data?.regPhone} </Col>
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
      </Container>
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

          </div>

        </Modal.Body>
      </Modal>

    </>
  )
}