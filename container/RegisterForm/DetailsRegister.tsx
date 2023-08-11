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


  
  const router = useRouter();
  const { id } = router.query;
  const [
    {
      data: RegisterFormID,
      loading: RegisterFormIDLoading,
      error: RegisterFormIDError,
    },
    executeRegisterFormID,
  ] = useAxios<{ data: RegisterForm; success: boolean }, any>(
    {
      url: `/api/registerForm/${id}`,
      method: "GET",
    },
    { autoCancel: false, manual: true }
  );
  useEffect(() => {
    if (id) {
      executeRegisterFormID().then(({ data }) => {
        if (data?.data) {
          
          setregName(data?.data?.regName || "");
          setregImg(data?.data?.regImg || "");
        }
      });
    }
  }, [id]);

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
          {/* <Modal.Title>ดูรายการสินค้า คุณ : {registerForm.regName}</Modal.Title>   */}
        </Modal.Header>

        {/* ตัวเพจ */}
        <Modal.Body>
          <div className="text-center ">
            <img
              src="https://scontent.fnak3-1.fna.fbcdn.net/v/t39.30808-1/353042613_2188830094842235_8573190423118875508_n.jpg?stp=cp0_dst-jpg_e15_p120x120_q65&_nc_cat=101&ccb=1-7&_nc_sid=db1b99&_nc_ohc=3w8mUlimm5EAX9EC1F9&_nc_ht=scontent.fnak3-1.fna&oh=00_AfDBN8hHpRDcoHBrO66YvEaB9bBEE73j3egCryWuSQQDrw&oe=64D9D048"
              className=""
              alt=""
            />
          </div>

          <div className="d-flex space-between">
            <Col lg="2">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>คำนำหน้า</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="คำนำหน้า"
                  defaultValue={regName}
                />
              </Form.Group>
            </Col>
            <Col lg="4">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>ชื่อ</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="ชื่อ"
                  defaultValue={regName}
                />
              </Form.Group>
            </Col>
            <Col lg="4">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>นามสกุล</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="นามสกุล"
                  defaultValue={regName}
                  onChange={(e) => {
                    setregName(e.target.value);
                  }}
                />
              </Form.Group>
            </Col>
          </div>
          <div className="d-flex space-x-4">
          <Col lg="4">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>ชื่อภาษาอังกฤษ</Form.Label>
              <Form.Control
                type="text"
                placeholder="ชื่อภาษาอังกฤษ"
                defaultValue={regName}
                onChange={(e) => {
                  setregName(e.target.value);
                }}
              />
            </Form.Group>
          </Col>
          <Col lg="4">
            <Form.Group className="mb-3 " controlId="formBasicEmail">
              <Form.Label>นามสกุลภาษาอังกฤษ</Form.Label>
              <Form.Control
                type="text"
                placeholder="นามสกุลภาษาอังกฤษ"
                defaultValue={regName}
                onChange={(e) => {
                  setregName(e.target.value);
                }}
              />
            </Form.Group>
          </Col>
          </div>
          <div className="d-flex space-x-4">
          <Col lg="4">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>วัน/เดือน/ปี เกิด</Form.Label>
              <Form.Control
                type="text"
                placeholder="วัน/เดือน/ปี เกิด"
                defaultValue={regName}
                onChange={(e) => {
                  setregName(e.target.value);
                }}
              />
            </Form.Group>
          </Col>
          <Col lg="4">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>สัญชาติ</Form.Label>
              <Form.Control
                type="text"
                placeholder="สัญชาติ"
                defaultValue={regName}
                onChange={(e) => {
                  setregName(e.target.value);
                }}
              />
            </Form.Group>
          </Col>
          </div>
          <div className="d-flex space-x-4">
          <Col lg="4">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>รหัสบัตรประชาชน</Form.Label>
              <Form.Control
                type="text"
                placeholder="รหัสบัตรประชาชน"
                defaultValue={regName}
                onChange={(e) => {
                  setregName(e.target.value);
                }}
              />
            </Form.Group>
          </Col>
          <Col lg="4">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>เบอร์โทรศัพท์</Form.Label>
              <Form.Control
                type="text"
                placeholder="เบอร์โทรศัพท์"
                defaultValue={regName}
                onChange={(e) => {
                  setregName(e.target.value);
                }}
              />
            </Form.Group>
          </Col>
          </div>
          <Col lg="4">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                type="text"
                placeholder="E-mail"
                defaultValue={regName}
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
