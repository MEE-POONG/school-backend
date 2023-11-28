import React, { useEffect, useState } from "react";
import Head from "next/head";
import {
  Button,
  Card,
  Dropdown,
  DropdownButton,
  Form,
  Image,
  InputGroup,
  Table,
} from "react-bootstrap";
import { FaPager, FaPen, FaSearch } from "react-icons/fa";
import Link from "next/link";
import useAxios from "axios-hooks";
import axios from 'axios';
import PageSelect from "@/components/PageSelect";
import DeleteModal from "@/components/modal/DeleteModal";
import LayOut from "@/components/RootPage/TheLayOut";
import { useRouter } from "next/router";
import { CourseGroup } from "@prisma/client";


interface Params {
  page: number;
  pageSize: number;
  search: string;
  totalPages: number;
}
const CoursePage: React.FC = (props) => {
  const router = useRouter();
  const [params, setParams] = useState<Params>({
    page: 1,
    pageSize: 10,
    search: "",
    totalPages: 1,
  });

  // const [type, setType] = useState<NewsType[]>([]);
  const [filteredData, setFilteredData] = useState<CourseGroup[]>([]);

  // const [{ data: newsType, loading: loadingType, error: errorType }, getNewsType] = useAxios({
  //   url: `/api/CourseGroupType`,
  //   method: "GET",
  // });

  const [{ data, loading, error }, getCourseGroup] = useAxios({
    url: `/api/CourseGroup/search?page=${params?.page}&pageSize=${params?.pageSize}&search=${params?.search}`,
    method: "GET",
  });

  const [{ loading: deleteCourseLoading, error: deleteCourseError }, executeCourseGroupDelete,] = useAxios({}, { manual: true });

  useEffect(() => {
    setFilteredData(data?.data);
    setParams((prevParams) => ({
      ...prevParams,
      totalPages: data?.pagination.totalPages,
    }));
  }, [data]);

  const deleteImage = async (img: string | null) => {
    try {
      await axios.delete(`https://upload-image.me-prompt-technology.com/?name=${img}`);
    } catch (error) {
      console.error("Delete failed: ", error);
    }
  };

  const deleteList = async (list: CourseGroup): Promise<void> => {
    try {
      if (list?.img) {
        await deleteImage(list?.img);
      }

      await executeCourseGroupDelete({
        url: `/api/CourseGroup/${list.id}`,
        method: "DELETE",
      });

      if (params?.page === params?.totalPages) {
        setFilteredData((selectID) =>
          selectID.filter((Array) => Array.id !== list.id));

        if (filteredData?.length <= 1) {
          window.location.reload();
        }

      } else {
        getCourseGroup();
      }
    } catch (error) {
      console.error('Error deleting news:', error);
    }
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

  const handleChangeSearch = (search: string) => {
    setParams(prevParams => ({
      ...prevParams,
      search: search,
    }));
  };

  const handleReadMore = (id: string, list: CourseGroup) => {
    if (list) {
      localStorage.setItem('currentNewsItem', JSON.stringify(list));
    }

    router.push(`/course/${id}`);
  };

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
            <h4 className="mb-0 py-1">คณะ</h4>
            <InputGroup className="w-auto">
              <InputGroup.Text id="basic-addon1">
                <FaSearch />
              </InputGroup.Text>
              <Form.Control aria-label="Text input with dropdown button" onChange={e => handleChangeSearch(e.target.value)} />
            </InputGroup>
            <Link href="/course/add" className="ms-2 btn icon icofn-primary">
              เพิ่มหลักสูตร
            </Link>
          </Card.Header>
          <Card.Body className="p-0 overflow-x-hidden">
            <Table striped bordered hover className="scroll">
              <thead>
                <tr>
                  <th className="w-r-3">No</th>
                  <th className="">รูปภาพ</th>
                  <th className="">คณะ</th>
                  <th className="">จัดการ</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {filteredData?.map((list, index) => (
                  <tr key={list?.id}>
                    <td className="w-r-3">{index + 1}</td>
                    <td className="">
                      <Image
                        src={`https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${list?.img}/public`}
                        className="size-img"
                        alt="news imge"
                        thumbnail
                      />
                    </td>
                    <td className="">
                      <div className="pb-3">
                        {list?.nameTH}
                        <br />
                        {list?.nameEN}
                        <br />
                      </div>
                    </td>
                    <td className="">
                      <Button onClick={() => handleReadMore(list?.id, list)} bsPrefix="mx-1 btn success icon">
                        <FaPager />
                        <span className="h-tooltiptext">ดูข้อมูล</span>
                      </Button>
                      <Link href={`/course/edit/${list?.id}`} className="mx-1 btn info icon" >
                        <FaPen />
                        <span className="h-tooltiptext">แก้ไขข้อมูล</span>
                      </Link>
                      <DeleteModal
                        title={`ข่าว ${list?.nameTH}`}
                        apiDelete={() => deleteList(list)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
          <Card.Footer>
            <PageSelect page={params?.page} totalPages={params?.totalPages} onChangePage={handleChangePage} onChangePageSize={handleChangePageSize} />
          </Card.Footer>
        </Card>
      </div>
    </LayOut>
  );
};
export default CoursePage;
