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
import { IndexActivity } from '@prisma/client';
import IndexActivityAddIndexActivityModal from "@/container/IndexActivity/AddIndexActivity";

interface Params {
  page: number;
  pageSize: number;
  searchTerm: string;
  totalPages: number;
}
const indexActivity: React.FC = () => {
  const [params, setParams] = useState<Params>({
    page: 1,
    pageSize: 10,
    searchTerm: "",
    totalPages: 1,
  });

  const [{ data: indexActivityData }, getindexActivity] = useAxios({
    url: `/api/indexActivity?page=${params.page}&pageSize=${params.pageSize}&searchTerm=${params.searchTerm}`,
    method: "GET",
  });

  const [
    { loading: deleteindexActivityLoading, error: deleteindexActivityError },
    executeindexActivityDelete,
  ] = useAxios({}, { manual: true });

  const [filteredindexActivitysData, setFilteredindexActivitysData] = useState<
  IndexActivity[]
  >([]);

  useEffect(() => {
    setFilteredindexActivitysData(indexActivityData?.indexActivity ?? []);
    console.log(indexActivityData);
  }, [indexActivityData]);

  const deleteindexActivity = (id: string): Promise<any> => {
    return executeindexActivityDelete({
      url: "/api/indexActivity/" + id,
      method: "DELETE",
    }).then(() => {
      setFilteredindexActivitysData((previndexActivitys) =>
        previndexActivitys.filter((indexActivity) => indexActivity.id !== id)
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

            <Link href="/IndexActivity/addIndexActivity" className="ms-2 btn icon icofn-primary">
              เพิ่มโปรโมชั่น
            </Link>
          </Card.Header>
          <Card.Body className="p-0">
            <Table striped bordered hover className="scroll">
              <thead>
                <tr>
                  <th className="no">No</th>
                  <th className="title">ชื่อกิจกรรม</th>
                  {/* <th className="subtitle">วัน/เดือน/ปี เกิด</th> */}
                  <th>หัวข้อกิจกรรม</th>
                  <th>หัวข้อย่อยกิจกรรม</th>
                  {/* <th>สัญชาติ</th> */}
                  <th>รายละเอียดกิจกรรม</th>
                  <th>วันที่</th>
                  {/* <th>ชื่อ ภาษาอังกฤษ</th>
                  <th>นามสกุล ภาษาอังกฤษ</th> */}
                  <th>คำอธิบายกิจกรรม</th>
                  <th>E-mail</th>
                  <th>โปรไฟล์</th>
                  <th>จัดการ</th>
                </tr>
              </thead>

              <tbody className="text-center">
                {filteredindexActivitysData.map((indexActivity, index) => (
                  <tr key={indexActivity.id}>
                    <td>{index + 1}</td>
                    {/* <td>{indexActivity.regId}</td> */}
                    <td>{indexActivity.activityName}</td>
                    {/* <td>{indexActivity.regBirth}</td> */}
                    <td>{indexActivity.activityTitle}</td>
                    <td>{indexActivity.activitySubTitle}</td>
                    {/* <td>{indexActivity.regNation}</td> */}
                    <td>{indexActivity.activitySubDetail}</td>
                    <td>{indexActivity.activityDate}</td>
                    {/* <td>{indexActivity.regEname}</td>
                    <td>{indexActivity.regElastname}</td> */}
                    <td>{indexActivity.activityDescription}</td>
                    <td>
                      <Image
                        src={`data:image/png;base64, ${indexActivity.activityImg}`}
                        alt="indexActivity imge"
                        thumbnail
                      />
                    </td>

                    {/* <img src={indexActivity.img} alt="indexActivity" /> */}

                    <td>
                      {/* <BasicDocument/> */}
                      {/* <indexActivityAddindexActivityModal data={indexActivity} /> */}
                      <IndexActivityAddIndexActivityModal
                        data={indexActivity}
                      />

                      {/* <EditindexActivityModal data={indexActivity} apiEdit={() => editindexActivity(editList)} /> */}
                      <Link
                        href={`/IndexActivity/edit/${indexActivity.id}`}
                        className="mx-1 btn info icon icon-primary"
                      >
                        <FaPen />
                        <span className="h-tooltiptext">แก้ไขข้อมูล</span>
                      </Link>
                      <DeleteModal
                        data={indexActivity}
                        apiDelete={() => deleteindexActivity(indexActivity.id)}
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
              totalPages={indexActivityData?.pagination?.total}
              onChangePage={handleChangePage}
              onChangePageSize={handleChangePageSize}
            />
          </Card.Footer>
        </Card>
      </div>
    </LayOut>
  );
};
export default indexActivity;
