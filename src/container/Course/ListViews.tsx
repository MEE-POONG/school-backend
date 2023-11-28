import { CourseList } from '@prisma/client';
import useAxios from 'axios-hooks';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button, Card, Form, InputGroup, Table } from "react-bootstrap";
import { FaPager, FaSearch } from 'react-icons/fa';
import DeleteModal from "@/components/modal/DeleteModal";
import PageSelect from '@/components/PageSelect';
import ModalFormAdd from './ModalFormAdd';
import ModalFormEdit from './ModalFormEdit';

interface Params {
    page: number;
    pageSize: number;
    search: string;
    group: string;
    totalPages: number;
}

const ListViews: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;
    const [params, setParams] = useState<Params>({
        page: 1,
        pageSize: 100,
        search: "",
        group: "",
        totalPages: 1
    });
    const [filteredData, setFilteredData] = useState<CourseList[]>([]);
    const [{ data, loading, error }, courseListAPI] = useAxios({
        url: `/api/CourseList/search?page=${params?.page}&pageSize=${params?.pageSize}&search=${params?.search}&group=${params?.group}`,
        method: "GET",
    });
    const [{ loading: deleteLoading, error: deleteError }, courseListDeleteAPI] = useAxios({});
    const [checkAdd, setCheckAdd] = useState(false);
    const [checkEdit, setCheckEdit] = useState(false);

    useEffect(() => {
        if (checkAdd || checkEdit) {
            courseListAPI({
                url: `/api/CourseList/search?page=${params?.page}&pageSize=${params?.pageSize}&search=${params?.search}&group=${params?.group}`,
                method: "GET",
            }).then(response => {
                setCheckAdd(false);
            }).catch(error => {
                alert("An error occurred during submission.");
            });
            setCheckAdd(false);
        }
    }, [checkAdd, checkEdit]);


    useEffect(() => {
        if (id) {
            setParams((prevParams) => ({
                ...prevParams,
                group: id as string,
            }));
        }
    }, [id]);

    useEffect(() => {
        console.log(data?.data);
        setFilteredData(data?.data);
        setParams((prevParams) => ({
            ...prevParams,
            totalPages: data?.pagination?.totalPages,
        }));
    }, [data]);



    const deleteList = async (list: CourseList): Promise<void> => {
        try {

            await courseListDeleteAPI({
                url: `/api/CourseList/${list.id}`,
                method: "DELETE",
            });

            if (params?.page === params?.totalPages) {
                setFilteredData((selectID) =>
                    selectID.filter((Array) => Array.id !== list.id));
                console.log(1, filteredData?.length);

                if (filteredData?.length <= 1) {
                    console.log(2, filteredData?.length);
                    window.location.reload();
                }

            } else {
                console.log("104", filteredData?.length);
                // getCourseList();
            }
        } catch (error) {
            console.error('Error deleting news:', error);
        }
    };

    const onAddSuccess = () => {
        setCheckAdd(true); // This will trigger the useEffect to reload data
    };

    const onEditSuccess = () => {
        setCheckEdit(true); // This will trigger the useEffect to reload data
    };

    const handleChangeSearch = (search: string) => {
        setParams(prevParams => ({
            ...prevParams,
            search: search,
        }));
    };

    return (
        <>
            <Card.Header className="d-flex space-between">
                <h4 className="mb-0 py-1">สาขาประจำคณะ</h4>
                <InputGroup className="w-auto">
                    <InputGroup.Text id="basic-addon1">
                        <FaSearch />
                    </InputGroup.Text>
                    <Form.Control aria-label="Text input with dropdown button" onChange={e => handleChangeSearch(e.target.value)} />
                </InputGroup>
                <ModalFormAdd onAddSuccess={onAddSuccess} />
            </Card.Header>
            <Card.Body className="overflow-x-hidden p-0">
                <Table striped bordered hover className="">
                    <thead className='align-middle'>
                        <tr>
                            <th className="w-r-3">No</th>
                            <th className="">สาขา</th>
                            <th className="w-t-125" >รับภาคปกติ</th>
                            <th className="w-t-125" >ภาคเรียนปกติ</th>
                            <th className="w-t-125" >ภาคเรียนปกติ</th>
                            <th className="w-t-125" >รับภาคสมทบ</th>
                            <th className="w-t-125" >ภาคเรียนสมทบ</th>
                            <th className="w-t-125" >ภาคเรียนสมทบ</th>
                            <th className="">จัดการ</th>
                        </tr>
                    </thead>
                    <tbody className="text-center align-middle">
                        {filteredData?.map((list, index) => (
                            <tr key={list?.id}>
                                <td className="w-r-3">{index + 1}</td>
                                <td className="">{list?.FieldStudy}</td>
                                <td className="w-t-125">
                                    <Button bsPrefix="btn on-off">
                                        {list?.regular ? "NO" : "OFF"}
                                    </Button>
                                </td>
                                <td className="w-t-125">{list?.First}</td>
                                <td className="w-t-125">{list?.Second}</td>
                                <td className="w-t-125">
                                    <Button bsPrefix="btn on-off">
                                        {list?.associate ? "NO" : "OFF"}
                                    </Button>
                                </td>
                                <td className="w-t-125">{list?.associateFirst}</td>
                                <td className="w-t-125">{list?.associateSecond}</td>
                                <td className="">
                                    <Button
                                        // onClick={() => handleReadMore(list)} 
                                        bsPrefix="mx-1 btn success icon">
                                        <FaPager />
                                        <span className="h-tooltiptext">ดูข้อมูล</span>
                                    </Button>
                                    {/* <Link href={`/news/edit/${list?.id}`} className="mx-1 btn info icon" >
                                        <FaPen />
                                        <span className="h-tooltiptext">แก้ไขข้อมูล</span>
                                    </Link> */}
                                    <ModalFormEdit selectID={list} onEditSuccess={onEditSuccess} />
                                    <DeleteModal
                                        title={`ข่าว ${list?.FieldStudy}`}
                                        apiDelete={() => deleteList(list)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card.Body>
        </>

    );
};

export default ListViews;