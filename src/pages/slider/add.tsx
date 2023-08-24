import React, { useState } from "react";
import Head from 'next/head';
import LayOut from "@/components/RootPage/TheLayOut";
import { Button, Card, Col, Dropdown, FloatingLabel, Form, Image, Row } from "react-bootstrap";
import AddModal from "@/components/modal/AddModal";
import useAxios from "axios-hooks";
import BankAccount from "@/components/Input/BankAccount";
import Link from "next/link";
import { bankMap } from "@/data/test";
import axios from "axios";



const MemberAdd: React.FC = () => {
  const [{ error: errorMessage, loading: memberLoading }, executeSlider] = useAxios({ url: '/api/slider', method: 'POST' }, { manual: true });
  const [img1, setimg1] = useState<File | null>(null);

  const [alertForm, setAlertForm] = useState<string>("not");
  const [inputForm, setInputForm] = useState<boolean>(false);
  const [checkBody, setCheckBody] = useState<string>(""); 

  const handleInputChange = (setter: any) => (event: any) => {
    const newValue = event.target.value;
    if (!isNaN(newValue) && !newValue.includes('.')) {
      setter(newValue);
    }
  };
  const reloadPage = () => {
    clear();
  };

  const clear = () => {
    setimg1(null);
    setAlertForm("not");
    setInputForm(false);
    setCheckBody("");
  }


  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setimg1(file); // Store the File object
    }
  };


  const handleSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    let missingFields = [];
    if (!img1) missingFields.push("รูปภาพ");


    if (missingFields.length > 0) {
      setAlertForm("warning");
      setInputForm(true);
      setCheckBody(`กรอกข้อมูลไม่ครบ: ${missingFields.join(', ')}`);
    } else {
      try {
        setAlertForm("primary"); // set to loading

        if (img1) {
            const formData = new FormData();
            formData.append("file", img1); // Assuming 'img1' is a File object
            const uploadResponse = await axios.post(
              "https://upload-image.me-prompt-technology.com/",
              formData
            );
  
            if (uploadResponse.status === 200) {
              const responseData = uploadResponse.data;
              const imageId = responseData.result.id;
  
              // Prepare the data to send
              const data = {
                img1: imageId, // Use the uploaded image ID
              };
  
              const response = await executeSlider({ data });
              if (response && response.status === 201) {
                setAlertForm("success");
                setTimeout(() => {
                  clear();
                }, 5000);
              } else {
                setAlertForm("danger");
                throw new Error('Failed to send data');
              }
            } else {
              setAlertForm("danger");
              throw new Error('Image upload failed');
            }
          }
        } catch (error) {
          setAlertForm("danger");
        }
      }
  };
  return (
    <LayOut>

      <div className='member-page'>
        <Card>
          {/* <AddModal checkAlertShow={alertForm} setCheckAlertShow={setAlertForm} checkBody={checkBody} /> */}
          <Card.Header className="d-flex space-between">
            <h4 className="mb-0 py-1">
              Member - เพิ่มข้อมูล
            </h4>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={4}>
                <FloatingLabel controlId="imagefile" label="รูปภาพ" className="mb-3">
                  <Form.Control
                    isValid={inputForm && img1 !== null}
                    isInvalid={inputForm && img1 === null}
                    type="file"
                    onChange={handleFileUpload}
                    placeholder="รูปภาพหน้าแรก"
                  />
                </FloatingLabel>
              </Col>

            </Row>
          </Card.Body>
          <Card.Footer className="text-end">
            <Button variant="success mx-2" onClick={handleSubmit}>
              ยืนยัน
            </Button>
            <Button variant="primary mx-2" onClick={reloadPage}>
              ล้าง
            </Button>
            <Link href="/partner" className="btn btn-danger mx-2">
              ย้อนกลับ
            </Link>
          </Card.Footer>
        </Card>
      </div>
    </LayOut >
  );
}
export default MemberAdd;