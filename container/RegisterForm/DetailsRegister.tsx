import { RegisterForm } from "@prisma/client";
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
import useAxios from "axios-hooks";



interface DetailsRegisterModalProps {
  props: RegisterForm;
}

const DetailsRegisterAddDetailsRegisterModal: React.FC<
DetailsRegisterModalProps
> = ({ props }) => {
  
  const [show, setShow] = useState<boolean>(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);




 


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
          <Modal.Title>รายละเอียด : </Modal.Title>

        
        </Modal.Header>








        {/* ตัวเพจ */}
        <Modal.Body>
        

  

    
         
          {/* <Col lg="4">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>regName</Form.Label>
              <Form.Control
                type="text"
                placeholder="E-mail"
                defaultValue={regName}
              />
            </Form.Group>
          </Col> */}










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
