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
import LayOut from "@/components/RootPage/TheLayOut";
import ViewDetail from "./viewdetail/[id]";
import { News } from "@prisma/client";


interface Params {
  page: number;
  pageSize: number;
  searchKey: string;
  totalPages: number;
}
const NewsSchoolPage: React.FC = () => {
  const [params, setParams] = useState<Params>({
    page: 1,
    pageSize: 10,
    searchKey: "",
    totalPages: 1,
  });

  const [{ data: newsData }, getNews] = useAxios({
    url: `/api/news?page=${params.page}&pageSize=${params.pageSize}&searchTeam=${params.searchKey}`,
    method: "GET",
  });

  const [
    { loading: deleteNewsLoading, error: deleteNewsError },
    executeNewsDelete,
  ] = useAxios({}, { manual: true });

  const [filteredNewssData, setFilteredNewsData] = useState<
    News[]
  >([]);

  useEffect(() => {
    setFilteredNewsData(newsData?.newsSchool ?? []);
  }, [newsData]);

  const deleteNews = (id: string): Promise<any> => {
    return executeNewsDelete({
      url: "/api/news/" + id,
      method: "DELETE",
    }).then(() => {
      setFilteredNewsData((prevnewsSchools) =>
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

  const handleChangesearchKey = (search: string) => {
    setParams(prevParams => ({
      ...prevParams,
      searchKey: search,
    }));
  };


  useEffect(() => {
    if (newsData?.news) {
      // Filter the registerForm data based on searchKey
      const filteredData = newsData.news?.filter((news: any) =>
        // Convert both the searchKey and the relevant data to lowercase for case-insensitive search
        news?.title.toLowerCase().includes(params.searchKey.toLowerCase()) ||
        news?.subTitle.toLowerCase().includes(params.searchKey.toLowerCase()) ||
        news?.Date.toLowerCase().includes(params.searchKey.toLowerCase())
      );

      setFilteredNewsData(filteredData);
    }
  }, [newsData, params.searchKey]);

  return (
    <LayOut>
      <Head>
        <title>Phanomwan Backend</title>
        <meta name="description" content="T ACTIVE" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="partner-page h-100">
        <Card className="h-100">
          <Card.Header className="d-flex space-between">
            <h4 className="mb-0 py-1">รายชื่อข่าว</h4>
            <InputGroup className="w-auto" bsPrefix="input-icon">
              <InputGroup.Text id="basic-addon1">
                <FaSearch />
              </InputGroup.Text>
              <Form.Control
                onChange={e => handleChangesearchKey(e.target.value)}
                placeholder="ค้นหาข่าว"
                aria-label="newsSchool"
                aria-describedby="basic-addon1"
              />
            </InputGroup>
            <Link href="/news/add" className="ms-2 btn icon icofn-primary">
              เพิ่มข่าว
            </Link>
          </Card.Header>
          <Card.Body className="p-0">
            <Table striped bordered hover className="scroll">
              <thead>
                <tr>
                  <th className="w-3">No</th>
                  <th className="w-t-150">หัวข้อข่าว</th>
                  <th className="w-t-150">วันที่</th>
                  <th className="w-t-150">รูปภาพ</th>
                  <th className="w-t-150">จัดการ</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {filteredNewssData?.map((news, index) => (
                  <tr key={news.id}>
                    <td>{index + 1}</td>
                    <td>{news.title}</td>
                    <td>{news.date}</td>
                    <td>{news.type}</td>
                    <td>
                      <Image
                        src={`https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${news.img}/public`}
                        alt="newsSchool imge"
                        thumbnail
                      />
                    </td>
                    <td>
                      <ViewDetail data={news} />
                      <Link href={`/newsSchool/edit/${news.id}`} className="mx-1 btn info icon icon-primary" >
                        <FaPen />
                        <span className="h-tooltiptext">แก้ไขข้อมูล</span>
                      </Link>
                      <DeleteModal
                        data={news}
                        apiDelete={() => deleteNews(news.id)}
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
              totalPages={newsData?.pagination?.total}
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
