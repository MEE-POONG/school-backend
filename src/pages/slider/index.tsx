import React, { useEffect, useState } from "react";
import Head from 'next/head';
import LayOut from "@/components/RootPage/TheLayOut";
import { Badge, Card, Form, InputGroup, Table } from "react-bootstrap";
import { FaPen, FaSearch } from "react-icons/fa";
import Link from "next/link";
import useAxios from "axios-hooks";
import PageSelect from "@/components/PageSelect";
// import PartnerViewsliderModal from "@/container/Partner/ViewModal";
import DeleteModal from "@/components/modal/DeleteModal";
import { SliderSchool } from "@prisma/client";
// import PartnerAddPartnerModal from "@/container/Partner/AddPartnerModal";
import Image from "next/image";

interface Params {
  page: number;
  pageSize: number;
  searchKey: string;
  totalPages: number;
}
const SliderPage: React.FC = () => {
  const [params, setParams] = useState<Params>({
    page: 1,
    pageSize: 10,
    searchKey: "",
    totalPages: 1,
  });
  const [{ data: slidersData }, getslider,] = useAxios({
    url: `/api/slider?page=${params.page}&pageSize=${params.pageSize}&searchKey=${params.searchKey}`,
    method: "GET",
  }, { autoCancel: false });

  const [{ loading: deletesliderLoading, error: deletesliderError }, executesliderDelete,] = useAxios({}, { manual: true });

  const [filteredslidersData, setFilteredslidersData] = useState<SliderSchool[]>([]);

  useEffect(() => {
    setFilteredslidersData(slidersData?.sliderSchool ?? []);
    console.log(slidersData);
  }, [slidersData]);

  const deleteslider = (id: string): Promise<any> => {
    return executesliderDelete({
      url: "/api/slider/" + id,
      method: "DELETE",
    }).then(() => {
      setFilteredslidersData(prevsliders => prevsliders.filter(slider => slider.id !== id));
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

  const handleChangesearchKey = (search: string) => {
    setParams(prevParams => ({
      ...prevParams,
      searchKey: search,
    }));
  };

  return (
    <LayOut>
      <div className='partner-page h-100'>
        <Card className="h-100">
          <Card.Header className="d-flex space-between">
            <h4 className="mb-0 py-1">
              รูปภาพหน้าแรก
            </h4>
            



            <Link href="/slider/add" className="ms-2 btn icon icofn-primary">
              เพิ่มรูปภาพ
            </Link>
          </Card.Header>
          <Card.Body className="p-0">
            <Table striped bordered hover className="scroll">
              <thead>
                <tr>
                  <th className="first">No.</th>
                  <th className="image">รูปภาพ</th>
                  <th>จัดการ</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {filteredslidersData?.map((slider: SliderSchool, index: number) => {
                  return (
                    <tr key={slider.id}>
                      <td className="first">
                        {((params.page * 10) - 10) + index + 1}
                      </td>

                      <td className="image">
                        <div className="space-around ">
                          <img src={`https://imagedelivery.net/QZ6TuL-3r02W7wQjQrv5DA/${slider?.img1 ? slider?.img1: 'f701ce08-7ebe-4af2-c4ec-2b3967392900' }/public`}  width={350} height={120} alt="sliderimage"/>
                        </div>
                      </td>


                      <td>
                        <DeleteModal data={slider} apiDelete={() => deleteslider(slider.id)} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Card.Body>
          <Card.Footer>
            <PageSelect page={params.page} totalPages={slidersData?.pagination?.total} onChangePage={handleChangePage} onChangePageSize={handleChangePageSize} />
          </Card.Footer>
        </Card>

      </div>
    </LayOut>
  );
}
export default SliderPage;