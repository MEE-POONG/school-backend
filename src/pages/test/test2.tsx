import React, { useState } from 'react';

const ImageUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);


  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      if (selectedFile.type === 'image/png' || selectedFile.type === 'image/jpeg') {
        setFile(selectedFile);
      } else {
        setShowModal(true);
      }
    }
    if (file) {
        if (file.type === 'image/png' || file.type === 'image/jpeg') {
          setSelectedFile(file);
          setErrorMessage(null);
        } else {
          setSelectedFile(null);
          setErrorMessage('กรุณาเลือกไฟล์รูปภาพประเภท PNG หรือ JPG เท่านั้น');
        }
      }
  };

  return (
    <div>
      {/* <input
        type="file"
        accept=".png, .jpg, .jpeg"
        onChange={handleFileChange}
      /> */}
        <input type="file" accept=".png, .jpg" onChange={handleFileChange} />
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {selectedFile && (
        <div>
          <p>ไฟล์ที่เลือก: {selectedFile.name}</p>
          <img src={URL.createObjectURL(selectedFile)} alt="Uploaded" />
        </div>
      )}

      {showModal && (
        <div className="modal">
          <p>ไม่สามารถอัพโหลดได้</p>
          <button onClick={() => setShowModal(false)}>ปิด</button>
        </div>
      )}

      {file && (
        <div>
          <p>ไฟล์ที่เลือก: {file.name}</p>
          <img src={URL.createObjectURL(file)} alt="Uploaded" />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
