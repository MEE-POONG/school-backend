// src/components/Login.tsx
import React, { useState } from 'react';
import { Container, Form, Button, Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  // const handleLogin = () => {
  //   // ทำการตรวจสอบชื่อผู้ใช้และรหัสผ่าน และดำเนินการเข้าสู่ระบบ
  // };
 

  const handleLogin = async () => {
    try {
      const response = await axios.get(`/api/checkLogin?email=${username}&password=${password}`);
      const isValid = response.data.isValid;

      if (isValid) {
        // ดำเนินการเข้าสู่ระบบ
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      setError('An error occurred');
    }
  };

  return (
    <div>
    <Container>
      <Row className="vh-100 d-flex justify-content-center align-items-center">
        <Col md={8} lg={6} xs={12}>
          <div className="border border-3 border-primary"></div>
          <Card className="shadow">
            <Card.Body>
              <div className="mb-3 mt-md-4">
              {/* <img src="https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/2663e300-1089-4f86-d2bb-77a993ed4700/250" className="" alt="" /> */}
                <h2 className="fw-bold mb-2 text-uppercase text-center ">วิทยาลัยเทคโนโลยีพนมวันท์</h2>
                <p className=" mb-5">Please enter your login and password!</p>
                <div className="mb-3">
                  <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label className="text-center">
                        Email
                      </Form.Label>
                      <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group
                      className="mb-3"
                      controlId="formBasicPassword"
                    >
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="formBasicCheckbox"
                    >
                    </Form.Group>
                    <div className="d-grid">
                      <Button variant="primary" type="submit">
                        Login
                      </Button>
                    </div>
                  </Form>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  </div>
  );
};

export default Login;
