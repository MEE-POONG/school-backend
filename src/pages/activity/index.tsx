import React, { useEffect, useState } from "react";
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
// import { ActivitySchool } from '@prisma/client';
import LayOut from "@/components/RootPage/TheLayOut";
import ViewDetail from "@/pages/activity/viewdetail/[id]";

interface Params {
  page: number;
  pageSize: number;
  searchKey: string;
  totalPages: number;
}
const ActivitySchoolPage: React.FC = () => {
  const [params, setParams] = useState<Params>({
    page: 1,
    pageSize: 10,
    searchKey: "",
    totalPages: 1,
  });

  const [{ data: activitySchoolData }, getactivitySchool] = useAxios({
    url: `/api/activity?page=${params.page}&pageSize=${params.pageSize}&searchTerm=${params.searchKey}`,
    method: "GET",
  });

  const [
    { loading: deleteactivitySchoolLoading, error: deleteactivitySchoolError },
    executeactivitySchoolDelete,
  ] = useAxios({}, { manual: true });

  // const [filteredactivitySchoolsData, setFilteredactivitySchoolsData] = useState<
  //   ActivitySchool[]
  // >([]);

  // useEffect(() => {
  //   setFilteredactivitySchoolsData(activitySchoolData?.activitySchool ?? []);
  // }, [activitySchoolData]);

  // const deleteactivitySchool = (id: string): Promise<any> => {
  //   return executeactivitySchoolDelete({
  //     url: "/api/activity/" + id,
  //     method: "DELETE",
  //   }).then(() => {
  //     setFilteredactivitySchoolsData((prevactivitySchools) =>
  //       prevactivitySchools.filter((activitySchool) => activitySchool.id !== id)
  //     );
  //   });
  // };

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


  // useEffect(() => {
  //   if (activitySchoolData?.activitySchool) {
  //     // Filter the registerForm data based on searchKey
  //     const filteredData = activitySchoolData.activitySchool.filter((activitySchool: any) =>
  //       // Convert both the searchKey and the relevant data to lowercase for case-insensitive search
  //       activitySchool.activityName.toLowerCase().includes(params.searchKey.toLowerCase()) ||
  //       activitySchool.activityTitle.toLowerCase().includes(params.searchKey.toLowerCase()) ||
  //       activitySchool.activitySubTitle.toLowerCase().includes(params.searchKey.toLowerCase()) ||
  //       activitySchool.activitySubDetail.toLowerCase().includes(params.searchKey.toLowerCase()) ||
  //       activitySchool.activityDate.toLowerCase().includes(params.searchKey.toLowerCase())
  //     );

  //     setFilteredactivitySchoolsData(filteredData);
  //   }
  // }, [activitySchoolData, params.searchKey]);

  return (
    <LayOut>
      <div className="partner-page h-100">
        <Card className="h-100">
          <Card.Header className="d-flex space-between">
            <h4 className="mb-0 py-1">รายชื่อกิจกรรม</h4>


            {/* ค้นหาข้อมูล */}
            <InputGroup className="w-auto" bsPrefix="input-icon">
              <InputGroup.Text id="basic-addon1">
                <FaSearch />
              </InputGroup.Text>
              <Form.Control
                onChange={e => handleChangesearchKey(e.target.value)}
                placeholder="ค้นหากิจกรรม"
                aria-label="activity"
                aria-describedby="basic-addon1"
              />
            </InputGroup>

            <Link href="/activity/addActivity" className="ms-2 btn icon icofn-primary">
              เพิ่มกิจกรรม
            </Link>


          </Card.Header>
          <Card.Body className="p-0">
            <Table striped bordered hover className="scroll">
              <thead>
                <tr>
                  <th className="w-t-150">No</th>
                  <th className="w-t-150">ชื่อกิจกรรม</th>
                  {/* <th className="subtitle">วัน/เดือน/ปี เกิด</th> */}
                  <th className="w-t-150" >หัวข้อกิจกรรม</th>
                  <th className="w-t-150">หัวข้อย่อยกิจกรรม</th>
                  {/* <th>สัญชาติ</th> */}
                  <th className="w-t-150">รายละเอียดกิจกรรม</th>
                  <th className="w-t-150">วันที่</th>
                  {/* <th>ชื่อ ภาษาอังกฤษ</th>
                  <th>นามสกุล ภาษาอังกฤษ</th> */}
                  {/* <th>คำอธิบายกิจกรรม</th> */}

                  <th className="w-t-150">รูปภาพ</th>
                  <th className="w-t-150">จัดการ</th>
                </tr>
              </thead>

              <tbody className="text-center">
                {/* {filteredactivitySchoolsData.map((activitySchool, index) => (
                  <tr key={activitySchool.id}>
                    <td>{index + 1}</td>
                    <td>{activitySchool.activityName}</td>
                    <td>{activitySchool.activityTitle}</td>
                    <td>{activitySchool.activitySubTitle}</td>
                    <td>{activitySchool.activitySubDetail ? (
                      activitySchool.activitySubDetail.length > 100 ? (
                        `${activitySchool.activitySubDetail.substring(0, 100)}...`
                      ) : (
                        activitySchool.activitySubDetail
                      )
                    ) : null}</td>
                    <td>{activitySchool.activityDate}</td>
                    <td>
                      <Image
                        src={`https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${activitySchool.activityImg}/public`}
                        alt="activitySchool imge"
                        thumbnail
                      />
                    </td>


                    <td>
                      <ViewDetail data={activitySchool}/>
                      
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
                ))} */}
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
