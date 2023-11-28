import React, { useEffect, useState } from "react";
import { CourseGroup } from '@prisma/client';
import useAxios from "axios-hooks";
import axios from 'axios';
import LayOut from "@/components/RootPage/TheLayOut";
import { Button, Card, Col, FloatingLabel, Form, FormLabel, Image, Row } from "react-bootstrap";
import LoadModal from "@/components/modal/LoadModal";
import { useRouter } from "next/router";

const CourseEdit: React.FC = (props) => {
  const router = useRouter();
  const { id } = router.query;

  const [formData, setFormData] = useState<CourseGroup | null>();
  const [imgOne, setImgOne] = useState<File | null>(null);

  const [imgOnePreview, setImgOnePreview] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inputForm, setInputForm] = useState<boolean>(false);

  const [{ data: headPageData, loading, error }, newsAPI] = useAxios({
    url: `/api/CourseGroup`,
    method: "GET",
  });


  useEffect(() => {
    (async () => {
      try {
        if (id) {
          const response = await newsAPI({
            url: `/api/CourseGroup/${id}`,
            method: "GET",
          });
          if (response?.status === 200) {
            setFormData(response?.data);
          }
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    })();
  }, [id]);

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
    if (!formData?.nameTH) missingFields.push("Title");
    if (!formData?.nameEN) missingFields.push("Subtitle");
    if (!imgOne && !formData?.img) missingFields.push("รูปปก");

    if (missingFields.length > 0) {
      setIsLoading(false);
      alert(`กรอกข้อมูลไม่ครบ: ${missingFields.join(', ')}`);
      return; // Stop the submission
    }
    const imageIDs = await Promise.all([
      imgOne ? uploadImage(formData?.img, imgOne) : null,
    ]);

    try {
      const response = await newsAPI({
        url: `/api/CourseGroup/${formData?.id}`,
        method: "PUT",
        data: {
          id: formData?.id,
          nameTH: formData?.nameTH,
          nameEN: formData?.nameEN,
          img: imageIDs[0] !== null ? imageIDs[0] : formData?.img,
        }
      });

      if (response?.status === 200) {
        setIsLoading(false);
        localStorage.setItem('currentNewsItem', JSON.stringify(response?.data));
        router.push(`/course/${response?.data?.id}`);
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
              แก้ไขข่าว / กิจกรรม
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
              <Col md={6}>
                <FloatingLabel controlId="nameTH" label="ระบุหัวข้อข่าว" className="mb-3" >
                  <Form.Control
                    isValid={inputForm && formData?.nameTH !== ""}
                    isInvalid={inputForm && !formData?.nameTH}
                    type="text"
                    defaultValue={formData?.nameTH || ""}
                    onChange={(e) => handleInputChange("nameTH", e.target.value)}
                    placeholder="ระบุหัวข้อ"
                  />
                </FloatingLabel>
                <FloatingLabel controlId="nameEN" label="ระบุหัวข้อข่าว" className="mb-3" >
                  <Form.Control
                    isValid={inputForm && formData?.nameEN !== ""}
                    isInvalid={inputForm && !formData?.nameEN}
                    type="text"
                    defaultValue={formData?.nameEN || ""}
                    onChange={(e) => handleInputChange("nameEN", e.target.value)}
                    placeholder="ระบุหัวข้อ"
                  />
                </FloatingLabel>
              </Col>
              <Col md={6}>
                <FloatingLabel controlId="img" label="รูปภาพเกี่ยวกัวเรา" className="mb-3">
                  <Form.Control
                    type="file"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleFileUpload(event, setImgOne, setImgOnePreview)}
                  />
                </FloatingLabel>
                <div className='ratio img-preview ratio-16x9 bg-dark'>
                  <Image
                    src={imgOnePreview ? `data:image/jpeg;base64,${imgOnePreview}` : formData?.img ? `https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${formData.img}/500` : `https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/4500f404-dbac-40f3-6696-ae768a38e800/500`}
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
export default CourseEdit;