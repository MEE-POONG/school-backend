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
import moment from "moment";
import { News, NewsType } from "@prisma/client";
import { useRouter } from "next/router";


interface Params {
  page: number;
  pageSize: number;
  search: string;
  type: string;
  totalPages: number;
}
const NewsPage: React.FC = (props) => {
  const router = useRouter();
  const [params, setParams] = useState<Params>({
    page: 1,
    pageSize: 10,
    search: "",
    type: "",
    totalPages: 1,
  });

  const [type, setType] = useState<NewsType[]>([]);
  const [filteredData, setFilteredData] = useState<News[]>([]);

  const [{ data: newsType, loading: loadingType, error: errorType }, getNewsType] = useAxios({
    url: `/api/NewsType`,
    method: "GET",
  });

  const [{ data: newsData, loading, error }, getNews] = useAxios({
    url: `/api/News/search?page=${params?.page}&pageSize=${params?.pageSize}&search=${params?.search}&type=${params?.type}`,
    method: "GET",
  });

  const [{ loading: deleteNewsLoading, error: deleteNewsError }, executeNewsDelete,] = useAxios({}, { manual: true });

  useEffect(() => {
    setType(newsType?.data);
  }, [newsType]);

  useEffect(() => {
    setFilteredData(newsData?.data);
    setParams((prevParams) => ({
      ...prevParams,
      totalPages: newsData?.pagination.totalPages,
    }));
  }, [newsData]);

  const deleteImage = async (img: string | null) => {
    try {
      await axios.delete(`https://upload-image.me-prompt-technology.com/?name=${img}`);
    } catch (error) {
      console.error("Delete failed: ", error);
    }
  };

  const deleteNews = async (list: News): Promise<void> => {
    try {
      if (!list?.img) {
        await deleteImage(list?.img);
      }
      if (!list?.promoteImg) {
        await deleteImage(list?.promoteImg);
      }

      await executeNewsDelete({
        url: `/api/News/${list.id}`,
        method: "DELETE",
      });

      if (params?.page === params?.totalPages) {
        setFilteredData((selectID) =>
          selectID.filter((newsArray) => newsArray.id !== list.id));
        console.log(1, filteredData?.length);

        if (filteredData?.length <= 1) {
          console.log(2, filteredData?.length);
          window.location.reload();
        }

      } else {
        console.log("104", filteredData?.length);

        getNews();
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

  const handleChangeType = (type: string) => {
    setParams(prevParams => ({
      ...prevParams,
      type: type,
    }));
  };

  const handleReadMore = (newsId: string, newsData: News) => {
    if (newsData) {
      localStorage.setItem('currentNewsItem', JSON.stringify(newsData));
    }

    router.push(`/news/${newsId}`);
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
            <h4 className="mb-0 py-1">รายชื่อข่าว</h4>
            <InputGroup className="w-auto">
              <DropdownButton
                variant="outline-secondary"
                title={params?.type?.length === 0 ? "ทั้งหมด" : params.type}
                id="input-group-dropdown-1"
              >
                <Dropdown.Item onClick={() => handleChangeType("")} className="text-center">ทั้งหมด</Dropdown.Item>
                {type?.map((list, index) => (
                  <Dropdown.Item key={index} onClick={() => handleChangeType(list?.nameTH)} className="text-center">{list?.nameTH}</Dropdown.Item>
                ))}

              </DropdownButton>
              <InputGroup.Text id="basic-addon1">
                <FaSearch />
              </InputGroup.Text>
              <Form.Control aria-label="Text input with dropdown button" onChange={e => handleChangeSearch(e.target.value)} />
            </InputGroup>

            <Link href="/news/add" className="ms-2 btn icon icofn-primary">
              เพิ่มข่าว
            </Link>
          </Card.Header>
          <Card.Body className="p-0 overflow-x-hidden">
            <Table striped bordered hover className="scroll">
              <thead>
                <tr>
                  <th className="w-r-3">No</th>
                  <th className="">รูปภาพ</th>
                  <th className="">หัวข้อข่าว</th>
                  <th className="">ประเภท</th>
                  <th className="">วันกิจกรรม</th>
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
                    <td className="">{list?.title}</td>
                    <td className="">
                      {list?.type}
                    </td>
                    <td className="">
                      {list?.startDate !== null ? ` เริ่ม ${moment(list?.startDate).format('DD-MM-YYYY')}` : ''}
                      <br />
                      {list?.endDate !== null ? `สิ้นสุด ${moment(list?.endDate).format('DD-MM-YYYY')}` : ''}
                    </td>
                    <td className="">
                      <Button onClick={() => handleReadMore(list?.id, list)} bsPrefix="mx-1 btn success icon">
                        <FaPager />
                        <span className="h-tooltiptext">ดูข้อมูล</span>
                      </Button>
                      <Link href={`/news/edit/${list?.id}`} className="mx-1 btn info icon" >
                        <FaPen />
                        <span className="h-tooltiptext">แก้ไขข้อมูล</span>
                      </Link>
                      <DeleteModal
                        title={`ข่าว ${list?.title}`}
                        apiDelete={() => deleteNews(list)}
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
export default NewsPage;
