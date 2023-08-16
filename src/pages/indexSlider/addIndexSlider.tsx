import React, { useRef, useState } from 'react';
import Head from 'next/head';
import LayOut from "@/components/LayOut";
import { Button, Card, Col, Dropdown, FloatingLabel, Form, Image, Row } from "react-bootstrap";
import AddModal from "@/components/modal/AddModal";
import useAxios from "axios-hooks";
import Link from "next/link";
// import { bankMap } from '@/test';
// import { IndexSlder } from '@prisma/client';
import { IndexSlder } from "@prisma/client";

const IndexSlderAdd: React.FC = () => {
  // const [{ error: errorMessage, loading: IndexSlderLoading  }, executeIndexSlder ] = useAxios({ url: '/api/indexSlder', method: 'POST' }, { manual: true });
  const [img1, setimg1] = useState<string>("");
  const [alertForm, setAlertForm] = useState<string>("not");
  const [inputForm, setInputForm] = useState<boolean>(false);
  const [checkBody, setCheckBody] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);


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
    setimg1("");

    setAlertForm("not");
    setInputForm(false);
    setCheckBody("");
  }

  const handleUpload = async () => {
    if (fileInputRef.current) {
      const file = fileInputRef.current.files?.[0];
      if (file) {
        const formData = new FormData();
        formData.append('file', file);

        try {
          const response = await fetch('https://upload-image.me-prompt-technology.com/', {
            method: 'POST',
            body: formData,
          });

          const responseData = await response.json();
          console.log(responseData);

          // สร้าง URL ของรูปภาพจาก responseData
          if (responseData.result?.variants[0]) {
            setImageUrl(responseData.result.variants[11]);
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
  };
  const allowedExtensions = ['.png', '.jpg', '.jpeg'];
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];

    if (selectedFile) {
      const fileExtension = selectedFile.name.slice(selectedFile.name.lastIndexOf('.')).toLowerCase();

      if (allowedExtensions.includes(fileExtension)) {
        setSelectedImage(selectedFile);
        setErrorMessage('');
      } else {
        setSelectedImage(null);
        setErrorMessage('กรุณาเลือกรูปภาพที่มีนามสกุล JPG , jPEG หรือ PNG เท่านั้น');
      }
    }
  };


  return (
    <LayOut>
      <Head>
        <title>Wellcome | MePrompt-BackOffice</title>
        <meta
          name="description"
          content="T ACTIVE"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='IndexSlder-page'>
        <Card>
          <AddModal checkAlertShow={alertForm} setCheckAlertShow={setAlertForm} checkBody={checkBody} />
          <Card.Header className="d-flex space-between">
            <h4 className="mb-0 py-1">
              IndexSlder - เพิ่มรูป
            </h4>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={4}>
                {/* <FloatingLabel controlId="img1" label="img1 / รูปภาพ" className="mb-3">
                  <Form.Control
                    isValid={inputForm && img1 !== ""}
                    isInvalid={inputForm && img1 === ""}
                    type="file"
                    defaultValue={img1}
                    onChange={handleFileUpload}
                    placeholder="img1" />
                </FloatingLabel> */}
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                {selectedImage && (
                  <div>
                    <p>รูปภาพที่เลือก: {selectedImage.name}</p>
                    <img src={URL.createObjectURL(selectedImage)} alt="Selected" style={{ maxWidth: '100%', height: 'auto' }} />
                    {uploadSuccess && <p style={{ color: 'green' }}>อัพโหลดสำเร็จ!</p>}
                  </div>
                )}


                <input type="file" accept=".png,.jpg,.jpeg" onChange={handleImageChange} ref={fileInputRef} name="image" />



              </Col>



            </Row>
          </Card.Body>
          <Card.Footer className="text-end">
            {/* <Button variant="success mx-2" onClick={handleSubmit}>
              ยืนยัน
            </Button> */}
            <Button onClick={handleUpload} as="input" type="submit" value="ยืนยันการอัพโหลด" />
            <Link href="/IndexSlder" className="btn btn-danger mx-2">
              ย้อนกลับ
            </Link>
          </Card.Footer>
        </Card>
      </div>
    </LayOut >
  );
}
export default IndexSlderAdd;