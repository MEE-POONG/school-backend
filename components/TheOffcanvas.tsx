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

    return (
        <>
            <Offcanvas show={show} onHide={handleClose} placement="start" backdrop={false} scroll={true} >
                <Offcanvas.Body className='ps-0 pe-2'>

                    <div id="recommend" className='select-page'>
                        <Dropdown.Toggle onClick={() => handlePath('/')} className={asPath === "/"  ? "nav-item nav-link active" : "nav-item nav-link"} id="dropdown-custom-components" >
                            <i >
                                <FaTachometerAlt />
                            </i>
                            <span className="ms-2">จัดการหน้าแรก</span>
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="bg-transparent border-0" show={checkClickPath === "/"} >
                            <Link href="/sliderSchool" className={asPath === "/"  ? "nav-link active" : "nav-link"}>
                                <span>รูปภาพหน้าแรก</span>
                            </Link>
                            {/* <Link href="/activity" className={asPath === "/recommend/member" || asPath === "/recommend/member/add" ? "nav-link active" : "nav-link"}>
                                <span>รูปภาพกิจกรรม</span>
                            </Link> */}
                            
                        </Dropdown.Menu>
                    </div>

                    <div id="admin" className='select-page'>
                        <Dropdown.Toggle onClick={() => handlePath('/')} className={asPath === "/" ? "nav-item nav-link active" : "nav-item nav-link"} id="dropdown-custom-components" >
                            <i >
                                <FaTachometerAlt />
                            </i>
                            <span className="ms-2">จัดการข่าว</span>
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="bg-transparent border-0" show={checkClickPath === "/"  } >
                            <Link href="/newsSchool" className={asPath === "/newsSchool"  ? "nav-link active" : "nav-link"}>
                                <span>จัดการข่าว</span>
                            </Link>
                            <Link href="/activity" className={asPath === "/activity" ? "nav-link active" : "nav-link"}>
                                <span>จัดการกิจกรรม</span>
                            </Link>
                        </Dropdown.Menu>
                    </div>



                    <div id="registerform" className='select-page'>
                        <Link href="/registerform" className={asPath === "/registerform"  ? "nav-link active" : "nav-link"}>
                            <span className="ms-2">ผู้สนใจสมัคร</span>
                        </Link>

                    </div>

                
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
