import React, { useState } from "react";
import { Button, Card, Col, Dropdown, FloatingLabel, Form, Image, Row } from "react-bootstrap";
import AddModal from "@/components/modal/AddModal";
import useAxios from "axios-hooks";
import axios from "axios";
import LayOut from "@/components/RootPage/TheLayOut";


const NewsSchoolAdd: React.FC = () => {

  return (
    <LayOut>

      <div className='NewsSchool-page'>
        <Card>
          {/* <AddModal checkAlertShow={alertForm} setCheckAlertShow={setAlertForm} checkBody={checkBody} pathBack={"/newsSchool"} /> */}
          <Card.Header className="d-flex space-between">
            <h4 className="mb-0 py-1">
              เพิ่มข่าว
            </h4>
          </Card.Header>
          <Card.Body>
            <Row>
              {/* <Col md={4}>
                <FloatingLabel controlId="NewsName" label="ชื่อข่าว * จำกัด 50 ตัวอักษร" className="mb-3" style={{ color: 'red' }}>
                  <Form.Control
                    isValid={inputForm && newName !== ""}
                    isInvalid={inputForm && newName === ""}
                    type="text"
                    value={newName}
                    onChange={e => {
                      const newValue = e.target.value;
                      if (newValue.length <= 50) {
                        setnewName(newValue);
                      }
                    }}
                    placeholder="name@example.com"
                  />
                </FloatingLabel>
              </Col> */}
              <Col md={4}>
                <FloatingLabel controlId="title" label="หัวข้อ" className="mb-3">
                  <Form.Control
                    // isValid={inputForm && newTitle !== ""}
                    // isInvalid={inputForm && newTitle === ""}
                    type="text"
                  // value={newTitle}
                  // onChange={e => setnewTitle(e.target.value)}
                  />
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel controlId="subTitle" label="บทความย่อ" className="mb-3">
                  <Form.Control
                    // isValid={inputForm && newTitle !== ""}
                    // isInvalid={inputForm && newTitle === ""}
                    type="text"
                  // value={newTitle}
                  // onChange={e => setnewTitle(e.target.value)}
                  />
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel controlId="type" label="ประเภทข่าว" className="mb-3">
                  <Form.Control
                    // isValid={inputForm && newTitle !== ""}
                    // isInvalid={inputForm && newTitle === ""}
                    type="text"
                  // value={newTitle}
                  // onChange={e => setnewTitle(e.target.value)}
                  />
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel controlId="img" label="รูปภาพ" className="mb-3">
                  <Form.Control
                    // isValid={inputForm && newImg !== null}
                    // isInvalid={inputForm && newImg === null}
                    type="file"
                    // defaultValue={newImg}
                    // onChange={handleFileUpload}
                    // placeholder="NewsImg"
                  />
                </FloatingLabel>
              </Col>
              {/* <Col md={4}>
                <FloatingLabel controlId="NewsSubTitle" label="หัวข้อย่อย" className="mb-3">
                  <Form.Control
                    isValid={inputForm && newSubTitle !== ""}
                    isInvalid={inputForm && newSubTitle === ""}
                    type="text"
                    value={newSubTitle}
                    onChange={e => setnewSubTitle(e.target.value)}
                    placeholder="NewsSubTitle"
                  />
                </FloatingLabel>
              </Col> */}

              {/* <Col md={4}>
                <FloatingLabel controlId="NewsDate" label="วันที่ " className="mb-3">
                  <Form.Control
                    isValid={inputForm && newDate !== ""}
                    isInvalid={inputForm && newDate === ""}
                    type="date"
                    value={newDate}
                    onChange={e => setnewDate(e.target.value)}
                    placeholder="NewsDate"
                  />
                </FloatingLabel>
              </Col> */}
              {/* <Col md={4}>
                <FloatingLabel controlId="NewsImg" label="รูปภาพ" className="mb-3">
                  <Form.Control
                    isValid={inputForm && newImg !== null}
                    isInvalid={inputForm && newImg === null}
                    type="file"
                    // defaultValue={newImg}
                    onChange={handleFileUpload}
                    placeholder="NewsImg" />
                </FloatingLabel>
              </Col> */}
            </Row>

            {/* <Col md={8}>
              <FloatingLabel controlId="NewsSubDetail" label="รายละเอียดข่าว" className="mb-3">
                <Form.Control
                  as="textarea"
                  isValid={inputForm && newSubDetail !== ""}
                  isInvalid={inputForm && newSubDetail === ""}
                  value={newSubDetail}
                  onChange={e => setnewSubDetail(e.target.value)}
                  placeholder="NewsSubDetail"
                  style={{ width: "100%", height: "200px" }}
                />
              </FloatingLabel>
            </Col> */}
          </Card.Body>
          <Card.Footer className="text-end">
            {/* <Button variant="success mx-2" onClick={handleSubmit}>
              ยืนยัน
            </Button> */}
            {/* <Button variant="primary mx-2" onClick={reloadPage}>
              ล้าง
            </Button> */}

          </Card.Footer>
        </Card>
      </div>
    </LayOut >
  );
}
export default NewsSchoolAdd;