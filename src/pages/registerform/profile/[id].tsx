// import React, { useState, useEffect } from "react";
// import { useRouter } from "next/router";
// import Head from "next/head";
// import LayOut from "@/components/LayOut";
// import { Card, Col, FloatingLabel, Form, Row } from "react-bootstrap";
// import EditModal from "@/components/modal/EditModal";
// import useAxios from "axios-hooks";
// import Link from "next/link";
// import { RegisterForm } from "@prisma/client";

// const Registertest: React.FC = () => {
//   const router = useRouter();
//   const { id } = router.query;

//   const [registerFormData, setregisterFormData] = useState<RegisterForm[]>([]);

//   const [
//     { loading: updateRegisterFormLoading, error: updateRegisterFormError },
//     executeRegisterFormPut,
//   ] = useAxios({}, { manual: true });
//   const [Id, setId] = useState<string>("");
//   const [regId, setregId] = useState<string>("");
//   const [regIdpersonal, setregIdpersonal] = useState<string>("");
//   const [regBirth, setregBirth] = useState<string>("");
//   const [regPrefix, setregPrefix] = useState<string>("");
//   const [regSex, setregSex] = useState<string>("");
//   const [regNation, setregNation] = useState<string>("");
//   const [regName, setregName] = useState<string>("");
//   const [regLastname, setregLastname] = useState<string>("");
//   const [regEname, setregEname] = useState<string>("");
//   const [regElastname, setregElastname] = useState<string>("");
//   const [regPhone, setregPhone] = useState<string>("");
//   const [regEmail, setregEmail] = useState<string>("");
//   const [regImg, setregImg] = useState<string>("");

//   const [alertForm, setAlertForm] = useState<string>("not");
//   const [checkBody, setCheckBody] = useState<string>("");

//   const [
//     {
//       data: RegisterFormID,
//       loading: RegisterFormIDLoading,
//       error: RegisterFormIDError,
//     },
//     executeRegisterFormID,
//   ] = useAxios<{ RegisterForm: RegisterForm; success: boolean }, any>(
//     {
//       url: `/api/registerForm/${id}`,
//       method: "GET",
//     },
//     { autoCancel: false, manual: true }
//   );

//   const [test, setTest] = useState<RegisterForm[]>([]);

//   return (
//     <LayOut>
//       <Head>
//         <title>BackOffice-Profile</title>
//         <meta name="description" content="T ACTIVE" />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <div className="RegisterForm-page">
//         <Card>
//           <EditModal
//             checkAlertShow={alertForm}
//             setCheckAlertShow={setAlertForm}
//             checkBody={checkBody}
//           />

//           <Card.Header className="d-flex space-between">
//             <h4 className="mb-0 py-1">RegisterForm - แก้ไขข้อมูล</h4>
//           </Card.Header>

//           <Card.Body>
//             <Row>
//               {registerFormData.map((registerForm) => (
//                 <div key={registerForm.id}>
//                   <p>{registerForm.regName}</p>
//                 </div>
//               ))}

//               {/* <Col md={4}>
//                 <FloatingLabel
//                   controlId="regId"
//                   label="Id / รหัส"
//                   className="mb-3"
//                 >
//                   <Form.Control
//                     isValid={inputForm && Id !== ""}
//                     isInvalid={inputForm && Id === ""}
//                     type="text"
//                     value={regId}
             
//                   />
                 
//                 </FloatingLabel>
//               </Col> */}

//               <Col md={4}>
//                 <FloatingLabel
//                   controlId="regEmail"
//                   label="Email / อีเมล"
//                   className="mb-3"
//                 >
//                   <Form.Control />
//                 </FloatingLabel>
//               </Col>
//             </Row>
//           </Card.Body>
//           <Card.Footer className="text-end">
//             <Link href="/registerform" className="btn btn-danger mx-2">
//               ย้อนกลับ
//             </Link>
//           </Card.Footer>
//         </Card>
//       </div>
//     </LayOut>
//   );
// };
// export default Registertest;

// function setAlertForm(arg0: string) {
//   throw new Error("Function not implemented.");
// }
// function setInputForm(arg0: boolean) {
//   throw new Error("Function not implemented.");
// }

// function setCheckBody(arg0: string) {
//   throw new Error("Function not implemented.");
// }


import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { FaUserNinja } from "react-icons/fa";
import { RegisterForm } from "@prisma/client";


export default function ProfileDetailModal(props: {data:any}){
  const [showCheck, setShowCheck] = useState(false);
  const handleShow = () => setShowCheck(true);
  const handleClose = () => setShowCheck(false);
  const [dataregister, setTest] = useState<RegisterForm[]>([]);
  return(
    <>
    <Button
    bsPrefix="create"
    className={showCheck ? "icon active" : "icon "}
    onClick={handleShow}
  >
      <FaUserNinja />
  </Button>


  <Modal show={showCheck} onHide={handleClose} centered size="xl">
  <Modal.Header closeButton>
          <Modal.Title>
            รายละเอียด คุณ : {props?.data.regName + " " + props?.data.regLastname}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <h2 className="p-2 text-start">รายละเอียดข้อมูล</h2>

        <div>
            {dataregister?.map((value) => (
        <div key={value.id}>
          <p>ชื่อ:{value.regName+ " " +value.regLastname}</p>
          <p>{value.id}</p>
        </div>
        
        

      ))}
        </div>

        </Modal.Body>
  </Modal>

    </>
  )
}