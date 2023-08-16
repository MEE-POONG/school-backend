import React, { useEffect, useState } from "react";
import Head from "next/head";
import LayOut from "@/components/LayOut";
import {
  Badge,
  Card,
  Button,
  Image,
  Form,
  InputGroup,
  Table,
} from "react-bootstrap";
import { FaPen, FaSearch, FaUserNinja } from "react-icons/fa";
import Link from "next/link";
import useAxios from "axios-hooks";
import PageSelect from "@/components/PageSelect";
// import { bankMap } from "@/test";
import DeleteModal from "@/components/modal/DeleteModal";
import { RegisterForm } from "@prisma/client";
import DetailsRegisterAddDetailsRegisterModal from "@/container/RegisterForm/DetailsRegister";
import ProfileDetailModal from "./profile/[id]";

interface Params {
  page: number;
  pageSize: number;
  searchTerm: string;
  totalPages: number;
}
const registerForm: React.FC = () => {
  const [params, setParams] = useState<Params>({
    page: 1,
    pageSize: 10,
    searchTerm: "",
    totalPages: 1,
  });

  const [{ data: registerFormData }, getregisterForm] = useAxios({
    url: `/api/registerForm?page=${params.page}&pageSize=${params.pageSize}&searchTerm=${params.searchTerm}`,
    method: "GET",
  });

  const [
    { loading: deleteregisterFormLoading, error: deleteregisterFormError },
    executeregisterFormDelete,
  ] = useAxios({}, { manual: true });

  const [filteredregisterFormsData, setFilteredregisterFormsData] = useState<
    RegisterForm[]
  >([]);

  useEffect(() => {
    setFilteredregisterFormsData(registerFormData?.registerForm ?? []);
    console.log(registerFormData);
  }, [registerFormData]);

  const deleteregisterForm = (id: string): Promise<any> => {
    return executeregisterFormDelete({
      url: "/api/registerForm/" + id,
      method: "DELETE",
    }).then(() => {
      setFilteredregisterFormsData((prevregisterForms) =>
        prevregisterForms.filter((registerForm) => registerForm.id !== id)
      );
    });
  };

  const handleChangePage = (page: number) => {
    setParams((prevParams) => ({
      ...prevParams,
      page: page,
    }));
  };

  const handleChangePageSize = (size: number) => {
    setParams((prevParams) => ({
      ...prevParams,
      page: 1,
      pageSize: size,
    }));
  };

  const handleChangeSearchTerm = (search: string) => {
    setParams((prevParams) => ({
      ...prevParams,
      searchTerm: search,
    }));
  };

  return (
    <LayOut>
      <Head>
        <title>Wellcome | MePrompt-BackOffice</title>
        <meta name="description" content="T ACTIVE" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="partner-page h-100">
        <Card className="h-100">
          <Card.Header className="d-flex space-between">
            <h4 className="mb-0 py-1">รายชื่อนักศึกษาที่สนใจเข้าเรียน</h4>

            {/* ค้นหาข้อมูล */}
            {/* <InputGroup className="w-auto" bsPrefix="input-icon">
              <InputGroup.Text id="basic-addon1">
                <FaSearch />
              </InputGroup.Text>
              <Form.Control
                onChange={e => handleChangeSearchTerm(e.target.value)}
                placeholder="ค้นหาโปรโมชั่น"
                aria-label="Fullname"
                aria-describedby="basic-addon1"
              />
            </InputGroup> */}
            {/* <AddListName /> */}

            {/* <Link href="/registerForm/addregisterForm" className="ms-2 btn icon icofn-primary">
              เพิ่มโปรโมชั่น
            </Link> */}
          </Card.Header>
          <Card.Body className="p-0">
            <Table striped bordered hover className="scroll">
              <thead>
                <tr>
                  <th className="no">No</th>
                  <th className="title">รหัสบัตรประชาชน</th>
                  {/* <th className="subtitle">วัน/เดือน/ปี เกิด</th> */}
                  <th>คำนำหน้า</th>
                  <th>เพศ</th>
                  {/* <th>สัญชาติ</th> */}
                  <th>ชื่อ</th>
                  <th>นามสกุล</th>
                  {/* <th>ชื่อ ภาษาอังกฤษ</th>
                  <th>นามสกุล ภาษาอังกฤษ</th> */}
                  <th>เบอร์โทร</th>
                  <th>E-mail</th>
                  <th>โปรไฟล์</th>
                  <th>จัดการ</th>
                </tr>
              </thead>

              <tbody className="text-center">
                {filteredregisterFormsData.map((registerForm, index) => (
                  <tr key={registerForm.id}>
                    <td>{index + 1}</td>
                    {/* <td>{registerForm.regId}</td> */}
                    <td>{registerForm.regIdpersonal}</td>
                    {/* <td>{registerForm.regBirth}</td> */}
                    <td>{registerForm.regPrefix}</td>
                    <td>{registerForm.regSex}</td>
                    {/* <td>{registerForm.regNation}</td> */}
                    <td>{registerForm.regName}</td>
                    <td>{registerForm.regLastname}</td>
                    {/* <td>{registerForm.regEname}</td>
                    <td>{registerForm.regElastname}</td> */}
                    <td>{registerForm.regPhone}</td>
                    <td>{registerForm.regEmail}</td>
                    <td>
                      <Image
                        src={`https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${registerForm.regImg}/public`}
                        alt="registerForm imge"
                        thumbnail
                      />
                    </td>
                    <td>
                    
                      {/* <DetailsRegisterAddDetailsRegisterModal
                        data={registerForm}
                      /> */}
                        <ProfileDetailModal  data={registerForm}/>

                      {/* <Link
                        href={`/registerform/profile/${registerForm.id}`}
                        className="mx-1 btn info icon icon-primary"
                      >
                         <FaUserNinja />
                        <span className="h-tooltiptext">test</span>
                      </Link> */}
                      
                      <Link
                        href={`/registerform/edit/${registerForm.id}`}
                        className="mx-1 btn info icon icon-primary"
                      >
                        <FaPen />
                        <span className="h-tooltiptext">แก้ไขข้อมูล</span>
                      </Link>
                      <DeleteModal
                        data={registerForm}
                        apiDelete={() => deleteregisterForm(registerForm.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
          <Card.Footer>
            <PageSelect
              page={params.page}
              totalPages={registerFormData?.pagination?.total}
              onChangePage={handleChangePage}
              onChangePageSize={handleChangePageSize}
            />
          </Card.Footer>
        </Card>
      </div>
    </LayOut>
  );
};
export default registerForm;
