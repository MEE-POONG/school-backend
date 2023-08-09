import React, { useEffect, useState } from "react";
import Head from 'next/head';
import LayOut from "@/components/LayOut";
import { Badge, Card, Button,Image, Form, InputGroup, Table } from "react-bootstrap";
import { FaPen, FaSearch } from "react-icons/fa";
import Link from "next/link";
import useAxios from "axios-hooks";
import PageSelect from "@/components/PageSelect";
// import { bankMap } from "@/test";
import DeleteModal from "@/components/modal/DeleteModal";
import { RegisterForm } from '@prisma/client';
import RegisterFormAddRegisterFormModal from "@/container/FormRegister/AddRegister";

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

  const [{ data: registerFormData }, getregisterForm,] = useAxios({
    url: `/api/registerForm?page=${params.page}&pageSize=${params.pageSize}&searchTerm=${params.searchTerm}`,
    method: "GET",
  });

  const [{ loading: deleteregisterFormLoading, error: deleteregisterFormError }, executeregisterFormDelete,] = useAxios({}, { manual: true });

  const [filteredregisterFormsData, setFilteredregisterFormsData] = useState<RegisterForm[]>([]);



  useEffect(() => {
    setFilteredregisterFormsData(registerFormData?.registerForm ?? []);
    console.log(registerFormData);

  }, [registerFormData]);

  const deleteregisterForm = (id: string): Promise<any> => {
    return executeregisterFormDelete({
      url: "/api/registerForm/" + id,
      method: "DELETE",
    }).then(() => {
      setFilteredregisterFormsData(prevregisterForms => prevregisterForms.filter(registerForm => registerForm.id !== id));
    });
  };


  const handleChangePage = (page: number) => {
    setParams(prevParams => ({
      ...prevParams,
      page: page,
    }));
  };

  const handleChangePageSize = (size: number) => {
    setParams(prevParams => ({
      ...prevParams,
      page: 1,
      pageSize: size,
    }));
  };

  const handleChangeSearchTerm = (search: string) => {
    setParams(prevParams => ({
      ...prevParams,
      searchTerm: search,
    }));
  };

  return (
    <LayOut>
      <Head>
        <title>Wellcome | MePrompt-BackOffice</title>
        <meta
          name="description"
          content="T ACTIVE"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='partner-page h-100'>
        <Card className="h-100">
          <Card.Header className="d-flex space-between">
            <h4 className="mb-0 py-1">
              registerForm
            </h4>
            <InputGroup className="w-auto" bsPrefix="input-icon">
              <InputGroup.Text id="basic-addon1">
                <FaSearch />
              </InputGroup.Text>
              <Form.Control
                onChange={e => handleChangeSearchTerm(e.target.value)}
                placeholder="ค้นหาโปรโมชั่น"
                aria-label="Fullname"
                aria-describedby="basic-addon1"
              />
            </InputGroup>
            {/* <AddListName /> */}
            <Link href="/registerForm/game" className="ms-2 btn icon icofn-primary">
              เกมจับผิดภาพ
            </Link>
            <Link href="/registerForm/addregisterForm" className="ms-2 btn icon icofn-primary">
              เพิ่มโปรโมชั่น
            </Link>
          </Card.Header>
          <Card.Body className="p-0">
            <Table striped bordered hover className="scroll">
              <thead>
                <tr>
                  <th className="no">No</th>
                  <th className="title">ชื่อโปรโมชั่น</th>
                  <th className="subtitle">คำอธิบายย่อย</th>
                  <th>รายละเอียด</th>
                  <th>รูปภาพ</th>
                  <th>จัดการ</th>
                  <th>จัดการ</th>
                  <th>จัดการ</th>
                  <th>จัดการ</th>
                  <th>จัดการ</th>
               
                </tr>
              </thead>


              <tbody className="text-center">
                {filteredregisterFormsData.map((registerForm, index) => (
                  <tr key={registerForm.id}>
                    <td>{index + 1}</td>
                    <td>{registerForm.regId}</td>
                    <td>{registerForm.regIdpersonal}</td>
                    <td>{registerForm.regBirth}</td>
                    <td>{registerForm.regPrefix}</td>
                    <td>{registerForm.regSex}</td>
                    <td>{registerForm.regNation}</td>
                    <td>{registerForm.regName}</td>
                    <td>{registerForm.regLastname}</td>
                    <td>{registerForm.regEname}</td>
                    <td>{registerForm.regElastname}</td>
                    <td>{registerForm.regPhone}</td>
                    <td>{registerForm.regEmail}</td>
                    <td><Image src={`data:image/png;base64, ${registerForm.regImg}`} alt="registerForm imge" thumbnail /></td>

                    {/* <img src={registerForm.img} alt="registerForm" /> */}
                    



                    <td> 
                      <RegisterFormAddRegisterFormModal data={registerForm} />
                      {/* <EditregisterFormModal data={registerForm} apiEdit={() => editregisterForm(editList)} /> */}
                      <Link href={`/RegisterForm/edit/${registerForm.id}`} className="mx-1 btn info icon icon-primary">
                        <FaPen />
                        <span className="h-tooltiptext">แก้ไขข้อมูล</span>
                      </Link>
                      <DeleteModal data={registerForm} apiDelete={() => deleteregisterForm(registerForm.id)} />
                    </td>

                  </tr>
                ))}


              </tbody>
            </Table>
          </Card.Body>
          <Card.Footer>
            <PageSelect page={params.page} totalPages={registerFormData?.pagination?.total} onChangePage={handleChangePage} onChangePageSize={handleChangePageSize} />
          </Card.Footer>
        </Card>

      </div>
    </LayOut>
  );
}
export default registerForm;