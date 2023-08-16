import React, { useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';

function ImageUploadButton() {

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleUpload = async () => {
    if (fileInputRef.current) {
        const file = fileInputRef.current.files?.[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await fetch('https://upload-image.me-prompt-technology.com/', {
                    method: 'POST',
                    body: formData,
                });

                const responseData = await response.json();
                console.log(responseData);

                // สร้าง URL ของรูปภาพจาก responseData
                if (responseData.result?.variants[0]) {
                    setImageUrl(responseData.result.variants[11]);
                }
            } catch (error) {
                console.error(error);
            }
        }
    }
};

  const allowedExtensions = ['.png', '.jpg', '.jpeg'];
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];

    if (selectedFile) {
      const fileExtension = selectedFile.name.slice(selectedFile.name.lastIndexOf('.')).toLowerCase();
      
      if (allowedExtensions.includes(fileExtension)) {
        setSelectedImage(selectedFile);
        setErrorMessage('');
      } else {
        setSelectedImage(null);
        setErrorMessage('กรุณาเลือกรูปภาพที่มีนามสกุล JPG , jPEG หรือ PNG เท่านั้น');
      }
    }
  };




  return (
    <>
    <div>
      <input type="file" accept=".png,.jpg,.jpeg" onChange={handleImageChange} />
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {selectedImage && (
        <div>
          <p>รูปภาพที่เลือก: {selectedImage.name}</p>
          <img src={URL.createObjectURL(selectedImage)} alt="Selected" style={{ maxWidth: '100%', height: 'auto' }} />
          {uploadSuccess && <p style={{ color: 'green' }}>อัพโหลดสำเร็จ!</p>}
        </div>
      )}
     

      <Form.Group controlId="formFile" className="mb-3"  >
      <Form.Label>อัพโหลดไฟล์รูปภาพ</Form.Label>
      <Form.Control type="file" accept=".png,.jpg,.jpeg" onChange={handleImageChange} />
    </Form.Group>
    <Button onClick={handleUpload} as="input" type="submit" value="ยืนยันการอัพโหลด"  />

    <button onClick={handleUpload}>Upload</button>
    </div>

    </>
  );
}

export default ImageUploadButton;
