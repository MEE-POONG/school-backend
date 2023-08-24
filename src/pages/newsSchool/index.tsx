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
import { FaPen, FaSearch } from "react-icons/fa";
import Link from "next/link";
import useAxios from "axios-hooks";
import PageSelect from "@/components/PageSelect";
// import { bankMap } from "@/test";
import DeleteModal from "@/components/modal/DeleteModal";
import { NewsSchool } from '@prisma/client';
import NewsSchoolAddNewsSchoolModal from "@/container/NewsSchool/AddNewsSchool";

interface Params {
  page: number;
  pageSize: number;
  searchTerm: string;
  totalPages: number;
}
const NewsSchoolPage: React.FC = () => {
  const [params, setParams] = useState<Params>({
    page: 1,
    pageSize: 10,
    searchTerm: "",
    totalPages: 1,
  });

  const [{ data: newsSchoolData }, getnewsSchool] = useAxios({
    url: `/api/newsSchool?page=${params.page}&pageSize=${params.pageSize}&searchTerm=${params.searchTerm}`,
    method: "GET",
  });

  const [
    { loading: deletenewsSchoolLoading, error: deletenewsSchoolError },
    executenewsSchoolDelete,
  ] = useAxios({}, { manual: true });

  const [filterednewsSchoolsData, setFilterednewsSchoolsData] = useState<
    NewsSchool[]
  >([]);

  useEffect(() => {
    setFilterednewsSchoolsData(newsSchoolData?.newsSchool ?? []);
    console.log(newsSchoolData);
  }, [newsSchoolData]);

  const deletenewsSchool = (id: string): Promise<any> => {
    return executenewsSchoolDelete({
      url: "/api/newsSchool/" + id,
      method: "DELETE",
    }).then(() => {
      setFilterednewsSchoolsData((prevnewsSchools) =>
        prevnewsSchools.filter((newsSchool) => newsSchool.id !== id)
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
            <h4 className="mb-0 py-1">รายชื่อข่าว</h4>

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

            <Link href="/newsSchool/addnewsSchool" className="ms-2 btn icon icofn-primary">
              เพิ่มข่าว
            </Link>
          </Card.Header>
          <Card.Body className="p-0">
            <Table striped bordered hover className="scroll">
              <thead>
                <tr>
                  <th className="no">No</th>
                  <th className="title">ชื่อข่าว</th>
                  {/* <th className="subtitle">วัน/เดือน/ปี เกิด</th> */}
                  <th>หัวข้อข่าว</th>
                  <th>หัวข้อย่อยข่าว</th>
                  {/* <th>สัญชาติ</th> */}
                  <th>รายละเอียดข่าว</th>
                  <th>วันที่</th>
                  {/* <th>ชื่อ ภาษาอังกฤษ</th>
                  <th>นามสกุล ภาษาอังกฤษ</th> */}
                  <th>คำอธิบายข่าว</th>

                  <th>รูปภาพ</th>
                  <th>จัดการ</th>
                </tr>
              </thead>

              <tbody className="text-center">
                {filterednewsSchoolsData.map((newsSchool, index) => (
                  <tr key={newsSchool.id}>
                    <td>{index + 1}</td>
                    {/* <td>{newsSchool.regId}</td> */}
                    <td>{newsSchool.newName}</td>
                    {/* <td>{newsSchool.regBirth}</td> */}
                    <td>{newsSchool.newTitle}</td>
                    <td>{newsSchool.newSubTitle}</td>
                    {/* <td>{newsSchool.regNation}</td> */}
                    <td>{newsSchool.newSubDetail}</td>
                    <td>{newsSchool.newDate}</td>
                    {/* <td>{newsSchool.regEname}</td>
                    <td>{newsSchool.regElastname}</td> */}

                    <td>
                      <Image
                        src={`https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${newsSchool.newImg}/public`}
                        alt="newsSchool imge"
                        thumbnail
                      />
                    </td>

                    {/* <img src={newsSchool.img} alt="newsSchool" /> */}

                    <td>
                      {/* <BasicDocument/> */}
                      {/* <newsSchoolAddnewsSchoolModal data={newsSchool} /> */}


                      {/* <EditnewsSchoolModal data={newsSchool} apiEdit={() => editnewsSchool(editList)} /> */}
                      <Link
                        href={`/newsSchool/edit/${newsSchool.id}`}
                        className="mx-1 btn info icon icon-primary"
                      >
                        <FaPen />
                        <span className="h-tooltiptext">แก้ไขข้อมูล</span>
                      </Link>
                      <DeleteModal
                        data={newsSchool}
                        apiDelete={() => deletenewsSchool(newsSchool.id)}
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
              totalPages={newsSchoolData?.pagination?.total}
              onChangePage={handleChangePage}
              onChangePageSize={handleChangePageSize}
            />
          </Card.Footer>
        </Card>
      </div>
    </LayOut>
  );
};
export default NewsSchoolPage;