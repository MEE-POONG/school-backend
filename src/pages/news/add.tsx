import React, { useEffect, useState } from "react";
import { News as PrismaNews, NewsType as PrismaNewsType } from '@prisma/client';
import useAxios from "axios-hooks";
import LayOut from "@/components/RootPage/TheLayOut";
import { Button, Card, Col, Dropdown, FloatingLabel, Form, FormLabel, Image, Row } from "react-bootstrap";
import { CKEditor } from "ckeditor4-react";
import ImageUploadAlbum from "@/container/ImageUploadAlbum";
// import { News } from "@prisma/client";

interface NewsType extends PrismaNewsType {
}
interface News extends PrismaNews {
  NewsType: NewsType;
}

const NewsAdd: React.FC = (props) => {

  const [formData, setFormData] = useState<News | null>();
  const [imgOne, setImgOne] = useState<File | null>(null);
  const [imgTwo, setImgTwo] = useState<File | null>(null);

  const [imgOnePreview, setImgOnePreview] = useState<string | null>(null);
  const [imgTwoPreview, setImgTwoPreview] = useState<string | null>(null);

  const [type, setType] = useState<NewsType[]>([]);
  const [{ data: newsType, loading: loadingType, error: errorType }, getNewsType] = useAxios({
    url: `/api/NewsType`,
    method: "GET",
  });

  useEffect(() => {
    setType(newsType?.data);
  }, [newsType]);

  const handleInputChange = (title: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [title]: value
    }));
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, setImage: React.Dispatch<React.SetStateAction<File | null>>, setPreview: React.Dispatch<React.SetStateAction<string | null>>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const splittedString = base64String.split(",")[1];
        setPreview(splittedString); // Update the state with the base64 image data
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  // const [title, setTitle] = useState<string>("");
  // const [type, setType] = useState<string>("");
  // const [startDate, setStartDate] = useState<string>("");
  // const [endDate, setEndDate] = useState<string>("");
  // const [img, setImg] = useState<string | null>(null);
  // const [promoteImg, setPromoteImg] = useState<string | null>(null);
  // const [subTitle, setSubTitle] = useState<string>("");
  // const [detail, setDetail] = useState<string>("");

  // const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, setImage: React.Dispatch<React.SetStateAction<string | null>>) => {
  //   const file = event.target.files && event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       const base64String = reader.result as string;
  //       const splittedString = base64String.split(",")[1];
  //       setImage(splittedString); // Update the state with the base64 image data
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // const handleEditorChange = (e: any) => {
  //   const newContent = e.editor.getData();
  //   setDetail(newContent);
  // };

  // const handleSubmit = async (event: React.MouseEvent<HTMLElement>) => {
  //   event.preventDefault();
  //   event.stopPropagation();

  // };
  return (
    <LayOut>

      <div className='NewsSchool-page'>
        <Card>
          {/* <AddModal checkAlertShow={alertForm} setCheckAlertShow={setAlertForm} checkBody={checkBody} pathBack={"/newsSchool"} /> */}
          <Card.Header className="d-flex space-between">
            <h4 className="mb-0 py-1">
              เพิ่มข่าว / กิจกรรม
            </h4>
          </Card.Header>
          <Card.Body className="overflow-x-hidden">
            <Row>
              <Col md={4}>
                <FloatingLabel controlId="title" label="ระบุหัวข้อข่าว" className="mb-3" >
                  <Form.Control
                    // isValid={inputForm && formData?.title !== ""}
                    // isInvalid={inputForm && formData?.title === ""}
                    type="text"
                    defaultValue={formData?.title || ""}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="ระบุหัวข้อ"
                  />
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel controlId="subTitle" label="ระบุหัวข้อข่าว" className="mb-3" >
                  <Form.Control
                    // isValid={inputForm && formData?.subTitle !== ""}
                    // isInvalid={inputForm && formData?.subTitle === ""}
                    type="text"
                    defaultValue={formData?.subTitle || ""}
                    onChange={(e) => handleInputChange("subTitle", e.target.value)}
                    placeholder="ระบุหัวข้อ"
                  />
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel controlId="floatingSelect" label="เลือกประเภทข่าวสาร">
                  <Form.Select aria-label="Floating label select example"
                    onChange={(e) => handleInputChange("newsTypeId", e.target.value)}
                  >
                    {type?.map((list, index) => (
                      <option key={index} value={list?.id}>{list?.nameTH}</option>
                    ))}

                  </Form.Select>
                </FloatingLabel>
              </Col>
            </Row>
            <Row>
              <Col md={5}>
                <FormLabel>รูปปก</FormLabel>
                <FloatingLabel controlId="img" label="รูปภาพเกี่ยวกัวเรา" className="mb-3">
                  <Form.Control
                    type="file"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleFileUpload(event, setImgOne, setImgOnePreview)}
                  />
                </FloatingLabel>
                <div className='ratio img-preview ratio-16x9 bg-dark'>
                  <img
                    src={imgOnePreview ? `data:image/jpeg;base64,${imgOnePreview}` : `https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/4500f404-dbac-40f3-6696-ae768a38e800/500`}
                    alt="Image Two Preview"
                    className="w-100 object-fit-contain"
                    loading="lazy"
                  />
                </div>
              </Col>
              <Col md={7}>
                <FormLabel>รูปโปรโมท</FormLabel>
                <FloatingLabel controlId="imgTwo" label="โลโก้" className="mb-3">
                  <Form.Control
                    type="file"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleFileUpload(event, setImgTwo, setImgTwoPreview)}
                  />
                </FloatingLabel>
                <div className='ratio img-preview ratio-21x9 bg-dark'>
                  <img
                    src={imgTwoPreview ? `data:image/jpeg;base64,${imgTwoPreview}` : `https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/4500f404-dbac-40f3-6696-ae768a38e800/500`}
                    alt="Image Two Preview"
                    className="w-100 object-fit-contain"
                    loading="lazy"
                  />
                </div>
              </Col>
              {/* <Col md={6}>
                <FloatingLabel controlId="floatingSelect" label="เลือกประเภทข่าวสาร">
                  <Form.Select aria-label="Floating label select example"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="News">ข่าว</option>
                    <option value="Relations">ประชาสัมพันธ์</option>
                    <option value="Activity">กิจกรรม</option>
                    <option value="Interested">สนใจเข้าศึกษา</option>
                    <option value="Current">นักศึกษาปัจจุบัน</option>
                    <option value="AlumniServices">บริการศิษย์เก่า</option>
                    <option value="WorkWithUs">ร่วมงานกับเรา</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
              <Col md={6}>
                <FloatingLabel controlId="startDate" label="วันเริ่มกิจกรรม" className="mb-3">
                  <Form.Control
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)} // Set value for startDate
                  />
                </FloatingLabel>
              </Col>
              <Col md={6}>
                <FloatingLabel controlId="endDate" label="วันเสิ้นสุดกิจกรรม" className="mb-3">
                  <Form.Control
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)} // Set value for startDate
                  />
                </FloatingLabel>
              </Col>
              <Col md={6}>
                <FloatingLabel controlId="img" label="รูปภาพ" className="mb-3">
                  <Form.Control
                    type="file"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleFileUpload(event, setImg)}
                  />
                </FloatingLabel>
              </Col>
              <Col md={6}>
                <FloatingLabel controlId="promoteImg" label="รูปภาพสไลด์" className="mb-3">
                  <Form.Control
                    type="file"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleFileUpload(event, setPromoteImg)}
                  />
                </FloatingLabel>
              </Col>
              <Col md={6}>
                {img && (
                  <div className="text-center mb-5">
                    <h4>รูปภาพ</h4>
                    <img src={`data:image/png;base64,${img}`} width={350} height={350} className="object-fit-cover" alt="Uploaded" />
                  </div>
                )}
              </Col>
              <Col md={6}>
                {promoteImg && (
                  <div className="text-center mb-5">
                    <h4>รูปภาพสไลด์</h4>
                    <img src={`data:image/png;base64,${promoteImg}`} width={"100%"} height={350} className="object-fit-cover" alt="Uploaded" />
                  </div>
                )}
              </Col>
              <Col md={6}>
                <FloatingLabel controlId="subTitle" label="บทความย่อ" className="mb-3">
                  <Form.Control
                    as="textarea"
                    style={{ height: '300px' }}
                    value={subTitle}
                    onChange={e => setSubTitle(e.target.value)}
                  />
                </FloatingLabel>
              </Col>
              <Col md={6}>
                <CKEditor
                  data={detail} // Set the initial content
                  onChange={handleEditorChange} // Handle content changes
                  config={{
                    uiColor: '#ddc173',
                    language: 'th',
                    extraPlugins: 'easyimage,autogrow,emoji',
                  }}
                />
              </Col>
              <Col lg={12}>
                <div>
                  <h2>CKEditor Content</h2>
                  <div dangerouslySetInnerHTML={{ __html: detail }} />
                </div>
              </Col> */}
            </Row>
          </Card.Body>
          <Card.Footer className="text-end">
            {/* <Button variant="success mx-2" onClick={handleSubmit}>
              ยืนยัน
            </Button> */}
            {/* <Button variant="primary mx-2" onClick={reloadPage}>
              ล้าง
            </Button> */}

          </Card.Footer>
        </Card>
      </div>
    </LayOut >
  );
}
export default NewsAdd;