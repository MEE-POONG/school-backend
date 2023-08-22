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
                        <Dropdown.Toggle onClick={() => handlePath('/recommend')} className={asPath === "/recommend" || asPath === "/recommend/agent" || asPath === "/recommend/member" || asPath === "/partner/member/add" ? "nav-item nav-link active" : "nav-item nav-link"} id="dropdown-custom-components" >
                            <i >
                                <FaTachometerAlt />
                            </i>
                            <span className="ms-2">จัดการหน้าแรก</span>
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="bg-transparent border-0" show={checkClickPath === "/recommend" || checkClickPath === "/recommend/agent" || checkClickPath === "/recommend/member" || asPath === "/recommend/member/add"} >
                            <Link href="/indexSlider" className={asPath === "/indexSlider" || asPath === "/indexSlider/agent" ? "nav-link active" : "nav-link"}>
                                <span>รูปภาพหน้าแรก</span>
                            </Link>
                            <Link href="/IndexActivity" className={asPath === "/recommend/member" || asPath === "/recommend/member/add" ? "nav-link active" : "nav-link"}>
                                <span>รูปภาพกิจกรรม</span>
                            </Link>
                            
                        </Dropdown.Menu>
                    </div>

                    <div id="admin" className='select-page'>
                        <Dropdown.Toggle onClick={() => handlePath('/admin')} className={asPath === "/admin" /*|| asPath === "/partner/agent"*/ || asPath === "/admin/user" /*|| asPath === "/partner/member/add*/ ? "nav-item nav-link active" : "nav-item nav-link"} id="dropdown-custom-components" >
                            <i >
                                <FaTachometerAlt />
                            </i>
                            <span className="ms-2">จัดการข่าว</span>
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="bg-transparent border-0" show={checkClickPath === "/admin" /*|| checkClickPath === "/partner/agent" */ || checkClickPath === "/admin/user" /*|| asPath === "/partner/member/add"*/} >
                            <Link href="/IndexNews" className={asPath === "/IndexNews" /*|| asPath === "/partner/agent"*/ ? "nav-link active" : "nav-link"}>
                                <span>จัดการข่าว</span>
                            </Link>
                            <Link href="/IndexActivity" className={asPath === "/IndexActivity" /*|| asPath === "/partner/member/add"*/ ? "nav-link active" : "nav-link"}>
                                <span>จัดการกิจกรรม</span>
                            </Link>
                        </Dropdown.Menu>
                    </div>



                    <div id="registerform" className='select-page'>
                        <Link href="/registerform" className={asPath === "/registerform" || asPath === "/registerform/agent" ? "nav-link active" : "nav-link"}>
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
