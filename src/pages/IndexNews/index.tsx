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
import { IndexNews } from '@prisma/client';
import IndexNewsAddIndexNewsModal from "@/container/IndexNews/AddIndexNews";

interface Params {
  page: number;
  pageSize: number;
  searchTerm: string;
  totalPages: number;
}
const indexNews: React.FC = () => {
  const [params, setParams] = useState<Params>({
    page: 1,
    pageSize: 10,
    searchTerm: "",
    totalPages: 1,
  });

  const [{ data: indexNewsData }, getindexNews] = useAxios({
    url: `/api/IndexNews?page=${params.page}&pageSize=${params.pageSize}&searchTerm=${params.searchTerm}`,
    method: "GET",
  });

  const [
    { loading: deleteindexNewsLoading, error: deleteindexNewsError },
    executeindexNewsDelete,
  ] = useAxios({}, { manual: true });

  const [filteredindexNewssData, setFilteredindexNewssData] = useState<
    IndexNews[]
  >([]);

  useEffect(() => {
    setFilteredindexNewssData(indexNewsData?.indexNews ?? []);
    console.log(indexNewsData);
  }, [indexNewsData]);

  const deleteindexNews = (id: string): Promise<any> => {
    return executeindexNewsDelete({
      url: "/api/IndexNews/" + id,
      method: "DELETE",
    }).then(() => {
      setFilteredindexNewssData((previndexNewss) =>
        previndexNewss.filter((indexNews) => indexNews.id !== id)
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

            <Link href="/IndexNews/addIndexNews" className="ms-2 btn icon icofn-primary">
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
                {filteredindexNewssData.map((indexNews, index) => (
                  <tr key={indexNews.id}>
                    <td>{index + 1}</td>
                    {/* <td>{indexNews.regId}</td> */}
                    <td>{indexNews.newName}</td>   
                    {/* <td>{indexNews.regBirth}</td> */}
                    <td>{indexNews.newTitle}</td>
                    <td>{indexNews.newSubTitle}</td>
                    {/* <td>{indexNews.regNation}</td> */}
                    <td>{indexNews.newSubDetail}</td>
                    <td>{indexNews.newDate}</td>
                    {/* <td>{indexNews.regEname}</td>
                    <td>{indexNews.regElastname}</td> */}
                    
                    <td>
                      <Image
                        src={`data:image/png;base64, ${indexNews.newImg}`}
                        alt="indexNews imge"
                        thumbnail
                      />
                    </td>

                    {/* <img src={indexNews.img} alt="indexNews" /> */}

                    <td>
                      {/* <BasicDocument/> */}
                      {/* <indexNewsAddindexNewsModal data={indexNews} /> */}


                      {/* <EditindexNewsModal data={indexNews} apiEdit={() => editindexNews(editList)} /> */}
                      <Link
                        href={`/IndexNews/edit/${indexNews.id}`}
                        className="mx-1 btn info icon icon-primary"
                      >
                        <FaPen />
                        <span className="h-tooltiptext">แก้ไขข้อมูล</span>
                      </Link>
                      <DeleteModal
                        data={indexNews}
                        apiDelete={() => deleteindexNews(indexNews.id)}
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
              totalPages={indexNewsData?.pagination?.total}
              onChangePage={handleChangePage}
              onChangePageSize={handleChangePageSize}
            />
          </Card.Footer>
        </Card>
      </div>
    </LayOut>
  );
};
export default indexNews;
