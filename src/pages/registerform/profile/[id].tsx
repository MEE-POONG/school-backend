

import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
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

          <h2 className="p-2 text-start">รายละเอียดข้อมูล</h2>

          <div>

            <h4>ข้อมูลผู้สมัคร</h4>

            <p>บัตรประจำตัวประชาชน: {props?.data?.regIdpersonal}</p>
            <p>วัน/เดือน/ปีเกิด: {props?.data?.regBirth}</p>
            <p>คำนำหน้าชื่อ: {props?.data?.regPrefix}</p>
            <p>เพศ: {props?.data?.regSex}</p>
            <p>สัญชาติ: {props?.data?.regNation}</p>
            <p>ชื่อ: {props?.data?.regName}</p>
            <p>นามสกุล: {props?.data?.regLastname}</p>
            <p>Name: {props?.data?.regEname}</p>
            <p>Surname: {props?.data?.regElastname}</p>
            <p>เบอร์โทรศัพท์ติดต่อ: {props?.data?.regPhone}</p>
            <p>Email: {props?.data?.regEmail}</p>

            <p>รูปภาพ :</p>
            <img src={`https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${props?.data?.regImg}/500`} alt="" />

            <h4>ประวัติการศึกษา</h4>
            <p>สถาบันการศึกษา: {props?.data?.regSchool}</p>
            <p>สำเร็จการศึกษาระดับ: {props?.data?.regDegree}</p>
            <p>เกรดเฉลี่ย: {props?.data?.regGpa}</p>

            <h4>คณะ/สาขา</h4>
            <p>หลักสูตร: {props?.data?.regProgram}</p>
            <p>คณะ: {props?.data?.regFaculty}</p>
            <p>สาขา: {props?.data?.regMajor}</p>

          </div>

        </Modal.Body>
      </Modal>

    </>
  )
}