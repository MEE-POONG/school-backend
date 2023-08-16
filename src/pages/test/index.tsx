import React, { useState } from 'react';
import axios from 'axios';

const FileUploader = ({ onUpload }:any) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (eventcheck: { target: { files: any[]; }; }) => {
    const file = eventcheck.target.files[0];
    
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
      setSelectedFile(file);
    } else {
      alert('กรุณาเลือกไฟล์ประเภท PNG หรือ JPG เท่านั้น');
    }
  };

  const handleUpload = async () => {
    if (selectedFile) {
      // ตรวจสอบการเลือกไฟล์และดำเนินการต่อที่นี่
      // เช่น อัปโหลดไปยังเซิร์ฟเวอร์, แสดงตัวอย่างไฟล์, บันทึกข้อมูล, ฯลฯ
      
      


      // onUpload(selectedFile);

      if (selectedFile) {
        try {
          const formData = new FormData();
          formData.append('file', selectedFile);
  
          const response = await axios.post(
            'https://api.cloudflare.com/client/v4/accounts/39aa4ea3c7a7d766adc4428933324787/images/v1/6dd20f22-1347-43f1-ec09-46ca8ffcb200',
            formData,
            {
              headers: {
                Authorization: 'Bearer YOUR_CLOUDFLARE_TOKEN',
              },
            }
          );
  
          console.log('การอัปโหลดสำเร็จ:', response.data);
        } catch (error) {
          console.error('เกิดข้อผิดพลาดในการอัปโหลด', error);
        }
      }
    }
  };

  return (
    <div>
      <input type="file" accept=".png, .jpg" onChange={handleFileChange} />
      <button onClick={handleUpload}>อัปโหลด</button>
    </div>
  );
};














// // export default FileUploader;

// import React, { useState } from 'react';

// const ImageUploader = () => {
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       setSelectedFile(file);
//     }
//   };

//   const handleUpload = async () => {
//     if (selectedFile) {
//       const url = 'https://api.cloudflare.com/client/v4/accounts/39aa4ea3c7a7d766adc4428933324787/images/v1';
      
//       const formData = new FormData();
//       formData.append('file', selectedFile);

//       try {
//         const response = await fetch(url, {
//           method: 'POST',
//           body: formData,
//         });

//         if (response.ok) {
//           console.log('Image uploaded successfully');
//         } else {
//           console.error('Image upload failed');
//         }
//       } catch (error) {
//         console.error('An error occurred:', error);
//       }
//     }
//   };

//   return (
//     <div>
//       <input type="file" accept="image/*" onChange={handleFileChange} />
//       <button onClick={handleUpload}>Upload</button>
//     </div>
//   );
// };

// export default ImageUploader;
























// import React, { useRef, useState } from 'react';

// const Uploadslide = () => {
//     const fileInputRef = useRef<HTMLInputElement | null>(null);
//     const [imageUrl, setImageUrl] = useState<string | null>(null);

//     const handleUpload = async () => {
//         if (fileInputRef.current) {
//             const file = fileInputRef.current.files?.[0];
//             if (file) {
//                 const formData = new FormData();
//                 formData.append('file', file);

//                 try {
//                     const response = await fetch('https://upload-image.me-prompt-technology.com/', {
//                         method: 'POST',
//                         body: formData,
//                     });

//                     const responseData = await response.json();
//                     console.log(responseData);

//                     // สร้าง URL ของรูปภาพจาก responseData
//                     if (responseData.result?.variants[0]) {
//                         setImageUrl(responseData.result.variants[11]);
//                     }
//                 } catch (error) {
//                     console.error(error);
//                 }
//             }
//         }
//     };

//     return (
//       <>
//         <div>
//         <p>image1</p>
//             <input ref={fileInputRef} type="file" name="image1" />
//             <button onClick={handleUpload}>Upload</button>
//             {imageUrl && <img src={imageUrl} alt="Uploaded" />}
           
//         </div>
  
//         </>
//     );
// };

// export default Uploadslide;
