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
import { ActivitySchool } from '@prisma/client';
import ActivitySchoolAddActivitySchoolModal from "@/container/ActivitySchool/AddActivitySchool";

interface Params {
  page: number;
  pageSize: number;
  searchTerm: string;
  totalPages: number;
}
const ActivitySchool: React.FC = () => {
  const [params, setParams] = useState<Params>({
    page: 1,
    pageSize: 10,
    searchTerm: "",
    totalPages: 1,
  });

  const [{ data: ActivitySchoolData }, getActivitySchool] = useAxios({
    url: `/api/ActivitySchool?page=${params.page}&pageSize=${params.pageSize}&searchTerm=${params.searchTerm}`,
    method: "GET",
  });

  const [
    { loading: deleteActivitySchoolLoading, error: deleteActivitySchoolError },
    executeActivitySchoolDelete,
  ] = useAxios({}, { manual: true });

  const [filteredActivitySchoolsData, setFilteredActivitySchoolsData] = useState<
    ActivitySchool[]
  >([]);

  useEffect(() => {
    setFilteredActivitySchoolsData(ActivitySchoolData?.ActivitySchool ?? []);
    console.log(ActivitySchoolData);
  }, [ActivitySchoolData]);

  const deleteActivitySchool = (id: string): Promise<any> => {
    return executeActivitySchoolDelete({
      url: "/api/ActivitySchool/" + id,
      method: "DELETE",
    }).then(() => {
      setFilteredActivitySchoolsData((prevActivitySchools) =>
        prevActivitySchools.filter((ActivitySchool) => ActivitySchool.id !== id)
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

            <Link href="/ActivitySchool/addActivitySchool" className="ms-2 btn icon icofn-primary">
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
                {filteredActivitySchoolsData.map((ActivitySchool, index) => (
                  <tr key={ActivitySchool.id}>
                    <td>{index + 1}</td>
                    <td>{ActivitySchool.activityName}</td>
                    <td>{ActivitySchool.activityTitle}</td>
                    <td>{ActivitySchool.activitySubTitle}</td>
                    <td>{ActivitySchool.activitySubDetail}</td>
                    <td>{ActivitySchool.activityDate}</td>
                    <td>{ActivitySchool.activityDescription}</td>
                    <td>
                      <Image
                        src={`https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${ActivitySchool.activityImg}/public`}
                        alt="ActivitySchool imge"
                        thumbnail
                      />
                    </td>

                    {/* <img src={ActivitySchool.img} alt="ActivitySchool" /> */}

                    <td>
                      {/* <BasicDocument/> */}
                      {/* <ActivitySchoolAddActivitySchoolModal data={ActivitySchool} /> */}


                      {/* <EditActivitySchoolModal data={ActivitySchool} apiEdit={() => editActivitySchool(editList)} /> */}
                      <Link
                        href={`/ActivitySchool/edit/${ActivitySchool.id}`}
                        className="mx-1 btn info icon icon-primary"
                      >
                        <FaPen />
                        <span className="h-tooltiptext">แก้ไขข้อมูล</span>
                      </Link>
                      <DeleteModal
                        data={ActivitySchool}
                        apiDelete={() => deleteActivitySchool(ActivitySchool.id)}
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
              totalPages={ActivitySchoolData?.pagination?.total}
              onChangePage={handleChangePage}
              onChangePageSize={handleChangePageSize}
            />
          </Card.Footer>
        </Card>
      </div>
    </LayOut>

    
  );
};
export default ActivitySchool;
