import React, { useEffect, useState } from "react";
import Head from "next/head";
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
import { ActivitySchool } from '@prisma/client';
import LayOut from "@/components/RootPage/TheLayOut";

interface Params {
  page: number;
  pageSize: number;
  searchTerm: string;
  totalPages: number;
}
const ActivitySchoolPage: React.FC = () => {
  const [params, setParams] = useState<Params>({
    page: 1,
    pageSize: 10,
    searchTerm: "",
    totalPages: 1,
  });

  const [{ data: activitySchoolData }, getactivitySchool] = useAxios({
    url: `/api/activity?page=${params.page}&pageSize=${params.pageSize}&searchTerm=${params.searchTerm}`,
    method: "GET",
  });

  const [
    { loading: deleteactivitySchoolLoading, error: deleteactivitySchoolError },
    executeactivitySchoolDelete,
  ] = useAxios({}, { manual: true });

  const [filteredactivitySchoolsData, setFilteredactivitySchoolsData] = useState<
    ActivitySchool[]
  >([]);

  useEffect(() => {
    setFilteredactivitySchoolsData(activitySchoolData?.activitySchool ?? []);
    console.log(activitySchoolData);
  }, [activitySchoolData]);

  const deleteactivitySchool = (id: string): Promise<any> => {
    return executeactivitySchoolDelete({
      url: "/api/activity/" + id,
      method: "DELETE",
    }).then(() => {
      setFilteredactivitySchoolsData((prevactivitySchools) =>
        prevactivitySchools.filter((activitySchool) => activitySchool.id !== id)
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
            <h4 className="mb-0 py-1">รายชื่อกิจกรรม</h4>

            <Link href="/activity/addActivity" className="ms-2 btn icon icofn-primary">
              เพิ่มกิจกรรม
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

                  <th>รูปภาพ</th>
                  <th>จัดการ</th>
                </tr>
              </thead>

              <tbody className="text-center">
                {filteredactivitySchoolsData.map((activitySchool, index) => (
                  <tr key={activitySchool.id}>
                    <td>{index + 1}</td>
                    <td>{activitySchool.activityName}</td>
                    <td>{activitySchool.activityTitle}</td>
                    <td>{activitySchool.activitySubTitle}</td>
                    <td>{activitySchool.activitySubDetail}</td>
                    <td>{activitySchool.activityDate}</td>
                    <td>{activitySchool.activityDescription}</td>
                    <td>
                      <Image
                        src={`https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${activitySchool.activityImg}/public`}
                        alt="activitySchool imge"
                        thumbnail
                      />
                    </td>

                    {/* <img src={activitySchool.img} alt="activitySchool" /> */}

                    <td>
                      {/* <BasicDocument/> */}
                      {/* <activitySchoolAddactivitySchoolModal data={activitySchool} /> */}


                      {/* <EditactivitySchoolModal data={activitySchool} apiEdit={() => editactivitySchool(editList)} /> */}
                      <Link
                        href={`/activity/edit/${activitySchool.id}`}
                        className="mx-1 btn info icon icon-primary"
                      >
                        <FaPen />
                        <span className="h-tooltiptext">แก้ไขข้อมูล</span>
                      </Link>
                      <DeleteModal
                        data={activitySchool}
                        apiDelete={() => deleteactivitySchool(activitySchool.id)}
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
              totalPages={activitySchoolData?.pagination?.total}
              onChangePage={handleChangePage}
              onChangePageSize={handleChangePageSize}
            />
          </Card.Footer>
        </Card>
      </div>
    </LayOut>

    
  );
};
export default ActivitySchoolPage;
