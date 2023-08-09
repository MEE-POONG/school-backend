import { Member } from '@prisma/client';
import React, { useEffect, useState } from 'react';
import { Form, Dropdown, FloatingLabel } from 'react-bootstrap';
interface SearchDataProps {
    textShow: string;
    textSearch: React.Dispatch<React.SetStateAction<string>>;
    setID: React.Dispatch<React.SetStateAction<string>>;
    arrayData: any;
}
const InputWithSelect: React.FC<SearchDataProps> = ({ textShow, textSearch, setID, arrayData }) => {
    console.log("arrayData : ", arrayData);

    const [isDropdownVisible, setDropdownVisible] = useState(false);

    const handleMouseEnter = () => {
        setDropdownVisible(true);
    };

    const handleMouseLeave = () => {
        setDropdownVisible(false);
    };

    useEffect(() => {
        if (arrayData && arrayData.length === 1) {
            setID(arrayData[0].id);
        }
    }, [arrayData, setID]);

    return (
        <FloatingLabel
            controlId="memberID"
            label="memberID / ผู้ใช้ยูสนี้"
            className="mb-3"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Form.Control
                type="text"
                placeholder="name@example.com"
                value={textShow}
                onChange={keyword => { textSearch(keyword.target.value) }}
            />
            <Dropdown.Menu show={isDropdownVisible} className='w-100'>
                <Dropdown.Header>เลือกผู้ใช้งาน</Dropdown.Header>
                {arrayData?.map((member: Member, index: number) => {
                    return (
                        <Dropdown.Item
                            key={index}
                            onClick={() => {
                                textSearch(member.firstname + " " + member.lastname);
                                setID(member.id);
                                handleMouseLeave();
                            }}
                            eventKey="2"
                        >
                            {member?.firstname + " " + member?.lastname}
                        </Dropdown.Item>
                    );
                })}
            </Dropdown.Menu>

        </FloatingLabel>
    );
};

export default InputWithSelect;
