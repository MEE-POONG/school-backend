import React, { useRef, useState } from 'react';
import { Button } from 'react-bootstrap';

const UploadPage = () => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);

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
        <div>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {selectedImage && (
        <div>
          <p>รูปภาพที่เลือก: {selectedImage.name}</p>
          <img src={URL.createObjectURL(selectedImage)} alt="Selected" style={{ maxWidth: '100%', height: 'auto' }} />
          {uploadSuccess && <p style={{ color: 'green' }}>อัพโหลดสำเร็จ!</p>}
        </div>
      )}

            <input type="file" accept=".png,.jpg,.jpeg" onChange={handleImageChange}  ref={fileInputRef}  name="image" />
            <Button onClick={handleUpload} as="input" type="submit" value="ยืนยันการอัพโหลด"  />
            {imageUrl && <img src={imageUrl} alt="Uploaded" />}
        </div>
    );
};

export default UploadPage;
