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
import { FaPen, FaSearch, FaUserNinja } from "react-icons/fa";
import Link from "next/link";
import useAxios from "axios-hooks";
import PageSelect from "@/components/PageSelect";
// import { bankMap } from "@/test";
import DeleteModal from "@/components/modal/DeleteModal";
import { IndexSlder } from "@prisma/client";


interface Params {
  page: number;
  pageSize: number;
  searchTerm: string;
  totalPages: number;
}
const IndexSlder: React.FC = () => {
  const [params, setParams] = useState<Params>({
    page: 1,
    pageSize: 10,
    searchTerm: "",
    totalPages: 1,
  });

  const [{ data: indexSlderData }, getindexSlder] = useAxios({
    url: `/api/IndexSlder?page=${params.page}&pageSize=${params.pageSize}&searchTerm=${params.searchTerm}`,
    method: "GET",
  });

  const [
    { loading: deleteindexSlderLoading, error: deleteindexSlderError },
    executeindexSlderDelete,
  ] = useAxios({}, { manual: true });

  const [filteredindexSldersData, setFilteredindexSldersData] = useState<
    IndexSlder[]
  >([]);

  useEffect(() => {
    setFilteredindexSldersData(indexSlderData?.indexSlder ?? []);
    console.log(indexSlderData);
  }, [indexSlderData]);

  const deleteindexSlder = (id: string): Promise<any> => {
    return executeindexSlderDelete({
      url: "/api/indexSlder/" + id,
      method: "DELETE",
    }).then(() => {
      setFilteredindexSldersData((previndexSlders) =>
        previndexSlders.filter((indexSlder) => indexSlder.id !== id)
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
            <h4 className="mb-0 py-1">รูปภาพสไลด์</h4>
            <Link href="/indexSlider/addIndexSlider" className="ms-2 btn icon icofn-primary">
              เพิ่มรูปภาพ
            </Link>
          </Card.Header>



          <Card.Body className="p-0">
            <Table striped bordered hover className="scroll">
              <thead>
                <tr>
                  <th className="no">No</th>
                  <th>รูป</th>
                  <th>จัดการ</th>
                </tr>
              </thead>

              <tbody className="text-center">
                {filteredindexSldersData.map((indexSlder, index) => (
                  <tr key={indexSlder.id}>
                    <td>{index + 1}</td>
                    <td>
                      <Image
                        src={`https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${indexSlder.img1}/public`}
                        alt="indexActivity imge"
                        thumbnail
                      />
                    </td>
                    <td>
                      <DeleteModal
                        data={indexSlder}
                        apiDelete={() => deleteindexSlder(indexSlder.id)}
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
              totalPages={indexSlderData?.pagination?.total}
              onChangePage={handleChangePage}
              onChangePageSize={handleChangePageSize}
            />
          </Card.Footer>
        </Card>
      </div>
    </LayOut>
  );
};
export default IndexSlder;
