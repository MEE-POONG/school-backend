// export default function Login(){
//     return(
      
//     )
// }

import { useState, useEffect } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";

export default function Login() {
  const [data, setData] = useState<{ adminUser: { email: string, password: string } } | null>(null);
  const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const handleLogin = () => {
  // เช็คว่าข้อมูลที่กรอกตรงกับข้อมูลจาก API หรือไม่
  if (data && data.adminUser && data.adminUser.email === email && data.adminUser.password === password) {
    // ทำการเปลี่ยนหน้าไปยัง "/"
    window.location.href = "/";
  } else {
    console.log("Invalid credentials");
  }
};

  useEffect(() => {
    // Fetch data from the API
    fetch("/api/checkLogin")
      .then((response) => response.json())
      .then((data) => {
        // Set the fetched data to the state
        setData(data);
        console.log("Fetched data:", data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  

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
                          Email address
                        </Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password"  value={password} onChange={(e) => setPassword(e.target.value)}/>
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      >
                      </Form.Group>
                      <div className="d-grid">
                        <Button variant="primary" type="submit" onClick={handleLogin}>
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
}