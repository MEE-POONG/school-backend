import React, { useEffect, useState } from "react";
import { News as PrismaNews, NewsType as PrismaNewsType } from '@prisma/client';
import useAxios from "axios-hooks";
import axios from 'axios';
import LayOut from "@/components/RootPage/TheLayOut";
import { Button, Card, Col, FloatingLabel, Form, FormLabel, Image, Row } from "react-bootstrap";
import LoadModal from "@/components/modal/LoadModal";
import moment from "moment";
import { useRouter } from "next/router";
// import { News } from "@prisma/client";

interface NewsType extends PrismaNewsType {
}
interface News extends PrismaNews {
  NewsType: NewsType;
}

const NewsAdd: React.FC = (props) => {
  const router = useRouter();
  const dateDefault = moment().format('YYYY-MM-DDTHH:mm');
  const [formData, setFormData] = useState<News | null>();
  const [imgOne, setImgOne] = useState<File | null>(null);
  const [imgTwo, setImgTwo] = useState<File | null>(null);

  const [imgOnePreview, setImgOnePreview] = useState<string | null>(null);
  const [imgTwoPreview, setImgTwoPreview] = useState<string | null>(null);

  const [type, setType] = useState<NewsType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inputForm, setInputForm] = useState<boolean>(false);

  const [{ data: headPageData, loading, error }, newsAPI] = useAxios('/api/News');

  const [{ data: newsType, loading: loadingType, error: errorType }, getNewsType] = useAxios({
    url: `/api/NewsType`,
    method: "GET",
  });

  useEffect(() => {
    setType(newsType?.data);
    handleInputChange("newsTypeId", newsType?.data[0]?.id);
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

  const uploadImage = async (img: any, image: any) => {
    const uploadFormData = new FormData();
    uploadFormData.append("file", image);
    try {
      const uploadResponse = await axios.post(
        "https://upload-image.me-prompt-technology.com/",
        uploadFormData
      );

      if (uploadResponse?.status === 200) {
        return uploadResponse?.data?.result?.id;
      }
    } catch (error) {
      console.error("Upload failed: ", error);
    }
    return null;
  };

  const reloadPage = () => {
    window.location.reload();
  };

  const goBack = () => {
    window.history.back();
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setIsLoading(true);
    setInputForm(true);

    let missingFields = [];
    if (!formData?.title) missingFields.push("Title");
    if (!formData?.subTitle) missingFields.push("Subtitle");
    if (!formData?.detail) missingFields.push("Detail");
    if (!formData?.newsTypeId) missingFields.push("News Type");
    if (!imgOne) missingFields.push("รูปปก");

    if (missingFields.length > 0) {
      setIsLoading(false);
      alert(`กรอกข้อมูลไม่ครบ: ${missingFields.join(', ')}`);
      return; // Stop the submission
    }
    const imageIDs = await Promise.all([
      imgOne ? uploadImage(formData?.img, imgOne) : null,
      imgTwo ? uploadImage(formData?.promoteImg, imgTwo) : null,
    ]);

    try {
      const response = await newsAPI({
        url: `/api/News`,
        method: "POST",
        data: {
          id: formData?.id,
          title: formData?.title,
          subTitle: formData?.subTitle,
          detail: formData?.detail,
          startDate: formData?.startDate,
          endDate: formData?.endDate,
          img: imageIDs[0] !== null ? imageIDs[0] : formData?.img,
          promoteImg: imageIDs[1] !== null ? imageIDs[1] : formData?.promoteImg,
          newsTypeId: formData?.newsTypeId,
        }
      });
      console.log(response);

      if (response?.status === 201) {
        setIsLoading(false);
        router.push(`/news/edit/${response?.data?.id}`);
      } else {
        setIsLoading(false);
        alert("Failed to add information.");
      }
    } catch (error) {
      setIsLoading(false);
      alert("An error occurred during submission.");
    }

  };

  return (
    <LayOut>

      <div className='NewsSchool-page'>
        <Card>
          <LoadModal checkLoad={isLoading} status={"add"} detail={""} />
          <Card.Header className="d-flex space-between">
            <h4 className="mb-0 py-1">
              เพิ่มข่าว / กิจกรรม
            </h4>
            <div>
              <Button variant="success mx-2" onClick={handleSubmit}>
                ยืนยัน
              </Button>
              <Button variant="primary mx-2" onClick={reloadPage}>
                ล้าง
              </Button>
              <Button variant="danger mx-2" onClick={goBack}>
                กลับ
              </Button>
            </div>
          </Card.Header>
          <Card.Body className="overflow-x-hidden">
            <Row>
              <Col md={2}>
                <FloatingLabel controlId="floatingSelect" label="เลือกประเภทข่าวสาร" className="mb-3">
                  <Form.Select aria-label="Floating label select example"
                    onChange={(e) => handleInputChange("newsTypeId", e.target.value)}
                  >
                    {type?.map((list, index) => (
                      <option key={index} value={list?.id}>{list?.nameTH}</option>
                    ))}

                  </Form.Select>
                </FloatingLabel>
                <FloatingLabel controlId="startDate" label="วันเริ่มกิจกรรม" className="mb-3" >
                  <Form.Control
                    type="datetime-local"
                    defaultValue={dateDefault}
                    onChange={(e) => handleInputChange("startDate", e.target.value)}
                    placeholder="ระบุหัวข้อ"
                  />
                </FloatingLabel>
                <FloatingLabel controlId="endDate" label="วันสิ้นสุดกิจกรรม" className="mb-3" >
                  <Form.Control
                    type="datetime-local"
                    defaultValue={dateDefault}
                    onChange={(e) => handleInputChange("endDate", e.target.value)}
                    placeholder="ระบุหัวข้อ"
                  />
                </FloatingLabel>
              </Col>

              <Col md={10}>
                <FloatingLabel controlId="title" label="ระบุหัวข้อข่าว" className="mb-3" >
                  <Form.Control
                    isValid={inputForm && formData?.title !== ""}
                    isInvalid={inputForm && !formData?.title}
                    type="text"
                    defaultValue={formData?.title || ""}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="ระบุหัวข้อ"
                  />
                </FloatingLabel>
                <FloatingLabel controlId="subTitle" label="ระบุสคริปหัวข้อ" className="mb-3" >
                  <Form.Control
                    isValid={inputForm && formData?.subTitle !== ""}
                    isInvalid={inputForm && !formData?.subTitle}
                    type="text"
                    defaultValue={formData?.subTitle || ""}
                    onChange={(e) => handleInputChange("subTitle", e.target.value)}
                    placeholder="ระบุสคริปหัวข้อ"
                  />
                </FloatingLabel>
                <FloatingLabel controlId="detail" label="ระบุเนื้อหา" className="mb-3" >
                  <Form.Control
                    isValid={inputForm && formData?.detail !== ""}
                    isInvalid={inputForm && !formData?.detail}
                    as="textarea"
                    defaultValue={formData?.detail || ""}
                    style={{ height: '200px' }}
                    onChange={(e) => handleInputChange("detail", e.target.value)}
                    placeholder="ระบุเนื้อหา"
                  />
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
                  <Image
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
                  <Image
                    src={imgTwoPreview ? `data:image/jpeg;base64,${imgTwoPreview}` : `https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/4500f404-dbac-40f3-6696-ae768a38e800/500`}
                    alt="Image Two Preview"
                    className="w-100 object-fit-contain"
                    loading="lazy"
                  />
                </div>
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
            <Button variant="danger mx-2" onClick={goBack}>
              กลับ
            </Button>
          </Card.Footer>
        </Card>
      </div>
    </LayOut >
  );
}
export default NewsAdd;