import { RegisterForm } from "@prisma/client";
import useAxios from "axios-hooks";
import React, { useEffect, useState } from "react";
import { FaRegEye, FaSearch, FaUserNinja } from "react-icons/fa";
import {
  Modal,
  Button,
  Form,
  Row,
  Col,
  Image,
  Table,
  FormControl,
} from "react-bootstrap";
import { useRouter } from "next/router";
import Link from "next/link";


interface DetailsRegisterAddDetailsRegisterModalProps {
  data: RegisterForm;
}

const DetailsRegisterAddDetailsRegisterModal: React.FC<
  DetailsRegisterAddDetailsRegisterModalProps
> = ({ data }) => {
  const [show, setShow] = useState<boolean>(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  

  
 

  return (
    <>
      {/* หัวเพจ และ ไอคอน*/}
      <Button className="mx-1 btn gold" bsPrefix="icon" onClick={handleShow}>
        <FaUserNinja />
        <span className="h-tooltiptext">รายละเอียด</span>
      </Button>

      {/* ชื่อหัวเพจ*/}
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>รายละเอียด</Modal.Title>
          <Modal.Title>{registerForm.regName} : </Modal.Title>  
        </Modal.Header>


        {/* ตัวเพจ */}
        <Modal.Body>
          
            <Col lg="2">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>คำนำหน้า</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="คำนำหน้า"
                  // defaultValue={regName}
                />
              </Form.Group>
            </Col>
         
        </Modal.Body>

        {/* ฟุตเตอร์ */}
        <Modal.Footer>
          <Button variant="success" onClick={handleClose}>
            ปิด
          </Button>
          <Button>PDF</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DetailsRegisterAddDetailsRegisterModal;
function setregImg(arg0: string) {
  throw new Error("Function not implemented.");
}
