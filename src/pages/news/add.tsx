import React, { useState } from "react";
import { Button, Card, Col, Dropdown, FloatingLabel, Form, Image, Row } from "react-bootstrap";
import AddModal from "@/components/modal/AddModal";
import useAxios from "axios-hooks";
import axios from "axios";
import LayOut from "@/components/RootPage/TheLayOut";
import { CKEditor } from "ckeditor4-react";


const NewsSchoolAdd: React.FC = () => {

  return (
    <LayOut>

      <div className='NewsSchool-page'>
        <Card>
          {/* <AddModal checkAlertShow={alertForm} setCheckAlertShow={setAlertForm} checkBody={checkBody} pathBack={"/newsSchool"} /> */}
          <Card.Header className="d-flex space-between">
            <h4 className="mb-0 py-1">
              เพิ่มข่าว / กิจกรรม
            </h4>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={6}>
                <FloatingLabel controlId="title" label="หัวข้อ" className="mb-3">
                  <Form.Control
                    type="text"
                  />
                </FloatingLabel>
              </Col>
              <Col md={6}>
                <FloatingLabel controlId="floatingSelect" label="เลือกประเภทข่าวสาร">
                  <Form.Select aria-label="Floating label select example">
                    <option value="News">ข่าว</option>
                    <option value="Relations">ประชาสัมพันธ์</option>
                    <option value="Activity">กิจกรรม</option>
                    <option value="Interested">สนใจเข้าศึกษา</option>
                    <option value="Current">นักศึกษาปัจจุบัน</option>
                    <option value="AlumniServices">บริการศิษย์เก่า</option>
                    <option value="WorkWithUs">ร่วมงานกับเรา</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
              <Col md={6}>
                <FloatingLabel controlId="startDate" label="วันเริ่มกิจกรรม" className="mb-3">
                  <Form.Control
                    type="date"
                  />
                </FloatingLabel>
              </Col>
              <Col md={6}>
                <FloatingLabel controlId="endDate" label="วันเสิ้นสุดกิจกรรม" className="mb-3">
                  <Form.Control
                    type="date"
                  />
                </FloatingLabel>
              </Col>
              <Col md={6}>
                <FloatingLabel controlId="img" label="รูปภาพ" className="mb-3">
                  <Form.Control
                    type="file"
                  />
                </FloatingLabel>
              </Col>
              <Col md={6}>
                <FloatingLabel controlId="promoteImg" label="รูปภาพสไลด์" className="mb-3">
                  <Form.Control
                    type="file"
                  />
                </FloatingLabel>
              </Col>
              <Col md={6}>
                <FloatingLabel controlId="subTitle" label="บทความย่อ" className="mb-3">
                  <Form.Control
                    as="textarea"
                    style={{ height: '300px' }}
                  />
                </FloatingLabel>
              </Col>
              <Col md={6}>
                <CKEditor
                  // initData={fromAbout?.subhistory}
                  // onChange={(e) => {
                  //   setFromAbout((oldState) => {
                  //     return { ...oldState, subhistory: e.editor.getData() }
                  //   })
                  // }}
                  config={{
                    uiColor: "#ddc173 ",
                    language: "th",
                    extraPlugins: "easyimage,autogrow,emoji",
                  }}
                />
              </Col>
            </Row>
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