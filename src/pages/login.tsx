// export default function Login(){
//     return(

//     )
// }

import { useState, useEffect } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { useRouter } from "next/router";

export default function Login() {
  const [data, setData] = useState<{ adminUser: { username: string, password: string } } | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {

      const response = await fetch("/api/checkLogin");
      const data = await response.json();

      const match = data?.adminUser?.some((user: { username: string, password: string }) => {
        return user.username === email && user.password === password;
      });
      // Simulate login logic, replace with actual API call
      if (match) {
        // Set login success and save to localStorage
        setLoginSuccess(true);
        localStorage.setItem("isLoggedIn", "true"); // Set the logged-in state
        router.push("/");
      } else {
        // Credentials do not match, show an error message
        setLoginSuccess(false);
        setLoginMessage("Invalid username or password");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };


  useEffect(() => {
    // Fetch data from the API
    fetch("/api/checkLogin")
      .then((response) => response.json())
      .then((data) => {
        // Set the fetched data to the state
        setData(data);
        //  console.log("Fetched data:", data);
        // console.log(data.adminUser.email);
        // console.log(data.adminUser.password);
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
            {/* <div className="border border-3 border-primary"></div> */}
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <img src="https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/8b288351-ccbd-491b-d92d-ca4842ec5800/public" className="center" alt="" />
                  <h2 className="fw-bold mb-2 text-uppercase text-center ">วิทยาลัยเทคโนโลยีพนมวันท์</h2>
                  <p className=" mb-3">Please enter your username and password</p>
                  <div className="mb-3">
                    <Form>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Username
                        </Form.Label>
                        <Form.Control type="text" placeholder="Enter Username" value={email} onChange={(e) => setEmail(e.target.value)} />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
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
                      {/* Display a message based on login result */}
                      {loginMessage && <p className={`text-${loginSuccess ? "success" : "danger"}`}>{loginMessage}</p>}
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