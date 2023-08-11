import React, { useState } from "react";
import Head from 'next/head';
import LayOut from "@/components/LayOut";
import { Button, Card, Col, Dropdown, FloatingLabel, Form, Image, Row } from "react-bootstrap";
import AddModal from "@/components/modal/AddModal";
import useAxios from "axios-hooks";
import Link from "next/link";

const IndexActivityAdd: React.FC = () => {
  const [{ error: errorMessage, loading: IndexActivityLoading }, executeIndexActivity] = useAxios({ url: '/api/indexActivity', method: 'POST' }, { manual: true });
  const [activityName, setactivityName] = useState<string>("");
  const [activityTitle, setactivityTitle] = useState<string>("");
  const [activitySubTitle, setactivitySubTitle] = useState<string>("");
  const [activitySubDetail, setactivitySubDetail] = useState<string>("");
  const [activityImg, setactivityImg] = useState<string>("");
  const [activityDate, setactivityDate] = useState<string>("");
  const [activityDescription, setactivityDescription] = useState<string>("");
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
    setactivityName("");
    setactivityTitle("");
    setactivitySubTitle("");
    setactivitySubDetail("");
    setactivityImg("");
    setactivityDate("");
    setactivityDescription("");
    
    setAlertForm("not");
    setInputForm(false);
    setCheckBody("");
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const splittedString = base64String.split(",")[1]; // ตัดส่วน "data:image/png;base64," ออก
        setactivityImg(splittedString);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    let missingFields = [];
    if (!activityName) missingFields.push("activityName");
    if (!activityTitle) missingFields.push("activityTitle");
    if (!activitySubTitle) missingFields.push("activitySubTitle");
    if (!activitySubDetail) missingFields.push("activitySubDetail");
    if (!activityImg) missingFields.push("activityImg");
    if (!activityDate) missingFields.push("activityDate");
    if (!activityDescription) missingFields.push("activityDescription");

    /*if (!img) missingFields.push("img");*/
    if (missingFields.length > 0) {
      setAlertForm("warning");
      setInputForm(true);
      setCheckBody(`กรอกข้อมูลไม่ครบ: ${missingFields.join(', ')}`);
    } else {
      try {
        setAlertForm("primary"); // set to loading

        // Prepare the data to send
        const data = {
         activityName,
         activityTitle,
         activitySubTitle,
         activitySubDetail,
         activityImg,
         activityDate,
         activityDescription,
         
        };

        const response = await executeIndexActivity({ data });
        if (response && response.status === 201) {
          setAlertForm("success");
          setTimeout(() => {
            clear();
          }, 5000);
        } else {
          setAlertForm("danger");
          throw new Error('Failed to send data');
        }
      } catch (error) {
        setAlertForm("danger");
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
      <div className='IndexActivity-page'>
        <Card>
          <AddModal checkAlertShow={alertForm} setCheckAlertShow={setAlertForm} checkBody={checkBody} />
          <Card.Header className="d-flex space-between">
            <h4 className="mb-0 py-1">
              IndexActivity - เพิ่มกิจกรรม
            </h4>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={4}>
                <FloatingLabel controlId="activityName" label="activityName / ชื่อกิจกรรม" className="mb-3">
                  <Form.Control
                    isValid={inputForm && activityName !== ""}
                    isInvalid={inputForm && activityName === ""}
                    type="text"
                    value={activityName}
                    onChange={e => setactivityName(e.target.value)}
                    placeholder="name@example.com"
                  />
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel controlId="activityTitle" label="activityTitle / หัวข้อกิจกรรม" className="mb-3">
                  <Form.Control
                    isValid={inputForm && activityTitle !== ""}
                    isInvalid={inputForm && activityTitle === ""}
                    type="title2"
                    value={activityTitle}
                    onChange={e => setactivityTitle(e.target.value)}
                    placeholder="title2"
                  />
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel controlId="activitySubTitle" label="activitySubTitle / หัวข้อย่อย" className="mb-3">
                  <Form.Control
                    isValid={inputForm && activitySubTitle !== ""}
                    isInvalid={inputForm && activitySubTitle === ""}
                    type="text"
                    value={activitySubTitle}
                    onChange={e => setactivitySubTitle(e.target.value)}
                    placeholder="activitySubTitle"
                  />
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel controlId="activitySubDetail" label="activitySubDetail / รายละเอียดกิจกรรม" className="mb-3">
                  <Form.Control
                    isValid={inputForm && activitySubDetail !== ""}
                    isInvalid={inputForm && activitySubDetail === ""}
                    type="text"
                    value={activitySubDetail}
                    onChange={e => setactivitySubDetail(e.target.value)}
                    placeholder="activitySubDetail"
                  />
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel controlId="activityDate" label="activityDate / วันที่ " className="mb-3">
                  <Form.Control
                    isValid={inputForm && activityDate !== ""}
                    isInvalid={inputForm && activityDate === ""}
                    type="text"
                    value={activityDate}
                    onChange={e => setactivityDate(e.target.value)}
                    placeholder="activityDate"
                  />
                </FloatingLabel>
              </Col>
             < Col md={4}>
                <FloatingLabel controlId="activityDescription" label="activityDescription / คำอธิบายกิจกรรม" className="mb-3">
                  <Form.Control
                    isValid={inputForm && activityDescription !== ""}
                    isInvalid={inputForm && activityDescription === ""}
                    type="text"
                    value={activityDescription}
                    onChange={e => setactivityDescription(e.target.value)}
                    placeholder="activityDescription"
                  />
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel controlId="activityImg" label="activityImg / รูปภาพ" className="mb-3">
                  <Form.Control
                    isValid={inputForm && activityImg !== ""}
                    isInvalid={inputForm && activityImg === ""}
                    type="file"
                    defaultValue={activityImg}
                    onChange={handleFileUpload}
                    placeholder="activityImg"/> 
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
            <Link href="/IndexActivity" className="btn btn-danger mx-2">
              ย้อนกลับ
            </Link>
          </Card.Footer>
        </Card>
      </div>
    </LayOut >
  );
}
export default IndexActivityAdd;