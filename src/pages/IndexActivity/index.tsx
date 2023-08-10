import React, { useEffect, useState } from "react";
import Head from 'next/head';
import LayOut from "@/components/LayOut";
import { Badge, Card, Form, InputGroup, Table, Image } from 'react-bootstrap';
import { FaPen, FaSearch } from "react-icons/fa";
import Link from "next/link";
import useAxios from "axios-hooks";
import PageSelect from "@/components/PageSelect";
import DeleteModal from "@/components/modal/DeleteModal";
import { IndexActivity } from '@prisma/client';
import IndexActivityAddIndexActivityModal from "@/container/IndexActivity/AddIndexActivity";
/*import IndexActivity from "../api/IndexActivity";*/

interface Params {
    page: number;
    pageSize: number;
    searchTerm: string;
    totalPages: number;
  }

const IndexActivity: React.FC = () => {
    const [params, setParams] = useState<Params>({
        page: 1,
        pageSize: 10,
        searchTerm: "",
        totalPages: 1,
      });
// ใช้ซิงเกิลแบบนี้ไม่ได้
// `/api/partner?page=${params.page}&pageSize=${params.pageSize}`
        const [{ data: IndexActivityData }, getIndexActivity,] = useAxios({
            url: "/api/IndexActivity?page=${params.page}&pageSize=${params.pageSize}&searchTerm=${params.searchTerm}",
            method: "GET",
        });   
        

    const [id, setid] = useState<string>("");
    const [activityName, setactivityName] = useState<string>("");
    const [activityTitle, setactivityTitle] = useState<string>("");
    const [activitySubTitle, setactivitySubTitle] = useState<string>("");
    const [activitySubDetail, setactivitySubDetail] = useState<string>("");
    const [activityImg, setactivityImg] = useState<string>("");
    const [activityDate, setactivityDate] = useState<string>("");
    const [activityDescription, setactivityDescription] = useState<string>("");
     

    const [{ loading: deleteIndexActivityLoading, error: deleteIndexActivityError }, executeIndexActivityDelete,] = useAxios({}, { manual: true });

    const [filteredIndexActivityData, setfilteredIndexActivityData] = useState<IndexActivity[]>([]);

   useEffect(() => {
        setid(IndexActivityData?.IndexActivityls?.id)
        setactivityName(IndexActivityData?.IndexActivityls?.activityName)
        setactivityTitle(IndexActivityData?.IndexActivityls?.activityTitle)
        setactivitySubTitle(IndexActivityData?.IndexActivityls?.activitySubDetail)
        setactivitySubDetail(IndexActivityData?.IndexActivityls?.activitySubDetail)
        setactivityImg(IndexActivityData?.IndexActivityls?.activityImg)
        setactivityDate(IndexActivityData?.IndexActivityls?.activityDate)
        setactivityDescription(IndexActivityData?.IndexActivityls?.activityDescription)



        console.log(IndexActivityData?.IndexActivityls?.title);
        setfilteredIndexActivityData(IndexActivityData?.IndexActivityls ?? []);
        console.log(activityName);
    
       }, [IndexActivityData]);

       useEffect(() => {
        setfilteredIndexActivityData(IndexActivityData?.IndexActivityls?? []);
        console.log(IndexActivityData);
    
      }, [IndexActivityData]);

      const deleteIndexActivity = (id: string): Promise<any> => {
        return executeIndexActivityDelete({
          url: "/api/IndexActivity/" + id,
          method: "DELETE",
        }).then(() => {
            setfilteredIndexActivityData(prevIndexActivitys => prevIndexActivitys.filter(IndexActivity => IndexActivity.id !== id));
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
                IndexActivity
                </h4>
    
                {/* <AddListName /> */}
                <Link href="/IndexActivity/addIndexActivity" className="ms-2 btn icon icofn-primary">
              เพิ่มกิจกรรม
            </Link>
    
              </Card.Header>
              <Card.Body className="p-0">
              <Table striped bordered hover className="scroll">
      <thead>
        <tr>
          <th className=" text-center">id</th>
          <th>activityName</th>
          <th>activityTitle</th>
          <th>activitySubTitle</th>
          <th>activitySubDetail</th>
          <th>รูปภาพ</th>
          <th>activityDate</th>
          <th>activityDescription</th>
          <th>edit</th>

        </tr>
      </thead>
      <tbody className="text-center" >
        {filteredIndexActivityData.map((IndexActivity,index) => (
          <tr key={IndexActivity.id}>
            <tr>{index+1}</tr>
            <td>{IndexActivity.activityName}</td>
            <td>{IndexActivity.activityTitle}</td>
            <td>{IndexActivity.activitySubTitle}</td>
            <td>{IndexActivity.activitySubDetail}</td>
            <td><Image src={`data:image/png;base64, ${IndexActivity.activityImg}`} alt="IndexActivity activityImg" thumbnail /></td>
            <td>{IndexActivity.activityDate}</td>
            <td>{IndexActivity.activityDescription}</td>

            <td>

                        <IndexActivityAddIndexActivityModal data={IndexActivity} />
                        {/* <EditMemberModal data={member} apiEdit={() => editMember(editList)} /> */}
                        <Link href={`/IndexActivity/edit/${IndexActivity.id}`} className="mx-1 btn info icon icon-primary">
                          <FaPen />
                          <span className="h-tooltiptext">แก้ไขข้อมูล</span>
                        </Link>
                        <DeleteModal data={IndexActivity} apiDelete={() => deleteIndexActivity(IndexActivity.id)} />
                      </td>

            
            
          </tr>
        ))}
      </tbody>
    </Table>
    
              </Card.Body>
              <Card.Footer>
            <PageSelect page={params.page} totalPages={IndexActivityData?.pagination?.total} onChangePage={handleChangePage} onChangePageSize={handleChangePageSize} />
          </Card.Footer>
            </Card>
    
          </div>
        </LayOut>
      );
    
}
export default IndexActivity;