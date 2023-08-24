import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import LayOut from "@/components/RootPage/TheLayOut";import {
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




const RegisterFormAdd: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [
    { loading: updateRegisterFormLoading, error: updateRegisterFormError },
    executeRegisterFormPut,
  ] = useAxios({}, { manual: true });
  const [regId, setregId] = useState<string>("");
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

  const [alertForm, setAlertForm] = useState<string>("not");
  const [inputForm, setInputForm] = useState<boolean>(false);
  const [checkBody, setCheckBody] = useState<string>("");



  const handleInputChange = (setter: any) => (event: any) => {
    const newValue = event.target.value;
    if (!isNaN(newValue) && !newValue.includes(".")) {
      setter(newValue);
    }
  };

  const [
    {
      data: RegisterFormID,
      loading: RegisterFormIDLoading,
      error: RegisterFormIDError,
    },
    executeRegisterFormID,
  ] = useAxios<{ RegisterForm: RegisterForm; success: boolean }, any>(
    {
      url: `/api/registerForm/${id}`,
      method: "GET",
    },
    { autoCancel: false, manual: true }
  );

  useEffect(() => {
    if (id) {
      executeRegisterFormID().then(({ data }) => {
        if (data?.RegisterForm) {
          setregId(data?.RegisterForm?.regId || "");
          setregIdpersonal(data?.RegisterForm?.regIdpersonal || "");
          setregBirth(data?.RegisterForm?.regBirth || "");
          setregPrefix(data?.RegisterForm?.regPrefix || "");
          setregSex(data?.RegisterForm?.regSex || "");
          setregNation(data?.RegisterForm?.regNation || "");
          setregName(data?.RegisterForm?.regName || "");
          setregLastname(data?.RegisterForm?.regLastname || "");
          setregEname(data?.RegisterForm?.regEname || "");
          setregElastname(data?.RegisterForm?.regElastname || "");
          setregPhone(data?.RegisterForm?.regPhone || "");
          setregEmail(data?.RegisterForm?.regEmail || "");
          //setregImg(data?.RegisterForm?.regImg || "");

        }
      });
    }
  }, [id]);

  const reloadPage = () => {
    executeRegisterFormID().then(({ data }) => {
      if (data?.RegisterForm) {
        setregId(data?.RegisterForm?.regId || "");
        setregIdpersonal(data?.RegisterForm?.regIdpersonal || "");
        setregBirth(data?.RegisterForm?.regBirth || "");
        setregPrefix(data?.RegisterForm?.regPrefix || "");
        setregSex(data?.RegisterForm?.regSex || "");
        setregNation(data?.RegisterForm?.regNation || "");
        setregName(data?.RegisterForm?.regName || "");
        setregLastname(data?.RegisterForm?.regLastname || "");
        setregEname(data?.RegisterForm?.regEname || "");
        setregElastname(data?.RegisterForm?.regElastname || "");
        setregPhone(data?.RegisterForm?.regPhone || "");
        setregEmail(data?.RegisterForm?.regEmail || "");
        //setregImg(null);

      }
    });
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
   // if (!regId) missingFields.push("regId");
    if (!regIdpersonal) missingFields.push("regIdpersonal");
    if (!regBirth) missingFields.push("regBirth");
    if (!regPrefix) missingFields.push("regPrefix");
    if (!regSex) missingFields.push("regSex");
    if (!regNation) missingFields.push("regNation");
    if (!regName) missingFields.push("regName");
    if (!regLastname) missingFields.push("regLastname");
    if (!regEname) missingFields.push("regEname");
    if (!regPhone) missingFields.push("regPhone");
    if (!regEmail) missingFields.push("regEmail");
    if (!regBirth) missingFields.push("regBirth");
    //if (!regImg) missingFields.push("regImg");
   

    if (missingFields.length > 0) {
      setAlertForm("warning");
      setInputForm(true);
      setCheckBody(`กรอกข้อมูลไม่ครบ: ${missingFields.join(", ")}`);
    } else {
      try {
        setAlertForm("primary");

        const data = {
          //regId,
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
         // regImg,
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
          }, 5000);
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
        <title>Wellcome | MePrompt-BackOffice</title>
        <meta name="description" content="T ACTIVE" />
        <link rel="icon" href="/favicon.ico" />
      </Head>






      <div className="RegisterForm-page">
        <Card>
          <EditModal
            checkAlertShow={alertForm}
            setCheckAlertShow={setAlertForm}
            checkBody={checkBody}
          />
          
          <Card.Header className="d-flex space-between">
            <h4 className="mb-0 py-1">RegisterForm - แก้ไขข้อมูล</h4>
          </Card.Header>




          <Card.Body>
            <Row>
             
              <Col md={4}>
                <FloatingLabel
                  controlId="regIdpersonal"
                  label="personal / รหัสบัตรประชาชน"
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
                  label="Birth / วันเกิด"
                  className="mb-3"
                >
                  <Form.Control
                    isValid={inputForm && regBirth !== ""}
                    isInvalid={inputForm && regBirth === ""}
                    type="text"
                    value={regBirth}
                    onChange={(e) => setregBirth(e.target.value)}
                    placeholder="regBirth"
                  />
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel
                  controlId="regPrefix"
                  label="Prefix / คำนำหน้า"
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
                  label="Sex / เพศ"
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
                  label="Nation / สัญชาติ"
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
                  label="Name / ชื่อ"
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
                  label="Lastname / นามสกุล"
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
                  label="Phone / เบอร์โทรศัพท์"
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
                  label="Email / อีเมล"
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
