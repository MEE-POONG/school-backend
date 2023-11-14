import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from 'next/head';
import { Button, Card, Col, Dropdown, FloatingLabel, Form, Image, Row } from "react-bootstrap";
import EditModal from "@/components/modal/EditModal";
import useAxios from "axios-hooks";
import Link from "next/link";
import { HeadPage } from "@prisma/client";
import LayOut from "@/components/RootPage/TheLayOut";
import NewsSchoolPage from '../index';



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

  const [{ data: NewsSchoolData }, getNewsSchool] = useAxios({
    url: `/api/news/${id}`,
    method: "GET",
  });

  const reloadPage = () => {
    window.location.reload();
  };


  useEffect(() => {
    if (NewsSchoolData) {
      const {
        newName,
        newTitle,
        newSubTitle,
        newSubDetail,
        newDate,
        // ... (ตาม field อื่น ๆ)
      } = NewsSchoolData;

      setnewName(newName);
      setnewTitle(newTitle);
      setnewSubTitle(newSubTitle);
      setnewSubDetail(newSubDetail);
      setnewDate(newDate);
    }
  }, [NewsSchoolData]);


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
        <title>Phanomwan Backend</title>
        <meta
          name="description"
          content="T ACTIVE"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='NewsSchool-page'>
        <Card>
          <EditModal checkAlertShow={alertForm} setCheckAlertShow={setAlertForm} checkBody={checkBody} pathBack="/newsSchool" />
          <Card.Header className="d-flex space-between">
            <h4 className="mb-0 py-1">
              แก้ไขข้อมูล
            </h4>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={4}>
                <FloatingLabel controlId="NewsName" label="ชื่อข่าว * จำกัด 50 ตัวอักษร" className="mb-3" style={{ color: 'red' }}>
                  <Form.Control
                    isValid={inputForm && newName !== ""}
                    isInvalid={inputForm && newName === ""}
                    type="text"
                    value={newName}
                    onChange={e => {
                      const newValue = e.target.value;
                      if (newValue.length <= 50) {
                        setnewName(newValue);
                      }
                    }}
                    placeholder="name@example.com"
                  />
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel controlId="NewsTitle" label="หัวข้อข่าว" className="mb-3">
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
                <FloatingLabel controlId="NewsSubTitle" label="หัวข้อย่อยข่าว" className="mb-3">
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
                <FloatingLabel controlId="NewsDate" label="วันที่ " className="mb-3">
                  <Form.Control
                    isValid={inputForm && newDate !== ""}
                    isInvalid={inputForm && newDate === ""}
                    type="date"
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


            <Col md={8}>
              <FloatingLabel controlId="NewsSubDetail" label="รายละเอียดข่าว" className="mb-3">
                <Form.Control
                  as="textarea"
                  isValid={inputForm && newSubDetail !== ""}
                  isInvalid={inputForm && newSubDetail === ""}
                  // type="text"
                  value={newSubDetail}
                  onChange={e => setnewSubDetail(e.target.value)}
                  placeholder="NewsSubDetail"
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

