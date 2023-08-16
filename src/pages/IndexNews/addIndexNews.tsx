import React, {useState } from "react";
import Head from 'next/head';
import LayOut from "@/components/LayOut";
import { Button, Card, Col, Dropdown, FloatingLabel, Form, Image, Row } from "react-bootstrap";
import AddModal from "@/components/modal/AddModal";
import useAxios from "axios-hooks";
import Link from "next/link";

const IndexNewsAdd: React.FC = () => {
  const [{ error: errorMessage, loading: IndexNewsLoading }, executeIndexNews] = useAxios({ url: '/api/IndexNews', method: 'POST' }, { manual: true });
  const [newName,  setnewName] = useState<string>("");
  const [newTitle, setnewTitle] = useState<string>("");
  const [newSubTitle, setnewSubTitle] = useState<string>("");
  const [newSubDetail, setnewSubDetail] = useState<string>("");
  const [newImg, setnewImg] = useState<string>("");
  const [newDate, setnewDate] = useState<string>("");
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
    setnewName("");
    setnewTitle("");
    setnewSubTitle("");
    setnewSubDetail("");
    setnewImg("");
    setnewDate("");
    
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
        setnewImg(splittedString);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    let missingFields = [];
    if (!newName) missingFields.push("NewsName");
    if (!newTitle) missingFields.push("NewsTitle");
    if (!newSubTitle) missingFields.push("NewsSubTitle");
    if (!newSubDetail) missingFields.push("NewsSubDetail");
    if (!newImg) missingFields.push("NewsImg");
    if (!newDate) missingFields.push("NewsDate");

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
         newName,
         newTitle,
         newSubTitle,
         newSubDetail,
         newImg,
         newDate,         
        };

        const response = await executeIndexNews({ data });
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
      <div className='IndexNews-page'>
        <Card>
          <AddModal checkAlertShow={alertForm} setCheckAlertShow={setAlertForm} checkBody={checkBody} />
          <Card.Header className="d-flex space-between">
            <h4 className="mb-0 py-1">
              IndexNews - เพิ่มข่าว
            </h4>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={4}>
                <FloatingLabel controlId="NewsName" label="NewsName / ชื่อข่าว" className="mb-3">
                  <Form.Control
                    isValid={inputForm && newName !== ""}
                    isInvalid={inputForm && newName === ""}
                    type="text"
                    value={newName}
                    onChange={e => setnewName(e.target.value)}
                    placeholder="name@example.com"
                  />
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel controlId="NewsTitle" label="NewsTitle / หัวข้อข่าว" className="mb-3">
                  <Form.Control
                    isValid={inputForm && newTitle !== ""}
                    isInvalid={inputForm && newTitle === ""}
                    type="title2"
                    value={newTitle}
                    onChange={e => setnewTitle(e.target.value)}
                    placeholder="title2"
                  />
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel controlId="NewsSubTitle" label="NewsSubTitle / หัวข้อย่อย" className="mb-3">
                  <Form.Control
                    isValid={inputForm && newSubTitle !== ""}
                    isInvalid={inputForm && newSubTitle === ""}
                    type="text"
                    value={newSubTitle}
                    onChange={e => setnewSubTitle(e.target.value)}
                    placeholder="NewsSubTitle"
                  />
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel controlId="NewsSubDetail" label="NewsSubDetail / รายละเอียดข่าว" className="mb-3">
                  <Form.Control
                    isValid={inputForm && newSubDetail !== ""}
                    isInvalid={inputForm && newSubDetail === ""}
                    type="text"
                    value={newSubDetail}
                    onChange={e => setnewSubDetail(e.target.value)}
                    placeholder="NewsSubDetail"
                  />
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel controlId="NewsDate" label="NewsDate / วันที่ " className="mb-3">
                  <Form.Control
                    isValid={inputForm && newDate !== ""}
                    isInvalid={inputForm && newDate === ""}
                    type="text"
                    value={newDate}
                    onChange={e => setnewDate(e.target.value)}
                    placeholder="NewsDate"
                  />
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel controlId="NewsImg" label="NewsImg / รูปภาพ" className="mb-3">
                  <Form.Control
                    isValid={inputForm && newImg !== ""}
                    isInvalid={inputForm && newImg === ""}
                    type="file"
                    defaultValue={newImg}
                    onChange={handleFileUpload}
                    placeholder="NewsImg"/> 
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
            <Link href="/IndexNews" className="btn btn-danger mx-2">
              ย้อนกลับ
            </Link>
          </Card.Footer>
        </Card>
      </div>
    </LayOut >
  );
}
export default IndexNewsAdd;