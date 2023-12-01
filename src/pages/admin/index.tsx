import React, { useEffect, useState } from "react";
import Head from "next/head";
import LayOut from "@/components/RootPage/TheLayOut";
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
import DeleteModal from "@/components/modal/DeleteModal";
import { AdminUser } from "@prisma/client";


interface Params {
  page: number;
  pageSize: number;
  searchKey: string;
  totalPages: number;
}
const RegisterFormPage: React.FC = (props) => {
  const [params, setParams] = useState<Params>({
    page: 1,
    pageSize: 10,
    searchKey: "",
    totalPages: 1,
  });

  const [{ data: AdminData }, getAdmin] = useAxios({
    url: `/api/checkLogin?page=${params.page}&pageSize=${params.pageSize}&searchKey=${params.searchKey}`,
    method: "GET",
  });

  const [
    { loading: deleteAdminLoading, error: deleteAdminError },
    executeAdminDelete,
  ] = useAxios({}, { manual: true });

  const [filteredAdminsData, setFilteredAdminsData] = useState<
    AdminUser[]
  >([]);

  useEffect(() => {
    setFilteredAdminsData(AdminData?.adminUser ?? []);
  }, [AdminData]);

  const deleteAdmin = (id: string): Promise<any> => {
    return executeAdminDelete({
      url: "/api/checkLogin/" + id,
      method: "DELETE",
    }).then(() => {
      setFilteredAdminsData((prevAdmins) =>
        prevAdmins.filter((Admin) => Admin.id !== id)
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
    if (AdminData?.adminUser) {
      // Filter the Admin data based on searchKey
      const filteredData = AdminData.adminUser.filter((Admin:any) =>
        // Convert both the searchKey and the relevant data to lowercase for case-insensitive search
        Admin.username.toLowerCase().includes(params.searchKey.toLowerCase()) ||
        Admin.password.toLowerCase().includes(params.searchKey.toLowerCase()) 
      );

      setFilteredAdminsData(filteredData);
    }
  }, [AdminData, params.searchKey]);
  
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
            <h4 className="mb-0 py-1">รายชื่อแอดมิน</h4>
            <Link href="/admin/add" className="ms-2 btn icon icofn-primary">
              เพิ่มผู้ใช้งาน
            </Link>

            
          </Card.Header>
          <Card.Body className="p-0">
            <Table striped bordered hover className="scroll">
              <thead>
                <tr>
                  <th className="">No</th>
                  <th className="">ชื่อผู้ใช้</th>
                  <th className="">รหัสผ่าน</th>

                  <th>จัดการ</th>
                </tr>
              </thead>

              <tbody className="text-center">
                {filteredAdminsData.map((Admin, index) => (
                  <tr key={Admin.id}>
                    <td className="">{index + 1}</td>
                    <td className="">{Admin.username}</td>
                    <td className="">{Admin.password}</td>
                    <td className="">
                        
                      <Link
                        href={`/admin/edit/${Admin.id}`}
                        className="mx-1 btn info icon icon-primary"
                      >
                        <FaPen />
                        <span className="h-tooltiptext">แก้ไขข้อมูล</span>
                      </Link>
                      <DeleteModal
                        title={`ลบข้อมูลของ ${Admin.username}`}
                        apiDelete={() => deleteAdmin(Admin.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
          <Card.Footer>
          </Card.Footer>
        </Card>
      </div>
    </LayOut>
  );
};
export default RegisterFormPage;
