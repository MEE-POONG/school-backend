import React, { useState } from "react";
import Head from 'next/head';
import LayOut from "@/components/RootPage/TheLayOut";
import { Button, Card, Col, Dropdown, FloatingLabel, Form, Image, Row } from "react-bootstrap";
import AddModal from "@/components/modal/AddModal";
import useAxios from "axios-hooks";
import Link from "next/link";
import { AdminUser } from '@prisma/client';

const AdminAdd: React.FC = () => {
  const [{ error: errorMessage, loading: AdminLoading }, executeAdmin] = useAxios({ url: '/api/checkLogin', method: 'POST' }, { manual: true });
  const [username, setusername] = useState<string>("");
  const [password, setpassword] = useState<string>("");
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
    setusername("");
    setpassword("");

    
    setAlertForm("not");
    setInputForm(false);
    setCheckBody("");
  }



  const handleSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    let missingFields = [];
    if (!username) missingFields.push("ชื่อผู้ใช้งาน");
    if (!password) missingFields.push("รหัสผ่าน");
    if (missingFields.length > 0) {
      setAlertForm("warning");
      setInputForm(true);
      setCheckBody(`กรอกข้อมูลไม่ครบ: ${missingFields.join(', ')}`);
    } else {
      try {
        setAlertForm("primary"); // set to loading

        // Prepare the data to send
        const data = {
         username,
         password,

         
        };

        const response = await executeAdmin({ data });
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
        <title>Phanomwan Backend</title>
        <meta
          name="description"
          content="T ACTIVE"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='adminpage'>
        <Card>
          <AddModal checkAlertShow={alertForm} setCheckAlertShow={setAlertForm} checkBody={checkBody} />
          <Card.Header className="d-flex space-between">
            <h4 className="mb-0 py-1">
              เพิ่มผู้ใช้งาน
            </h4>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={4}>
                <FloatingLabel controlId="username" label="username / ชื่อผู้ใช้งาน" className="mb-3">
                  <Form.Control
                    isValid={inputForm && username !== ""}
                    isInvalid={inputForm && username === ""}
                    type="text"
                    value={username}
                    onChange={e => setusername(e.target.value)}
                    placeholder="username"
                  />
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel controlId="password" label="password / รหัสผ่าน" className="mb-3">
                  <Form.Control
                    isValid={inputForm && password !== ""}
                    isInvalid={inputForm && password === ""}
                    type="text"
                    value={password}
                    onChange={e => setpassword(e.target.value)}
                    placeholder="password"
                  />
                </FloatingLabel>
              </Col>
       
        


               
            </Row>
          </Card.Body>
          <Card.Footer className="text-end">
            <Button variant="success mx-2" onClick={handleSubmit}>
              ยืนยัน
            </Button>
            {/* <Button variant="primary mx-2" onClick={reloadPage}>
              ล้าง
            </Button> */}
            <Link href="/admin" className="btn btn-danger mx-2">
              ย้อนกลับ
            </Link>
          </Card.Footer>
        </Card>
      </div>
    </LayOut >
  );
}
export default AdminAdd;