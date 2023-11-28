import React, { useEffect, useState } from "react";
import Head from "next/head";
import LayOut from "@/components/RootPage/TheLayOut";
import {
  Card,
  Image,
  Form,
  InputGroup,
  Table,
} from "react-bootstrap";
import { FaPen, FaSearch } from "react-icons/fa";
import Link from "next/link";
import useAxios from "axios-hooks";
import PageSelect from "@/components/PageSelect";
import DeleteModal from "@/components/modal/DeleteModal";
import { RegisterForm } from "@prisma/client";
import ProfileDetailModal from "@/pages/registerform/[id]";

interface Params {
  page: number;
  pageSize: number;
  searchKey: string;
  totalPages: number;
}
const RegisterFormPage: React.FC = (props) => {
  const [params, setParams] = useState<Params>({
    page: 1,
    pageSize: 10,
    searchKey: "",
    totalPages: 1,
  });

  const [{ data: registerFormData }, getregisterForm] = useAxios({
    url: `/api/RegisterForm?page=${params.page}&pageSize=${params.pageSize}&searchKey=${params.searchKey}`,
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
    
    setFilteredregisterFormsData(registerFormData?.data ?? []);
  }, [registerFormData]);

  const deleteregisterForm = (id: string): Promise<any> => {
    return executeregisterFormDelete({
      url: "/api/RegisterForm/" + id,
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
      const filteredData = registerFormData.registerForm.filter((registerForm: any) =>
        // Convert both the searchKey and the relevant data to lowercase for case-insensitive search
        registerForm.personalID.toLowerCase().includes(params.searchKey.toLowerCase()) ||
        registerForm.prefix.toLowerCase().includes(params.searchKey.toLowerCase()) ||
        registerForm.sex.toLowerCase().includes(params.searchKey.toLowerCase()) ||
        registerForm.nameTh.toLowerCase().includes(params.searchKey.toLowerCase()) ||
        registerForm.lastnameTh.toLowerCase().includes(params.searchKey.toLowerCase()) ||
        registerForm.phone.toLowerCase().includes(params.searchKey.toLowerCase()) ||
        registerForm.email.toLowerCase().includes(params.searchKey.toLowerCase())
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
      <div className="partner-page">
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
                aria-label="RegisterForm"
                aria-describedby="basic-addon1"
              />
            </InputGroup>
          </Card.Header>
          <Card.Body className="p-0 overflow-x-hidden">
            <Table striped bordered hover className="scroll">
              <thead>
                <tr>
                  <th className="">No</th>
                  <th className="">รหัสบัตรประชาชน</th>
                  <th className="">คำนำหน้า</th>
                  <th className="">เพศ</th>
                  <th className="">ชื่อ</th>
                  <th className="">นามสกุล</th>
                  <th className="">เบอร์โทร</th>
                  <th className="">E-mail</th>
                  {/* <th className="">โปรไฟล์</th> */}
                  <th className="">จัดการ</th>
                </tr>
              </thead>

              <tbody className="text-center">
                {filteredregisterFormsData.map((registerForm, index) => (
                  <tr key={registerForm.id}>
                    <td >{index + 1}</td>
                    <td>{registerForm.personalID}</td>
                    <td>{registerForm.prefix}</td>
                    <td>{registerForm.sex}</td>
                    <td>{registerForm.nameTh}</td>
                    <td>{registerForm.lastnameTh}</td>
                    <td>{registerForm.phone}</td>
                    <td>{registerForm.email}</td>
                    {/* <td>
                      <Image
                        src={`https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${registerForm.img ? registerForm.img : 'f701ce08-7ebe-4af2-c4ec-2b3967392900'}/public`}
                        alt="registerForm imge"
                        thumbnail
                      />
                    </td> */}
                    <td>
                      <ProfileDetailModal data={registerForm} />
                      <DeleteModal
                        title={`ลบข้อมูลของ ${registerForm.nameTh} ${registerForm.lastnameTh}`}
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
