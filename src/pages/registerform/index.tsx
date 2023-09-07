import React, { useEffect, useState } from "react";
import Head from "next/head";
import LayOut from "@/components/RootPage/TheLayOut";
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
// import DetailsRegisterAddDetailsRegisterModal from "@/container/RegisterForm/DetailsRegister";
import ProfileDetailModal from "@/pages/registerform/profile/[id]";

interface Params {
  page: number;
  pageSize: number;
  searchKey: string;
  totalPages: number;
}
const RegisterFormPage: React.FC = () => {
  const [params, setParams] = useState<Params>({
    page: 1,
    pageSize: 10,
    searchKey: "",
    totalPages: 1,
  });

  const [{ data: registerFormData }, getregisterForm] = useAxios({
    url: `/api/registerForm?page=${params.page}&pageSize=${params.pageSize}&searchKey=${params.searchKey}`,
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

  const handleChangesearchKey = (search: string) => {
    setParams(prevParams => ({
      ...prevParams,
      searchKey: search,
    }));
  };

  useEffect(() => {
    if (registerFormData?.registerForm) {
      // Filter the registerForm data based on searchKey
      const filteredData = registerFormData.registerForm.filter((registerForm:any) =>
        // Convert both the searchKey and the relevant data to lowercase for case-insensitive search
        registerForm.regIdpersonal.toLowerCase().includes(params.searchKey.toLowerCase()) ||
        registerForm.regPrefix.toLowerCase().includes(params.searchKey.toLowerCase()) ||
        registerForm.regSex.toLowerCase().includes(params.searchKey.toLowerCase()) ||
        registerForm.regName.toLowerCase().includes(params.searchKey.toLowerCase()) ||
        registerForm.regLastname.toLowerCase().includes(params.searchKey.toLowerCase()) ||
        registerForm.regPhone.toLowerCase().includes(params.searchKey.toLowerCase()) ||
        registerForm.regEmail.toLowerCase().includes(params.searchKey.toLowerCase())
      );

      setFilteredregisterFormsData(filteredData);
    }
  }, [registerFormData, params.searchKey]);
  
  return (
    <LayOut>
      <Head>
        <title>Phanomwan Backend</title>
        <meta name="description" content="T ACTIVE" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="partner-page h-100">
        <Card className="h-100">
          <Card.Header className="d-flex space-between">
            <h4 className="mb-0 py-1">รายชื่อนักศึกษาที่สนใจเข้าเรียน</h4>

            {/* ค้นหาข้อมูล */}
            <InputGroup className="w-auto" bsPrefix="input-icon">
              <InputGroup.Text id="basic-addon1">
                <FaSearch />
              </InputGroup.Text>
              <Form.Control
                onChange={e => handleChangesearchKey(e.target.value)}
                placeholder="ผู้สนใจสมัคร"
                aria-label="registerForm"
                aria-describedby="basic-addon1"
              />
            </InputGroup>
            {/* <AddListName /> */}

            {/* <Link href="/registerForm/addregisterForm" className="ms-2 btn icon icofn-primary">
              เพิ่มโปรโมชั่น
            </Link> */}
            
          </Card.Header>
          <Card.Body className="p-0">
            <Table striped bordered hover className="scroll">
              <thead>
                <tr>
                  <th className="w-t-150">No</th>
                  <th className="w-t-150">รหัสบัตรประชาชน</th>
                  <th className="w-t-150">คำนำหน้า</th>
                  <th className="w-t-150">เพศ</th>
                  <th className="w-t-150">ชื่อ</th>
                  <th className="w-t-150">นามสกุล</th>
                  <th className="w-t-150">เบอร์โทร</th>
                  <th className="w-t-150">E-mail</th>
                  <th className="w-t-150">โปรไฟล์</th>
                  <th className="w-t-150">จัดการ</th>
                </tr>
              </thead>

              <tbody className="text-center">
                {filteredregisterFormsData.map((registerForm, index) => (
                  <tr key={registerForm.id}>
                    <td>{index + 1}</td>
                    <td>{registerForm.regIdpersonal}</td>
                    <td>{registerForm.regPrefix}</td>
                    <td>{registerForm.regSex}</td>
                    <td>{registerForm.regName}</td>
                    <td>{registerForm.regLastname}</td>
                    <td>{registerForm.regPhone}</td>
                    <td>{registerForm.regEmail}</td>
                    <td>
                      <Image
                        src={`https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${registerForm.regImg ? registerForm.regImg : 'f701ce08-7ebe-4af2-c4ec-2b3967392900' }/public`}
                        alt="registerForm imge"
                        thumbnail
                      />
                    </td>
                    <td>
                        <ProfileDetailModal  data={registerForm}/>
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
export default RegisterFormPage;
