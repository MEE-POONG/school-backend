import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from 'next/head';
import LayOut from "@/components/LayOut";
import { Button, Card, Col, Dropdown, FloatingLabel, Form, Image, Row } from "react-bootstrap";
// import BankSelect from "@/components/Input/Bankselect";
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
  const [subtitle, setsubtitle] = useState<string>("");
  const [detail, setdetail] = useState<string>("");
  const [img, setimg] = useState<string>("");
 /* const [img, setimg] = useState<string>("");*/
  const [alertForm, setAlertForm] = useState<string>("not");
  const [inputForm, setInputForm] = useState<boolean>(false);
  const [checkBody, setCheckBody] = useState<string>("");
 /* const [bankAccount, setBankAccount] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [line, setLine] = useState<string>("");
  const [email, setEmail] = useState<string>("");*/


  const handleInputChange = (setter: any) => (event: any) => {
    const newValue = event.target.value;
    if (!isNaN(newValue) && !newValue.includes('.')) {
      setter(newValue);
    }
  };

  const [
    { data: RegisterFormID, loading: RegisterFormIDLoading, error: RegisterFormIDError },
    executeRegisterFormID,
  ] = useAxios<{ data: RegisterForm; success: boolean }, any>({
    url: `/api/RegisterForm/${id}`,
    method: "GET",
  }, { autoCancel: false, manual: true });

  useEffect(() => {
    if (id) {
      executeRegisterFormID().then(({ data }) => {
        if (data?.data) {
          setregId(data?.data?.regId || "");
          setsubtitle(data?.data?.subtitle || "")
          setdetail(data?.data?.detail || "")
          setimg(data?.data?.img || "")
         /* setBank(data?.data?.bank || "")
          setBankAccount(data?.data?.bankAccount || "")
          setPhone(data?.data?.phone || "")
          setLine(data?.data?.line || "")
          setEmail(data?.data?.email || "")*/
        }
      });
    }
  }, [id]);

  const reloadPage = () => {
    executeRegisterFormID().then(({ data }) => {
      if (data?.data) {
        setregId(data?.data?.title || "");
        setsubtitle(data?.data?.subtitle || "")
        setdetail(data?.data?.detail || "")
        setimg(data?.data?.img || "")
       /*setUsername(data?.data?.username || "");
        setPassword(data?.data?.password || "")
        setFirstname(data?.data?.firstname || "")
        setLastname(data?.data?.lastname || "")
        setBank(data?.data?.bank || "")
        setBankAccount(data?.data?.bankAccount || "")
        setPhone(data?.data?.phone || "")
        setLine(data?.data?.line || "")
        setEmail(data?.data?.email || "")*/
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
        setimg(splittedString);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    let missingFields = [];
    if (!title) missingFields.push("title");
    if (!subtitle) missingFields.push("subtitle");
    if (!detail) missingFields.push("detail");
    if (!img) missingFields.push("img");
    /*if (!phone) missingFields.push("phone");
    if (!bank) missingFields.push("bank");
    if (!bankAccount) missingFields.push("bankAccount");
    if (!line) missingFields.push("line");*/

    if (missingFields.length > 0) {
      setAlertForm("warning");
      setInputForm(true);
      setCheckBody(`กรอกข้อมูลไม่ครบ: ${missingFields.join(', ')}`);
    } else {
      try {
        setAlertForm("primary");

        const data = {
          title,
          subtitle,
          detail,
          img,
        };


        // Execute the update
        const response = await executeRegisterFormPut({
          url: "/api/RegisterForm/" + id,
          method: "PUT",
          data
        });
        if (response && response.status === 200) {
          setAlertForm("success");
          setTimeout(() => {
            reloadPage();
          }, 5000);
        } else {
          setAlertForm("danger");
          throw new Error('Failed to update data');
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
      <div className='RegisterForm-page'>
        <Card>
          <EditModal checkAlertShow={alertForm} setCheckAlertShow={setAlertForm} checkBody={checkBody} />
          <Card.Header className="d-flex space-between">
            <h4 className="mb-0 py-1">
              RegisterForm - แก้ไขข้อมูล
            </h4>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={4}>
                <FloatingLabel controlId="title" label="title / ชื่อโปรโมชั่น" className="mb-3">
                  <Form.Control
                    isValid={inputForm && title !== ""}
                    isInvalid={inputForm && title === ""}
                    type="text"
                    value={title}
                    onChange={e => setregId(e.target.value)}
                    placeholder="name@example.com"
                  />
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel controlId="subtitle" label="subtitle / คำอธิบายย่อย" className="mb-3">
                  <Form.Control
                    isValid={inputForm && subtitle !== ""}
                    isInvalid={inputForm && subtitle === ""}
                    type="subtitle"
                    value={subtitle}
                    onChange={e => setsubtitle(e.target.value)}
                    placeholder="subtitle"
                  />
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel controlId="detail" label="detail / รายละเอียด" className="mb-3">
                  <Form.Control
                    isValid={inputForm && detail !== ""}
                    isInvalid={inputForm && detail === ""}
                    type="text"
                    value={detail}
                    onChange={e => setdetail(e.target.value)}
                    placeholder="detail"
                  />
                </FloatingLabel>
              </Col>

               <Col md={4}>
                <FloatingLabel controlId="img" label="img / รูปภาพ" className="mb-3">
                  <Form.Control
                    isValid={inputForm && img !== ""}
                    isInvalid={inputForm && img === ""}
                    type="file"
                    defaultValue={img}
                    onChange={handleFileUpload}
                    placeholder="img"/> 
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
            <Link href="/RegisterForm" className="btn btn-danger mx-2">
              ย้อนกลับ
            </Link>
          </Card.Footer>
        </Card>
      </div>
    </LayOut >
  );
}
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

