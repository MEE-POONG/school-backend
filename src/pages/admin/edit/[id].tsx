import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import LayOut from "@/components/RootPage/TheLayOut"; import {
  Button,
  Card,
  Col,
  Dropdown,
  FloatingLabel,
  Form,
  Image,
  Row,
} from "react-bootstrap";
import EditModal from "@/components/modal/EditModal";
import useAxios from "axios-hooks";
import Link from "next/link";
import { AdminUser, RegisterForm } from "@prisma/client";




const RegisterFormAdd: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [
    { loading: updateRegisterFormLoading, error: updateRegisterFormError },
    executeRegisterFormPut,
  ] = useAxios({}, { manual: true });
  const [username, setusername] = useState<string>("");
  const [password, setpassword] = useState<string>("");


  const [alertForm, setAlertForm] = useState<string>("not");
  const [inputForm, setInputForm] = useState<boolean>(false);
  const [checkBody, setCheckBody] = useState<string>("");




  const [{ data: AdminUserData }, getAdminUser] = useAxios({
    url: `/api/checkLogin/${id}`,
    method: "GET",
  });


  const reloadPage = () => {
    window.location.reload();
  };


  useEffect(() => {
    if (AdminUserData) {
      const {
        username,
        password,
        // ... (ตาม field อื่น ๆ)
      } = AdminUserData;

      setusername(username);
      setpassword(password);


      // ... (กำหนดค่า state อื่น ๆ)
    }
  }, [AdminUserData]);

  const handleSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    let missingFields = [];
    // if (!regId) missingFields.push("regId");
    if (!username) missingFields.push("ชื่อผู้ใช้งาน");
    if (!password) missingFields.push("password");



    if (missingFields.length > 0) {
      setAlertForm("warning");
      setInputForm(true);
      setCheckBody(`กรอกข้อมูลไม่ครบ: ${missingFields.join(", ")}`);
    } else {
      try {
        setAlertForm("primary");

        const data = {
          //regId,
          username,
          password,
        };

        // Execute the update
        const response = await executeRegisterFormPut({
          url: "/api/checkLogin/" + id,
          method: "PUT",
          data,
        });
        if (response && response.status === 200) {
          setAlertForm("success");
          setTimeout(() => {
            reloadPage();
          }, 3000);
        } else {
          setAlertForm("danger");
          throw new Error("Failed to update data");
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
        <meta name="description" content="T ACTIVE" />
        <link rel="icon" href="/favicon.ico" />
      </Head>






      <div className="RegisterForm-page">
        <Card>
          <EditModal
            checkAlertShow={alertForm}
            setCheckAlertShow={setAlertForm}
            checkBody={checkBody}
            pathBack={"/admin"}
          />

          <Card.Header className="d-flex space-between">
            <h4 className="mb-0 py-1">Admin - แก้ไขข้อมูล</h4>
          </Card.Header>




          <Card.Body>
            <Row>

              <Col md={4}>
                <FloatingLabel
                  controlId="username"
                  label="username / ชื่อผู้ใช้งาน"
                  className="mb-3"
                >
                  <Form.Control
                    isValid={inputForm && username !== ""}
                    isInvalid={inputForm && username === ""}
                    type="text"
                    value={username}
                    onChange={(e) => setusername(e.target.value)}
                    placeholder="username"
                  />
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel
                  controlId="password"
                  label="Password / รหัสผ่าน"
                  className="mb-3"
                >
                  <Form.Control
                    isValid={inputForm && password !== ""}
                    isInvalid={inputForm && password === ""}
                    type="text"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
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
    </LayOut>
  );
};
export default RegisterFormAdd;

function setAlertForm(arg0: string) {
  throw new Error("Function not implemented.");
}
function setInputForm(arg0: boolean) {
  throw new Error("Function not implemented.");
}

function setCheckBody(arg0: string) {
  throw new Error("Function not implemented.");
}
