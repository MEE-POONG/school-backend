import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from 'next/head';
import { Button, Card, Col, Dropdown, FloatingLabel, Form, Image, Row } from "react-bootstrap";
// import BankSelect from "@/components/Input/Bankselect";
import EditModal from "@/components/modal/EditModal";
import useAxios from "axios-hooks";
import Link from "next/link";
import { NewsSchool } from "@prisma/client";
import LayOut from "@/components/RootPage/TheLayOut";



const NewsSchoolAdd: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [
    { loading: updateNewsSchoolLoading, error: updateNewsSchoolError },
    executeNewsSchoolPut,
  ] = useAxios({}, { manual: true });
  const [newName, setnewName] = useState<string>("");
  const [newTitle, setnewTitle] = useState<string>("");
  const [newSubTitle, setnewSubTitle] = useState<string>("");
  const [newSubDetail, setnewSubDetail] = useState<string>("");
  const [newImg, setnewImg] = useState<string>("");
  const [newDate, setnewDate] = useState<string>("");
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

  // const [
  //   { data: NewsSchoolID, loading: NewsSchoolIDLoading, error: NewsSchoolIDError },
  //   executeNewsSchoolID,
  // ] = useAxios<{ data: NewsSchool; success: boolean }, any>({
  //   url: `/api/news/${id}`,
  //   method: "GET",
  // }, { autoCancel: false, manual: true });

  // useEffect(() => {
  //   if (id) {
  //     executeNewsSchoolID().then(({ data }) => {
  //       if (data?.data) {
  //         setnewName(data?.data?.newName || "");
  //         setnewTitle(data?.data?.newTitle || "")
  //         setnewSubTitle(data?.data?.newSubDetail || "")
  //         setnewSubDetail(data?.data?.newSubDetail || "")
  //         setnewImg(data?.data?.newImg || "")
  //         setnewDate(data?.data?.newDate || "")
  //       /*  setimg(data?.data?.img || "")
  //         setBank(data?.data?.bank || "")
  //         setBankAccount(data?.data?.bankAccount || "")
  //         setPhone(data?.data?.phone || "")
  //         setLine(data?.data?.line || "")
  //         setEmail(data?.data?.email || "")*/
  //       }
  //     });
  //   }
  // }, [id]);

  // const reloadPage = () => {
  //   executeNewsSchoolID().then(({ data }) => {
  //     if (data?.data) {
  //       setnewName(data?.data?.newName || "");
  //         setnewTitle(data?.data?.newTitle || "")
  //         setnewSubTitle(data?.data?.newSubDetail || "")
  //         setnewSubDetail(data?.data?.newSubDetail || "")
  //         setnewImg(data?.data?.newImg || "")
  //         setnewDate(data?.data?.newDate || "")
  //      /* setimg(data?.data?.img || "")
  //      setUsername(data?.data?.username || "");
  //       setPassword(data?.data?.password || "")
  //       setFirstname(data?.data?.firstname || "")
  //       setLastname(data?.data?.lastname || "")
  //       setBank(data?.data?.bank || "")
  //       setBankAccount(data?.data?.bankAccount || "")
  //       setPhone(data?.data?.phone || "")
  //       setLine(data?.data?.line || "")
  //       setEmail(data?.data?.email || "")*/
  //     }
  //   });
  // };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const splittedString = base64String.split(",")[1]; // ตัดส่วน "data:image/png;base64," ออก
        setnewImg(splittedString);
      };
      reader.readAsDataURL(file);
    }
  };


  const handleSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    let missingFields = [];
    if (!newName) missingFields.push("NewsName");
    if (!newTitle) missingFields.push("NewsTitle");
    if (!newSubTitle) missingFields.push("NewsSubTitle"); 
    if (!newSubDetail) missingFields.push("NewsSubDetail");
    // if (!newImg) missingFields.push("NewsImg");
    if (!newDate) missingFields.push("NewsDate"); 
  
    if (missingFields.length > 0) {
      setAlertForm("warning");
      setInputForm(true);
      setCheckBody(`กรอกข้อมูลไม่ครบ: ${missingFields.join(', ')}`);
    } else {
      try {
        setAlertForm("primary");

        const data = {
            newName,
            newTitle,
            newSubTitle,
            newSubDetail,
            // newImg,
            newDate,
          /*img,*/
        };


        // Execute the update
        const response = await executeNewsSchoolPut({
          url: "/api/news/" + id,
          method: "PUT",
          data
        });
        if (response && response.status === 200) {
          setAlertForm("success");
          setTimeout(() => {
            // reloadPage();
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
      <div className='NewsSchool-page'>
        <Card>
          <EditModal checkAlertShow={alertForm} setCheckAlertShow={setAlertForm} checkBody={checkBody} />
          <Card.Header className="d-flex space-between">
            <h4 className="mb-0 py-1">
              NewsSchool - แก้ไขข้อมูล
            </h4>
          </Card.Header>
          <Card.Body>
            <Row>
            <Col md={4}>
                <FloatingLabel controlId="NewsName" label="NewsName / ชื่อข่าว" className="mb-3">
                  <Form.Control
                    isValid={inputForm && newName !== ""}
                    isInvalid={inputForm && newName === ""}
                    type="text"
                    value={newName}
                    onChange={e => setnewName(e.target.value)}
                    placeholder="name@example.com"
                  />
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel controlId="NewsTitle" label="NewsTitle / หัวข้อข่าว" className="mb-3">
                  <Form.Control
                    isValid={inputForm && newTitle !== ""}
                    isInvalid={inputForm && newTitle === ""}
                    type="title2"
                    value={newTitle}
                    onChange={e => setnewTitle(e.target.value)}
                    placeholder="title2"
                  />
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel controlId="NewsSubTitle" label="NewsSubTitle / หัวข้อย่อยข่าว" className="mb-3">
                  <Form.Control
                    isValid={inputForm && newSubTitle !== ""}
                    isInvalid={inputForm && newSubTitle === ""}
                    type="text"
                    value={newSubTitle}
                    onChange={e => setnewSubTitle(e.target.value)}
                    placeholder="NewsSubTitle"
                  />
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel controlId="NewsSubDetail" label="NewsSubDetail / รายละเอียดข่าว" className="mb-3">
                  <Form.Control
                    isValid={inputForm && newSubDetail !== ""}
                    isInvalid={inputForm && newSubDetail === ""}
                    type="text"
                    value={newSubDetail}
                    onChange={e => setnewSubDetail(e.target.value)}
                    placeholder="NewsSubDetail"
                  />
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel controlId="NewsDate" label="NewsDate / วันที่ ข่าว " className="mb-3">
                  <Form.Control
                    isValid={inputForm && newDate !== ""}
                    isInvalid={inputForm && newDate === ""}
                    type="text"
                    value={newDate}
                    onChange={e => setnewDate(e.target.value)}
                    placeholder="NewsDate"
                  />
                </FloatingLabel>
              </Col>
        
              {/* <Col md={4}>
                <FloatingLabel controlId="NewsImg" label="NewsImg / รูปภาพ" className="mb-3">
                  <Form.Control
                    isValid={inputForm && newImg !== ""}
                    isInvalid={inputForm && newImg === ""}
                    type="file"
                    defaultValue={newImg}
                    onChange={handleFileUpload}
                    placeholder="NewsImg"/> 
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
            <Link href="/newsSchool" className="btn btn-danger mx-2">
              ย้อนกลับ
            </Link>
          </Card.Footer>
        </Card>
      </div>
    </LayOut >
  );
}
export default NewsSchoolAdd;

function setAlertForm(arg0: string) {
  throw new Error("Function not implemented.");
}
function setInputForm(arg0: boolean) {
  throw new Error("Function not implemented.");
}

function setCheckBody(arg0: string) {
  throw new Error("Function not implemented.");
}

