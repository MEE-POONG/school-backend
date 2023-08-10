import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from 'next/head';
import LayOut from "@/components/LayOut";
import { Button, Card, Col, Dropdown, FloatingLabel, Form, Image, Row } from "react-bootstrap";
// import BankSelect from "@/components/Input/Bankselect";
import EditModal from "@/components/modal/EditModal";
import useAxios from "axios-hooks";
import Link from "next/link";
import { IndexActivity } from "@prisma/client";



const IndexActivityAdd: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [
    { loading: updateIndexActivityLoading, error: updateIndexActivityError },
    executeIndexActivityPut,
  ] = useAxios({}, { manual: true });
  const [activityName, setactivityName] = useState<string>("");
  const [activityTitle, setactivityTitle] = useState<string>("");
  const [activityactivitySubDetail, setactivityactivitySubDetail] = useState<string>("");
  const [activitySubDetail, setactivitySubDetail] = useState<string>("");
  const [activityImg, setactivityImg] = useState<string>("");
  const [activityDate, setactivityDate] = useState<string>("");
  const [activityDescription, setactivityDescription] = useState<string>("");
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
    { data: IndexActivityID, loading: IndexActivityIDLoading, error: IndexActivityIDError },
    executeIndexActivityID,
  ] = useAxios<{ data: IndexActivity; success: boolean }, any>({
    url: `/api/IndexActivity/${id}`,
    method: "GET",
  }, { autoCancel: false, manual: true });

  useEffect(() => {
    if (id) {
      executeIndexActivityID().then(({ data }) => {
        if (data?.data) {
          setactivityName(data?.data?.activityName || "");
          setactivityTitle(data?.data?.activityTitle || "")
          setactivityactivitySubDetail(data?.data?.activitySubDetail || "")
          setactivitySubDetail(data?.data?.activitySubDetail || "")
          setactivityImg(data?.data?.activityImg || "")
          setactivityDate(data?.data?. activityDate || "")
          setactivityDescription(data?.data?.activityDescription || "")
        /*  setimg(data?.data?.img || "")
          setBank(data?.data?.bank || "")
          setBankAccount(data?.data?.bankAccount || "")
          setPhone(data?.data?.phone || "")
          setLine(data?.data?.line || "")
          setEmail(data?.data?.email || "")*/
        }
      });
    }
  }, [id]);

  const reloadPage = () => {
    executeIndexActivityID().then(({ data }) => {
      if (data?.data) {
        setactivityName(data?.data?.activityName || "");
          setactivityTitle(data?.data?.activityTitle || "")
          setactivityactivitySubDetail(data?.data?.activitySubDetail || "")
          setactivitySubDetail(data?.data?.activitySubDetail || "")
          setactivityImg(data?.data?.activityImg || "")
          setactivityDate(data?.data?. activityDate || "")
          setactivityDescription(data?.data?.activityDescription || "")
       /* setimg(data?.data?.img || "")
       setUsername(data?.data?.username || "");
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
        setactivityImg(splittedString);
      };
      reader.readAsDataURL(file);
    }
  };


  const handleSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    let missingFields = [];
    if (!activityName) missingFields.push("activityName");
    if (!activityTitle) missingFields.push("activityTitle");
    if (!activityactivitySubDetail) missingFields.push("activityactivitySubDetail"); 
    if (!activitySubDetail) missingFields.push("activitySubDetail");
    if (!activityImg) missingFields.push("activityImg");
    if (!activityDate) missingFields.push("activityDate"); 
    if (!activityDescription) missingFields.push("activityDescription");  
  // /*  if (!img) missingFields.push("img");
  //   if (!phone) missingFields.push("phone");
  //   if (!bank) missingFields.push("bank");
  //   if (!bankAccount) missingFields.push("bankAccount");
  //   if (!line) missingFields.push("line");*/

    if (missingFields.length > 0) {
      setAlertForm("warning");
      setInputForm(true);
      setCheckBody(`กรอกข้อมูลไม่ครบ: ${missingFields.join(', ')}`);
    } else {
      try {
        setAlertForm("primary");

        const data = {
            activityName,
            activityTitle,
            activityactivitySubDetail,
            activitySubDetail,
            activityImg,
            activityDate,
            activityDescription,
          /*img,*/
        };


        // Execute the update
        const response = await executeIndexActivityPut({
          url: "/api/IndexActivity/" + id,
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
      <div className='IndexActivity-page'>
        <Card>
          <EditModal checkAlertShow={alertForm} setCheckAlertShow={setAlertForm} checkBody={checkBody} />
          <Card.Header className="d-flex space-between">
            <h4 className="mb-0 py-1">
              IndexActivity - แก้ไขข้อมูล
            </h4>
          </Card.Header>
          <Card.Body>
            <Row>
            <Col md={4}>
                <FloatingLabel controlId="activityName" label="activityName / ชื่อรีวิว" className="mb-3">
                  <Form.Control
                    isValid={inputForm && activityName !== ""}
                    isInvalid={inputForm && activityName === ""}
                    type="text"
                    value={activityName}
                    onChange={e => setactivityName(e.target.value)}
                    placeholder="name@example.com"
                  />
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel controlId="activityTitle" label="activityTitle / บริการที่ใช้" className="mb-3">
                  <Form.Control
                    isValid={inputForm && activityTitle !== ""}
                    isInvalid={inputForm && activityTitle === ""}
                    type="title2"
                    value={activityTitle}
                    onChange={e => setactivityTitle(e.target.value)}
                    placeholder="title2"
                  />
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel controlId="activityactivitySubDetail" label="activityactivitySubDetail / หมวดหมู่" className="mb-3">
                  <Form.Control
                    isValid={inputForm && activityactivitySubDetail !== ""}
                    isInvalid={inputForm && activityactivitySubDetail === ""}
                    type="text"
                    value={activityactivitySubDetail}
                    onChange={e => setactivityactivitySubDetail(e.target.value)}
                    placeholder="activityactivitySubDetail"
                  />
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel controlId="activitySubDetail" label="activitySubDetail / หมวดหมู่" className="mb-3">
                  <Form.Control
                    isValid={inputForm && activitySubDetail !== ""}
                    isInvalid={inputForm && activitySubDetail === ""}
                    type="text"
                    value={activitySubDetail}
                    onChange={e => setactivitySubDetail(e.target.value)}
                    placeholder="activitySubDetail"
                  />
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel controlId="activityDate" label="activityDate / รายละเอียดรีวิว " className="mb-3">
                  <Form.Control
                    isValid={inputForm && activityDate !== ""}
                    isInvalid={inputForm && activityDate === ""}
                    type="text"
                    value={activityDate}
                    onChange={e => setactivityDate(e.target.value)}
                    placeholder="activityDate"
                  />
                </FloatingLabel>
              </Col>
             < Col md={4}>
                <FloatingLabel controlId="activityDescription" label="activityDescription / ผู้รีวิว" className="mb-3">
                  <Form.Control
                    isValid={inputForm && activityDescription !== ""}
                    isInvalid={inputForm && activityDescription === ""}
                    type="text"
                    value={activityDescription}
                    onChange={e => setactivityDescription(e.target.value)}
                    placeholder="activityDescription"
                  />
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel controlId="activityImg" label="activityImg / รูปภาพ" className="mb-3">
                  <Form.Control
                    isValid={inputForm && activityImg !== ""}
                    isInvalid={inputForm && activityImg === ""}
                    type="file"
                    defaultValue={activityImg}
                    onChange={handleFileUpload}
                    placeholder="activityImg"/> 
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
            <Link href="/IndexActivity" className="btn btn-danger mx-2">
              ย้อนกลับ
            </Link>
          </Card.Footer>
        </Card>
      </div>
    </LayOut >
  );
}
export default IndexActivityAdd;

function setAlertForm(arg0: string) {
  throw new Error("Function not implemented.");
}
function setInputForm(arg0: boolean) {
  throw new Error("Function not implemented.");
}

function setCheckBody(arg0: string) {
  throw new Error("Function not implemented.");
}

