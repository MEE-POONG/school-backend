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
import { RegisterForm } from "@prisma/client";




const RegisterFormEditPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [
    { loading: updateRegisterFormLoading, error: updateRegisterFormError },
    executeRegisterFormPut,
  ] = useAxios({}, { manual: true });
  const [regIdpersonal, setregIdpersonal] = useState<string>("");
  const [regBirth, setregBirth] = useState<string>("");
  const [regPrefix, setregPrefix] = useState<string>("");
  const [regSex, setregSex] = useState<string>("");
  const [regNation, setregNation] = useState<string>("");
  const [regName, setregName] = useState<string>("");
  const [regLastname, setregLastname] = useState<string>("");
  const [regEname, setregEname] = useState<string>("");
  const [regElastname, setregElastname] = useState<string>("");
  const [regPhone, setregPhone] = useState<string>("");
  const [regEmail, setregEmail] = useState<string>("");
  const [regImg, setregImg] = useState<File | null>(null);


  const [regSchool, setregSchool] = useState<string>("");
  const [regDegree, setregDegree] = useState<string>("");
  const [regGpa, setregGpa] = useState<string>("");
  const [regProgram, setregProgram] = useState<string>("");
  const [regFaculty, setregFaculty] = useState<string>("");
  const [regMajor, setregMajor] = useState<string>("");

  const [alertForm, setAlertForm] = useState<string>("not");
  const [inputForm, setInputForm] = useState<boolean>(false);
  const [checkBody, setCheckBody] = useState<string>("");

  const [{ data: registerFormData }, getregisterForm] = useAxios({
    url: `/api/registerForm/${id}`,
    method: "GET",
  });

  useEffect(() => {
    if (registerFormData) {
      const {
        regIdpersonal,
        regBirth,
        regPrefix,
        regSex,
        regNation,
        regName,
        regLastname,
        regEname,
        regElastname,
        regPhone,
        regEmail,

        regSchool,
        regDegree,
        regGpa,
        regProgram,
        regFaculty,
        regMajor,
        // ... (ตาม field อื่น ๆ)
      } = registerFormData;

      setregIdpersonal(regIdpersonal);
      setregBirth(regBirth);
      setregPrefix(regPrefix);
      setregSex(regSex);
      setregNation(regNation);
      setregName(regName);
      setregLastname(regLastname);
      setregEname(regEname);
      setregElastname(regElastname);
      setregPhone(regPhone);
      setregEmail(regEmail);

      setregSchool(regSchool);
      setregDegree(regDegree);
      setregGpa(regGpa);
      setregProgram(regProgram);
      setregFaculty(regFaculty);
      setregMajor(regMajor);

      // ... (กำหนดค่า state อื่น ๆ)
    }
  }, [registerFormData]);

  const reloadPage = () => {
    router.reload();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setregImg(file); // Store the File object
    }
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    let missingFields = [];

    if (!regIdpersonal) missingFields.push("รหัสบัตรประชาชน");
    if (!regBirth) missingFields.push("วันเกิด");
    if (!regPrefix) missingFields.push("คำนำหน้า");
    if (!regSex) missingFields.push("เพศ");
    if (!regNation) missingFields.push("สัญชาติ");
    if (!regName) missingFields.push("ชื่อ");
    if (!regLastname) missingFields.push("นามสกุล");
    if (!regEname) missingFields.push("ชื่อภาษาอังกฤษ");
    if (!regElastname) missingFields.push("นามสกุลภาษาอังกฤษ");
    if (!regPhone) missingFields.push("เบอร์โทรศัพท์");
    if (!regEmail) missingFields.push("อีเมล");

    if (!regSchool) missingFields.push("สถาบันการศึกษา");
    if (!regDegree) missingFields.push("สำเร็จการศึกษาระดับ");
    if (!regGpa) missingFields.push("เกรดเฉลี่ย");
    if (!regProgram) missingFields.push("หลักสูตร");
    if (!regFaculty) missingFields.push("คณะ");
    if (!regMajor) missingFields.push("สาขา");
    //if (!regImg) missingFields.push("regImg");


    if (missingFields.length > 0) {
      setAlertForm("warning");
      setInputForm(true);
      setCheckBody(`กรอกข้อมูลไม่ครบ: ${missingFields.join(", ")}`);
    } else {
      try {
        setAlertForm("primary");

        const data = {
          regIdpersonal,
          regBirth,
          regPrefix,
          regSex,
          regNation,
          regName,
          regLastname,
          regEname,
          regElastname,
          regPhone,
          regEmail,

          regSchool,
          regDegree,
          regGpa,
          regProgram,
          regFaculty,
          regMajor,
        };

        // Execute the update
        const response = await executeRegisterFormPut({
          url: "/api/registerForm/" + id,
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
            pathBack={"/registerform"}

            
          />

          <Card.Header className="d-flex space-between">
            <h4 className="mb-0 py-1">แก้ไขข้อมูล</h4>
          </Card.Header>




          <Card.Body>
            <Row>

              <Col md={4}>
                <FloatingLabel
                  controlId="regIdpersonal"
                  label="รหัสบัตรประชาชน"
                  className="mb-3"
                >
                  <Form.Control
                    isValid={inputForm && regIdpersonal !== ""}
                    isInvalid={inputForm && regIdpersonal === ""}
                    type="regIdpersonal"
                    value={regIdpersonal}
                    onChange={(e) => setregIdpersonal(e.target.value)}
                    placeholder="regIdpersonal"
                  />
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel
                  controlId="regBirth"
                  label="วันเกิด"
                  className="mb-3"
                >
                  <Form.Control
                    isValid={inputForm && regBirth !== ""}
                    isInvalid={inputForm && regBirth === ""}
                    type="date"
                    value={regBirth}
                    onChange={(e) => setregBirth(e.target.value)}
                    placeholder="regBirth"
                  />
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel
                  controlId="regPrefix"
                  label="คำนำหน้า"
                  className="mb-3"
                >
                  <Form.Control
                    isValid={inputForm && regPrefix !== ""}
                    isInvalid={inputForm && regPrefix === ""}
                    type="text"
                    value={regPrefix}
                    onChange={(e) => setregPrefix(e.target.value)}
                    placeholder="regPrefix"
                  />
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel
                  controlId="regSex"
                  label="เพศ"
                  className="mb-3"
                >
                  <Form.Control
                    isValid={inputForm && regSex !== ""}
                    isInvalid={inputForm && regSex === ""}
                    type="text"
                    value={regSex}
                    onChange={(e) => setregSex(e.target.value)}
                    placeholder="regSex"
                  />
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel
                  controlId="regNation"
                  label="สัญชาติ"
                  className="mb-3"
                >
                  <Form.Control
                    isValid={inputForm && regNation !== ""}
                    isInvalid={inputForm && regNation === ""}
                    type="text"
                    value={regNation}
                    onChange={(e) => setregNation(e.target.value)}
                    placeholder="regNation"
                  />
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel
                  controlId="regName"
                  label="ชื่อ"
                  className="mb-3"
                >
                  <Form.Control
                    isValid={inputForm && regName !== ""}
                    isInvalid={inputForm && regName === ""}
                    type="text"
                    value={regName}
                    onChange={(e) => setregName(e.target.value)}
                    placeholder="regName"
                  />
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel
                  controlId="regLastname"
                  label="นามสกุล"
                  className="mb-3"
                >
                  <Form.Control
                    isValid={inputForm && regLastname !== ""}
                    isInvalid={inputForm && regLastname === ""}
                    type="text"
                    value={regLastname}
                    onChange={(e) => setregLastname(e.target.value)}
                    placeholder="regLastname"
                  />
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel
                  controlId="regEname"
                  label="ชื่อภาษาอังกฤษ"
                  className="mb-3"
                >
                  <Form.Control
                    isValid={inputForm && regEname !== ""}
                    isInvalid={inputForm && regEname === ""}
                    type="text"
                    value={regEname}
                    onChange={(e) => setregEname(e.target.value)}
                    placeholder="regEname"
                  />
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel
                  controlId="regElastname"
                  label=" นามสกุลภาษาอังกฤษ"
                  className="mb-3"
                >
                  <Form.Control
                    isValid={inputForm && regElastname !== ""}
                    isInvalid={inputForm && regElastname === ""}
                    type="text"
                    value={regElastname}
                    onChange={(e) => setregElastname(e.target.value)}
                    placeholder="regElastname"
                  />
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel
                  controlId="regPhone"
                  label="เบอร์โทรศัพท์"
                  className="mb-3"
                >
                  <Form.Control
                    isValid={inputForm && regPhone !== ""}
                    isInvalid={inputForm && regPhone === ""}
                    type="text"
                    value={regPhone}
                    onChange={(e) => setregPhone(e.target.value)}
                    placeholder="regPhone"
                  />
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel
                  controlId="regEmail"
                  label="อีเมล"
                  className="mb-3"
                >
                  <Form.Control
                    isValid={inputForm && regEmail !== ""}
                    isInvalid={inputForm && regEmail === ""}
                    type="text"
                    value={regEmail}
                    onChange={(e) => setregEmail(e.target.value)}
                    placeholder="regEmail"
                  />
                </FloatingLabel>
              </Col>

              <Col md={4}>
                <FloatingLabel
                  controlId="regSchool"
                  label="สถาบันการศึกษา"
                  className="mb-3"
                >
                  <Form.Control
                    isValid={inputForm && regSchool !== ""}
                    isInvalid={inputForm && regSchool === ""}
                    type="text"
                    value={regSchool}
                    onChange={(e) => setregSchool(e.target.value)}
                    placeholder="regSchool"
                  />
                </FloatingLabel>
              </Col>


              <Col md={4}>
                <FloatingLabel
                  controlId="regDegree"
                  label="สำเร็จการศึกษาระดับ"
                  className="mb-3"
                >
                  <Form.Control
                    isValid={inputForm && regDegree !== ""}
                    isInvalid={inputForm && regDegree === ""}
                    type="text"
                    value={regDegree}
                    onChange={(e) => setregDegree(e.target.value)}
                    placeholder="regDegree"
                  />
                </FloatingLabel>
              </Col>



              <Col md={4}>
                <FloatingLabel
                  controlId="regGpa"
                  label="เกรดเฉลี่ย"
                  className="mb-3"
                >
                  <Form.Control
                    isValid={inputForm && regGpa !== ""}
                    isInvalid={inputForm && regGpa === ""}
                    type="text"
                    value={regGpa}
                    onChange={(e) => setregGpa(e.target.value)}
                    placeholder="regGpa"
                  />
                </FloatingLabel>
              </Col>

              <Col md={4}>
                <FloatingLabel
                  controlId="regProgram"
                  label="หลักสูตร"
                  className="mb-3"
                >
                  <Form.Control
                    isValid={inputForm && regProgram !== ""}
                    isInvalid={inputForm && regProgram === ""}
                    type="text"
                    value={regProgram}
                    onChange={(e) => setregProgram(e.target.value)}
                    placeholder="regProgram"
                  />
                </FloatingLabel>
              </Col>


              <Col md={4}>
                <FloatingLabel
                  controlId="regFaculty"
                  label="คณะ"
                  className="mb-3"
                >
                  <Form.Control
                    isValid={inputForm && regFaculty !== ""}
                    isInvalid={inputForm && regFaculty === ""}
                    type="text"
                    value={regFaculty}
                    onChange={(e) => setregFaculty(e.target.value)}
                    placeholder="regFaculty"
                  />
                </FloatingLabel>
              </Col>


              <Col md={4}>
                <FloatingLabel
                  controlId="regMajor"
                  label="สาขา"
                  className="mb-3"
                >
                  <Form.Control
                    isValid={inputForm && regMajor !== ""}
                    isInvalid={inputForm && regMajor === ""}
                    type="text"
                    value={regMajor}
                    onChange={(e) => setregMajor(e.target.value)}
                    placeholder="regMajor"
                  />
                </FloatingLabel>
              </Col>

              {/* <Col md={4}>
                <FloatingLabel
                  controlId="regImg"
                  label="Img / รูปภาพผู้สมัคร"
                  className="mb-3"
                >
                  <Form.Control
                    isValid={inputForm && regImg !== null}
                    isInvalid={inputForm && regImg === null}
                    type="file"
                   // defaultValue={regImg}
                    onChange={handleFileUpload}
                    placeholder="regImg"
                  />
                </FloatingLabel>
              </Col> */}








            </Row>
          </Card.Body>
          <Card.Footer className="text-end">
            <Button variant="success mx-2" onClick={handleSubmit}>
              ยืนยัน
            </Button>
            {/* <Button variant="primary mx-2" onClick={reloadPage}>
              ล้าง
            </Button> */}
            <Link href="/registerform" className="btn btn-danger mx-2">
              ย้อนกลับ
            </Link>
          </Card.Footer>
        </Card>
      </div>
    </LayOut>
  );
};
export default RegisterFormEditPage;

function setAlertForm(arg0: string) {
  throw new Error("Function not implemented.");
}
function setInputForm(arg0: boolean) {
  throw new Error("Function not implemented.");
}

function setCheckBody(arg0: string) {
  throw new Error("Function not implemented.");
}
