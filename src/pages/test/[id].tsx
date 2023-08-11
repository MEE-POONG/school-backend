import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import LayOut from "@/components/LayOut";
import {
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




const Registertest: React.FC = () => {
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
  const [regImg, setregImg] = useState<string>("");

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
          setregImg(data?.RegisterForm?.regImg || "");

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
        setregImg(data?.RegisterForm?.regImg || "");

      }
    });
  };
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const splittedString = base64String.split(",")[1]; // ตัดส่วน "data:image/png;base64," ออก
        setregImg(splittedString);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    let missingFields = [];
    if (!regId) missingFields.push("regId");
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
    if (!regImg) missingFields.push("regImg");
   

    if (missingFields.length > 0) {
      setAlertForm("warning");
      setInputForm(true);
      setCheckBody(`กรอกข้อมูลไม่ครบ: ${missingFields.join(", ")}`);
    } else {
      try {
        setAlertForm("primary");

        const data = {
          regId,
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
          regImg,
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
                  controlId="regId"
                  label="Id / รหัส"
                  className="mb-3"
                >
                  <Form.Control
                    isValid={inputForm && regId !== ""}
                    isInvalid={inputForm && regId === ""}
                    type="text"
                    value={regId}
                    onChange={(e) => setregId(e.target.value)}
                    placeholder="name@example.com"
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
                  
                  />
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
            <Link href="/registerform" className="btn btn-danger mx-2">
              ย้อนกลับ
            </Link>
          </Card.Footer>
        </Card>
      </div>
    </LayOut>
  );
};
export default Registertest;

function setAlertForm(arg0: string) {
  throw new Error("Function not implemented.");
}
function setInputForm(arg0: boolean) {
  throw new Error("Function not implemented.");
}

function setCheckBody(arg0: string) {
  throw new Error("Function not implemented.");
}
