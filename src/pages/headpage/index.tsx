import React, { useEffect, useState } from "react";
import Head from "next/head";
import LayOut from "@/components/RootPage/TheLayOut";
import {
  Card,
  Image,
  Table,
} from "react-bootstrap";
import useAxios from "axios-hooks";
import PageSelect from "@/components/PageSelect";
import { HeadPage } from "@prisma/client";

interface Params {
  page: number;
  pageSize: number;
  searchKey: string;
  totalPages: number;
}
const HomePageEdit: React.FC = () => {
  const [params, setParams] = useState<Params>({
    page: 1,
    pageSize: 10,
    searchKey: "",
    totalPages: 1,
  });

  const [{ data: headPageData }, getheadPage] = useAxios({
    url: `/api/headpage?page=${params.page}&pageSize=${params.pageSize}&searchKey=${params.searchKey}`,
    method: "GET",
  });

  const [
    { loading: deleteheadPageLoading, error: deleteheadPageError },
    executeheadPageDelete,
  ] = useAxios({}, { manual: true });

  const [filteredheadPageData, setFilteredheadPageData] = useState<
  HeadPage[]
  >([]);

  useEffect(() => {
    setFilteredheadPageData(headPageData?.headPage ?? []);
  }, [headPageData]);

//   const deleteregisterForm = (id: string): Promise<any> => {
//     return executeHeadPageDelete({
//       url: "/api/headpage/" + id,
//       method: "DELETE",
//     }).then(() => {
//       setFilteredheadPageData((prevheadPage) =>
//         prevheadPage.filter((registerForm) => registerForm.id !== id)
//       );
//     });
//   };

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
    if (headPageData?.headPage) {
      // Filter the registerForm data based on searchKey
      const filteredData = headPageData.headPage.filter((headPage:any) =>
        // Convert both the searchKey and the relevant data to lowercase for case-insensitive search
        headPage.title.toLowerCase().includes(params.searchKey.toLowerCase()) ||
        headPage.subTitle.toLowerCase().includes(params.searchKey.toLowerCase()) ||
        headPage.detail.toLowerCase().includes(params.searchKey.toLowerCase()) ||
        headPage.imgOne.toLowerCase().includes(params.searchKey.toLowerCase()) ||
        headPage.imgTwo.toLowerCase().includes(params.searchKey.toLowerCase()) ||
        headPage.imgThree.toLowerCase().includes(params.searchKey.toLowerCase())
      );

      setFilteredheadPageData(filteredData);
    }
  }, [headPageData, params.searchKey]);
  
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
            <h4 className="mb-0 py-1">แก้ไขข้อมูลหน้าหลัก</h4>
          </Card.Header>
          <Card.Body className="p-0">
            <Table striped bordered hover className="scroll">
              <thead>
                <tr>
                  <th className="w-t-150">ชื่อวิทยาลัย</th>
                  <th className="w-t-150">หัวข้อย่อย 1</th>
                  <th className="w-t-150">รูปที่ 1(รูปใหญ่)</th>
                  <th className="w-t-150">รูปที่ 2</th>
                  <th className="w-t-150">รูปที่ 3</th>
                </tr>
              </thead>

              <tbody className="text-center">
                {filteredheadPageData.map((headPage, index) => (
                  <tr key={headPage.id}>
                    <td>{index + 1}</td>
                    <td>{headPage.title}</td>
                    <td>{headPage.subTitle}</td>
                    <td>{headPage.pageCheck}</td>
                    <td>{headPage.detail}</td>
                    <td>
                      <Image
                        src={`https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${headPage.imgOne ? headPage.imgOne : 'f701ce08-7ebe-4af2-c4ec-2b3967392900' }/public`}
                        alt="headPage imge"
                        thumbnail
                      />
                    </td>
                    <td>
                      <Image
                        src={`https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${headPage.imgTwo ? headPage.imgTwo : 'f701ce08-7ebe-4af2-c4ec-2b3967392900' }/public`}
                        alt="headPage imge"
                        thumbnail
                      />
                    </td>
                    <td>
                      <Image
                        src={`https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${headPage.imgThree ? headPage.imgThree : 'f701ce08-7ebe-4af2-c4ec-2b3967392900' }/public`}
                        alt="headPage imge"
                        thumbnail
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
              totalPages={headPageData?.pagination?.total}
              onChangePage={handleChangePage}
              onChangePageSize={handleChangePageSize}
            />
          </Card.Footer>
        </Card>
      </div>
    </LayOut>
  );
};
export default HomePageEdit;
