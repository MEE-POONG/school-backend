import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from 'next/head';
import { Button, Card, Col, Dropdown, FloatingLabel, Form, Image, Row } from "react-bootstrap";
// import BankSelect from "@/components/Input/Bankselect";
import EditModal from "@/components/modal/EditModal";
import useAxios from "axios-hooks";
import Link from "next/link";
import { ActivitySchool } from "@prisma/client";
import LayOut from "@/components/RootPage/TheLayOut";



const ActivityEdit: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [
    { loading: updateIndexActivityLoading, error: updateIndexActivityError },
    executeIndexActivityPut,
  ] = useAxios({}, { manual: true });
  const [activityName, setactivityName] = useState<string>("");
  const [activityTitle, setactivityTitle] = useState<string>("");
  const [activitySubTitle, setactivitySubTitle] = useState<string>("");
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
  ] = useAxios<{ data: ActivitySchool; success: boolean }, any>({
    url: `/api/activity/${id}`,
    method: "GET",
  }, { autoCancel: false, manual: true });

  useEffect(() => {
    if (id) {
      executeIndexActivityID().then(({ data }) => {
        if (data?.data) {
          setactivityName(data?.data?.activityName || "");
          setactivityTitle(data?.data?.activityTitle || "")
          setactivitySubTitle(data?.data?.activitySubDetail || "")
          setactivitySubDetail(data?.data?.activitySubDetail || "")
          setactivityImg(data?.data?.activityImg || "")
          setactivityDate(data?.data?.activityDate || "")
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
        setactivitySubTitle(data?.data?.activitySubDetail || "")
        setactivitySubDetail(data?.data?.activitySubDetail || "")
        setactivityImg(data?.data?.activityImg || "")
        setactivityDate(data?.data?.activityDate || "")
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
    if (!activitySubTitle) missingFields.push("activitySubTitle");
    if (!activitySubDetail) missingFields.push("activitySubDetail");
    // if (!activityImg) missingFields.push("activityImg");
    if (!activityDate) missingFields.push("activityDate");
    // if (!activityDescription) missingFields.push("activityDescription");  

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
          activitySubTitle,
          activitySubDetail,
          // activityImg,
          activityDate,
          // activityDescription,
          /*img,*/
        };


        // Execute the update
        const response = await executeIndexActivityPut({
          url: "/api/activity/" + id,
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
        <title>Phanomwan Backend</title>
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
              แก้ไขข้อมูล
            </h4>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={4}>
                <FloatingLabel controlId="activityName" label="ชื่อกิจกรรม * จำกัด 50 ตัวอักษร" className="mb-3" style={{ color: 'red' }}>
                  <Form.Control
                    isValid={inputForm && activityName !== ""}
                    isInvalid={inputForm && activityName === ""}
                    type="text"
                    value={activityName}
                    onChange={e => {
                      const newValue = e.target.value;
                      if (newValue.length <= 50) {
                        setactivityName(newValue);
                      }
                    }}
                    placeholder="name@example.com"
                  />
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel controlId="activityTitle" label="หัวข้อข่าว" className="mb-3">
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
                <FloatingLabel controlId="activitySubTitle" label="หัวข้อย่อยข่าว" className="mb-3">
                  <Form.Control
                    isValid={inputForm && activitySubTitle !== ""}
                    isInvalid={inputForm && activitySubTitle === ""}
                    type="text"
                    value={activitySubTitle}
                    onChange={e => setactivitySubTitle(e.target.value)}
                    placeholder="activitySubTitle"
                  />
                </FloatingLabel>
              </Col>

              <Col md={4}>
                <FloatingLabel controlId="activityDate" label="วันที่" className="mb-3">
                  <Form.Control
                    isValid={inputForm && activityDate !== ""}
                    isInvalid={inputForm && activityDate === ""}
                    type="date"
                    value={activityDate}
                    onChange={e => setactivityDate(e.target.value)}
                    placeholder="activityDate"
                  />
                </FloatingLabel>
              </Col>
              {/* < Col md={4}>
                <FloatingLabel controlId="activityDescription" label="คําอธิบายข่าว" className="mb-3">
                  <Form.Control
                    isValid={inputForm && activityDescription !== ""}
                    isInvalid={inputForm && activityDescription === ""}
                    type="text"
                    value={activityDescription}
                    onChange={e => setactivityDescription(e.target.value)}
                    placeholder="activityDescription"
                  />
                </FloatingLabel>
              </Col> */}
              {/* <Col md={4}>
                <FloatingLabel controlId="activityImg" label="activityImg / รูปภาพ" className="mb-3">
                  <Form.Control
                    isValid={inputForm && activityImg !== ""}
                    isInvalid={inputForm && activityImg === ""}
                    type="file"
                    defaultValue={activityImg}
                    onChange={handleFileUpload}
                    placeholder="activityImg"/> 
                </FloatingLabel>
              </Col> */}




            </Row>



            <Col md={8}>
              <FloatingLabel controlId="activitySubDetail" label="รายละเอียดกิจกรรม" className="mb-3">
                <Form.Control
                  as="textarea"
                  isValid={inputForm && activitySubDetail !== ""}
                  isInvalid={inputForm && activitySubDetail === ""}
                  // type="text"
                  value={activitySubDetail}
                  onChange={e => setactivitySubDetail(e.target.value)}
                  placeholder="activitySubDetail"
                  style={{ width: "100%", height: "200px" }} // Adjust the height as needed
                />
              </FloatingLabel>
            </Col>



          </Card.Body>
          <Card.Footer className="text-end">
            <Button variant="success mx-2" onClick={handleSubmit}>
              ยืนยัน
            </Button>
            {/* <Button variant="primary mx-2" onClick={reloadPage}>
              ล้าง
            </Button> */}
            <Link href="/activity" className="btn btn-danger mx-2">
              ย้อนกลับ
            </Link>
          </Card.Footer>
        </Card>
      </div>
    </LayOut >
  );
}
export default ActivityEdit;

function setAlertForm(arg0: string) {
  throw new Error("Function not implemented.");
}
function setInputForm(arg0: boolean) {
  throw new Error("Function not implemented.");
}

function setCheckBody(arg0: string) {
  throw new Error("Function not implemented.");
}

