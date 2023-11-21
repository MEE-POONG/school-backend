import React, { useEffect, useState } from "react";
import Head from "next/head";
import {
  Card,
  Form,
  Image,
  InputGroup,
  Table,
} from "react-bootstrap";
import { FaPen, FaSearch } from "react-icons/fa";
import Link from "next/link";
import useAxios from "axios-hooks";
import PageSelect from "@/components/PageSelect";
import DeleteModal from "@/components/modal/DeleteModal";
import LayOut from "@/components/RootPage/TheLayOut";
import ViewDetail from "./viewdetail/[id]";
import { ReFormatDate } from "@/components/ReFormatDate";
import { News as PrismaNews, NewsType as PrismaNewsType } from '@prisma/client';

interface NewsType extends PrismaNewsType {

}

interface News extends PrismaNews {
  NewsType: NewsType;
}

interface Params {
  page: number;
  pageSize: number;
  search: string;
  type: string;
  totalPages: number;
}
const NewsPage: React.FC = (props) => {
  const [params, setParams] = useState<Params>({
    page: 1,
    pageSize: 10,
    search: "",
    type: "",
    totalPages: 1,
  });

  const [{ data: newsData, loading, error }, getNews] = useAxios({
    url: `/api/News/search?page=${params?.page}&pageSize=${params?.pageSize}&search=${params?.search}&type=${params?.type}`,
    method: "GET",
  });

  const [filteredData, setFilteredData] = useState<News[]>([]);

  useEffect(() => {
    setFilteredData(newsData?.data);
    setParams((prevParams) => ({
      ...prevParams,
      totalPages: newsData?.pagination.totalPages,
    }));
  }, [newsData]);

  useEffect(() => {
    console.log(params);
  }, [params]);

  useEffect(() => {
    console.log(filteredData);
  }, [filteredData]);

  // const [
  //   { loading: deleteNewsLoading, error: deleteNewsError },
  //   executeNewsDelete,
  // ] = useAxios({}, { manual: true });


  // useEffect(() => {
  //   if (newsData?.success) {
  //     setFilteredNewsData(newsData?.data ?? []);
  //   }
  //   console.log("newsData : ", newsData);

  // }, [newsData]);

  // const deleteNews = (id: string): Promise<any> => {
  //   return executeNewsDelete({
  //     url: "/api/news/" + id,
  //     method: "DELETE",
  //   }).then(() => {
  //     setFilteredNewsData((selectID) =>
  //       selectID.filter((newsArray) => newsArray.id !== id)
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
      search: search,
    }));
  };


  // useEffect(() => {
  //   if (newsData?.news) {
  //     const filteredData = newsData.news?.filter((news: any) =>
  //       // Convert both the searchKey and the relevant data to lowercase for case-insensitive search
  //       news?.title.toLowerCase().includes(params.searchKey.toLowerCase()) ||
  //       news?.subTitle.toLowerCase().includes(params.searchKey.toLowerCase()) ||
  //       news?.Date.toLowerCase().includes(params.searchKey.toLowerCase())
  //     );

  //     setFilteredNewsData(filteredData);
  //   }
  // }, [newsData, params.searchKey]);

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
            <InputGroup className="w-auto" bsPrefix="input-icon">
              <InputGroup.Text id="basic-addon1">
                <FaSearch />
              </InputGroup.Text>
              <Form.Control onChange={e => handleChangesearchKey(e.target.value)}
                placeholder="ค้นหาข่าว"
                aria-label="news"
                aria-describedby="basic-addon1"
              />
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
                  <tr key={list.id}>
                    <td className="w-r-3">{index + 1}</td>
                    <td className="">
                      <Image
                        src={`https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${list.img}/public`}
                        className="size-img"
                        alt="news imge"
                        thumbnail
                      />
                    </td>
                    <td className="">{list.title}</td>
                    <td className="">
                      {list?.NewsType?.nameTH}
                    </td>
                    <td className="">

                    </td>
                    <td className="">
                      {/* <ViewDetail data={news} /> */}
                      {/* <Link href={`/news/edit/${list.id}`} className="mx-1 btn info icon icon-primary" >
                        <FaPen />
                        <span className="h-tooltiptext">แก้ไขข้อมูล</span>
                      </Link> */}
                      {/* <DeleteModal
                        data={news}
                        apiDelete={() => deleteNews(list.id)}
                      /> */}
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
