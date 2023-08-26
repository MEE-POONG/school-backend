import React, { useState } from 'react';
import { Offcanvas, Button, Nav, Image, Dropdown, NavDropdown } from 'react-bootstrap';
import { FaBars, FaRegEnvelope, FaShoppingBag, FaTachometerAlt, FaUserEdit } from 'react-icons/fa';
import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface TheOffcanvasProps {
    show: boolean;
    onToggleShow: () => void;
}

const TheOffcanvas: React.FC<TheOffcanvasProps> = ({ show, onToggleShow }) => {
    const handleClose = () => onToggleShow();
    const { asPath } = useRouter();
    const [checkClickPath, setCheckClickPath] = useState<string>('/');
    useEffect(() => {
        setCheckClickPath(asPath);
    }, [asPath])
    const handlePath = (valPath: string): void => { checkClickPath === valPath ? setCheckClickPath('') : setCheckClickPath(valPath) };
    const navItems = [
        {
            id: "partner",
            label: "Partner",
            icon: <FaTachometerAlt />,
            path: "/partner",
            subItems: [
                { label: "พันธมิตร", path: "/partner" },
                { label: "UserAg", path: "/partner/user-ag" }
            ]
        },
        {
            id: "bot-auto",
            label: "Bot Auto",
            icon: <FaTachometerAlt />,
            path: "/bot",
            subItems: [
                { label: "คำสั่งบอท", path: "/bot" },
                { label: "ลูกค้า", path: "/bot/customer" },
                { label: "เอเย่น", path: "/bot/agent" },
                { label: "มาสเตอร์", path: "/bot/master" }
            ]
        },
        // ... Add other sections similarly
    ];
    return (
        <>
            <Offcanvas show={show} onHide={handleClose} placement="start" backdrop={false} scroll={true} >
                <Offcanvas.Body className='ps-0 pe-2'>
                    <Link href="/" className={asPath === "/" ? "nav-link active" : "nav-link"}>
                        <i >
                            <FaTachometerAlt />
                        </i>
                        <span className="ms-2">Home</span>
                    </Link>


                    <Link href="/slider" className={asPath === "/slider" || asPath === "/slider/add"  ? "nav-link active" : "nav-link"}>
                        <i >
                            <FaTachometerAlt />
                        </i>
                        <span className="ms-2">รูปภาพหน้าแรก</span>
                    </Link>

                    <Link href="/newsSchool" className={asPath === "/newsSchool" || asPath === "/newsSchool/addnewsSchool" || asPath.startsWith("/newsSchool/edit/")  ? "nav-link active" : "nav-link"}>
                        <i >
                            <FaTachometerAlt />
                        </i>
                        <span className="ms-2">ข่าว</span>
                    </Link>

                    <Link href="/activity" className={asPath === "/activity" || asPath.startsWith("/activity/add")  ? "nav-link active" : "nav-link"}>
                        <i >
                            <FaTachometerAlt />
                        </i>
                        <span className="ms-2">กิจกรรม</span>
                    </Link>

                    <Link href="/registerform" className={asPath === "/registerform" || asPath.startsWith("/registerform/edit")  ? "nav-link active" : "nav-link"}>
                        <i >
                            <FaTachometerAlt />
                        </i>
                        <span className="ms-2">ผู้สนใจสมัคร</span>
                    </Link>

                    <Link href="/admin" className={asPath === "/admin" || asPath === "/admin/add" || asPath.startsWith("/admin/edit")  ? "nav-link active" : "nav-link"}>
                        <i >
                            <FaTachometerAlt />
                        </i>
                        <span className="ms-2">แอดมิน</span>
                    </Link>
                    
                </Offcanvas.Body>
            </Offcanvas>

        </>
    );
};
const TheButtonOffcanvas: React.FC<TheOffcanvasProps> = ({ show, onToggleShow }) => {
    const handleShow = () => onToggleShow();
    return (
        <Button onClick={handleShow} bsPrefix={`slide-toggle-icon ${show ? 'active' : ''} me-auto`}>
            <FaBars />
        </Button>
    );
}
export { TheButtonOffcanvas };
export default TheOffcanvas;
