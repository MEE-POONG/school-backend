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
                    <Link href="/" className={asPath === "/" ? "nav-link active" : "nav-link"}>
                        <i >
                            <FaTachometerAlt />
                        </i>
                        <span className="ms-2">หน้าแรก</span>
                    </Link>


                    <div id="recommend" className='select-page'>
                        <Dropdown.Toggle onClick={() => handlePath('/recommend')} className={asPath === "/recommend" || asPath === "/recommend/agent" || asPath === "/recommend/member" || asPath === "/partner/member/add" ? "nav-item nav-link active" : "nav-item nav-link"} id="dropdown-custom-components" >
                            <i >
                                <FaTachometerAlt />
                            </i>
                            <span className="ms-2">จัดการหน้าแรก</span>
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="bg-transparent border-0" show={checkClickPath === "/recommend" || checkClickPath === "/recommend/agent" || checkClickPath === "/recommend/member" || asPath === "/recommend/member/add"} >
                            <Link href="/recommend" className={asPath === "/recommend" || asPath === "/recommend/agent" ? "nav-link active" : "nav-link"}>
                                <span>รูปภาพหน้าแรก</span>
                            </Link>
                            <Link href="/recommend/member" className={asPath === "/recommend/member" || asPath === "/recommend/member/add" ? "nav-link active" : "nav-link"}>
                                <span>รูปภาพกิจกรรม</span>
                            </Link>
                            <Link href="/recommend/member" className={asPath === "/recommend/member" || asPath === "/recommend/member/add" ? "nav-link active" : "nav-link"}>
                                <span>สถิติ</span>
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
                            <Link href="/admin" className={asPath === "/admin" /*|| asPath === "/partner/agent"*/ ? "nav-link active" : "nav-link"}>
                                <span>จัดการข่าว</span>
                            </Link>
                            <Link href="/admin/user" className={asPath === "/admin/user" /*|| asPath === "/partner/member/add"*/ ? "nav-link active" : "nav-link"}>
                                <span>จัดการกิจกรรม</span>
                            </Link>
                        </Dropdown.Menu>
                    </div>


                   

                   



                  
                    <div id="registerform" className='select-page'>
                            <Link href="/registerform" className={asPath === "/registerform" || asPath === "/registerform/agent" ? "nav-link active" : "nav-link"}>
                            <span className="ms-2">ผู้สนใจสมัคร</span>
                            </Link>
                        {/* <Dropdown.Toggle onClick={() => handlePath('/income')} className={asPath === "/income" || asPath === "/income/agent" ? "nav-item nav-link active" : "nav-item nav-link"} id="dropdown-custom-components" >
                            <i >
                                <FaTachometerAlt />
                            </i>
                            <span className="ms-2">ผู้สนใจสมัคร</span>
                        </Dropdown.Toggle> */}
                        
                        {/* <Dropdown.Menu className="bg-transparent border-0" show={checkClickPath === "/income" || checkClickPath === "/income/agent" || checkClickPath === "/income/listname"} >
                            <Link href="/income" className={asPath === "/income" || asPath === "/income/agent" ? "nav-link active" : "nav-link"}>
                                <span>สมัครเรียน</span>
                            </Link>
                            <Link href="/income" className={asPath === "/income" || asPath === "/income/agent" ? "nav-link active" : "nav-link"}>
                                <span>ได้เสียเอเย่น</span>
                            </Link>
                            <Link href="/income" className={asPath === "/income" || asPath === "/income/agent" ? "nav-link active" : "nav-link"}>
                                <span>ได้เสียมาสเตอร์</span>
                            </Link>
                        </Dropdown.Menu> */}
                    </div>

                    <div id="IndexActivity" className='select-page'>
                            <Link href="/IndexActivity" className={asPath === "/IndexActivity" || asPath === "" ? "nav-link active" : "nav-link"}>
                            <span className="ms-2">กิจกรรม</span>
                            </Link>
                       
                    </div>
                    {/* <div id="setting" className='select-page'>
                        <Dropdown.Toggle onClick={() => handlePath('/setting')} className={asPath === "/setting" || asPath === "/setting/admin" || asPath === "/setting/admin/team" ? "nav-item nav-link active" : "nav-item nav-link"} id="dropdown-custom-components" >
                            <i >
                                <FaTachometerAlt />
                            </i>
                            <span className="ms-2">Setting</span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="bg-transparent border-0" show={checkClickPath === "/setting" || checkClickPath === "/setting/admin" || checkClickPath === "/setting/admin/team"} >
                            <Link href="/setting" className={asPath === "/setting" ? "nav-link active" : "nav-link"}>
                                <span>ติดต่อเรา</span>
                            </Link>
                            <Link href="/setting/admin" className={asPath === "/setting/admin" || asPath === "/setting/admin/team" ? "nav-link active" : "nav-link"}>
                                <span>แอดมิน</span>
                            </Link>

                        </Dropdown.Menu>
                    </div>




                    <div id="about" className='select-page'>
                        <Dropdown.Toggle onClick={() => handlePath('/about')} className={asPath === "/about" || asPath === "/about/aboutclinic" || asPath === "/about/aboutpersonal" || asPath === "/about/aboutpersonal/add" ? "nav-item nav-link active" : "nav-item nav-link"} id="dropdown-custom-components" >
                            <i >
                                <FaTachometerAlt />
                            </i>
                            <span className="ms-2">about</span>
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="bg-transparent border-0" show={checkClickPath === "/about" || checkClickPath === "/about/aboutclinic" || checkClickPath === "/about/aboutpersonal" || asPath === "/about/aboutpersonal/add"} >
                            <Link href="/about/aboutclinic" className={asPath === "/about" || asPath === "/about/aboutclinic" ? "nav-link active" : "nav-link"}>
                                <span>aboutclinic</span>
                            </Link>
                            <Link href="/about/aboutpersonal" className={asPath === "/about/aboutpersonal" || asPath === "/about/aboutpersonal/add" ? "nav-link active" : "nav-link"}>
                                <span>aboutpersonal</span>
                            </Link>
                        </Dropdown.Menu>
                    </div>





                    <div id="Contact" className='select-page'>
                        <Dropdown.Toggle onClick={() => handlePath('/contact')} className={asPath === "/contact" || asPath === "/contact/contactclinic" || asPath === "/contact/ContactSocialMedia" || asPath === "/contact/ContactSocialMedia/add" ? "nav-item nav-link active" : "nav-item nav-link"} id="dropdown-custom-components" >
                            <i >
                                <FaTachometerAlt />
                            </i>
                            <span className="ms-2">Contact</span>
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="bg-transparent border-0" show={checkClickPath === "/contact" || checkClickPath === "/contact/contactclinic" || checkClickPath === "/contact/ContactSocialMedia" || asPath === "/contact/ContactSocialMedia/add"} >
                            <Link href="/contact/contactclinic" className={asPath === "/contact" || asPath === "/contact/contactclinic" ? "nav-link active" : "nav-link"}>
                                <span>ContactClinic</span>
                            </Link>
                            <Link href="/contact/ContactSocialMedia" className={asPath === "/contact/ContactSocialMedia" || asPath === "/contact/ContactSocialMedia/add" ? "nav-link active" : "nav-link"}>
                                <span>ContactSocialMedia</span>
                            </Link>
                        </Dropdown.Menu>
                    </div>
                    

                    <div id="service" className='select-page'>
                        <Dropdown.Toggle onClick={() => handlePath('/service')} className={asPath === "/service" || asPath === "/service/serviceclinic" || asPath === "/service/subserviceclinnic" || asPath === "/service/subserviceclinnic/add" ? "nav-item nav-link active" : "nav-item nav-link"} id="dropdown-custom-components" >
                            <i >
                                <FaTachometerAlt />
                            </i>
                            <span className="ms-2">service</span>
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="bg-transparent border-0" show={checkClickPath === "/service" || checkClickPath === "/service/serviceclinic" || checkClickPath === "/service/subServiceclinic" || asPath === "/service/subServiceclinic/add"} >
                            <Link href="/service/serviceclinic" className={asPath === "/service" || asPath === "/service/serviceclinic" ? "nav-link active" : "nav-link"}>
                                <span>serviceclinic</span>
                            </Link>
                            <Link href="/service/subServiceclinic" className={asPath === "/service/subServiceclinic" || asPath === "/service/subServiceclinic/add" ? "nav-link active" : "nav-link"}>
                                <span>subServiceclinic</span>
                            </Link>
                        </Dropdown.Menu>
                    </div>
                    





                    <div id="promotion" className='select-page'>
                        <Dropdown.Toggle onClick={() => handlePath('/promotion')} className={asPath === "/promotion" ? "nav-item nav-link active" : "nav-item nav-link"} id="dropdown-custom-components" >
                            <i >
                                <FaTachometerAlt />
                            </i>
                            <span className="ms-2">promotion</span>
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="bg-transparent border-0" show={checkClickPath === "/promotion" || checkClickPath === "/promotion" } >
                            <Link href="/promotion" className={asPath === "/promotion" || asPath === "/promotion" ? "nav-link active" : "nav-link"}>
                                <span>promotion</span>
                            </Link>
                            
                        </Dropdown.Menu>
                    </div>

                    <div>
                    <div id="review" className='select-page'>
                        <Dropdown.Toggle onClick={() => handlePath('/review')} className={asPath === "/review" ? "nav-item nav-link active" : "nav-item nav-link"} id="dropdown-custom-components" >
                            <i >
                                <FaTachometerAlt />
                            </i>
                            <span className="ms-2">review</span>
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="bg-transparent border-0" show={checkClickPath === "/review" || checkClickPath === "/review" } >
                            <Link href="/review" className={asPath === "/review" || asPath === "/review" ? "nav-link active" : "nav-link"}>
                                <span>review</span>
                            </Link>
                            
                        </Dropdown.Menu>
                    </div>
                    </div>



                    <Link href="/article" className={asPath === "/article" ? "nav-link active" : "nav-link"}>
                        <i >
                            <FaTachometerAlt />
                        </i>
                        <span className="ms-2">Article</span>
                    </Link>








                    <div id="gamepond" className='select-page'>
                        <Dropdown.Toggle onClick={() => handlePath('/gamepond')} className={asPath === "/gamepond" ? "nav-item nav-link active" : "nav-item nav-link"} id="dropdown-custom-components" >
                            <i >
                                <FaTachometerAlt />
                            </i>
                            <span className="ms-2">เกมของปอนด์</span>
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="bg-transparent border-0" show={checkClickPath === "/gamepond" || checkClickPath === "/gamepond" } >
                            <Link href="/gamepond/gameselet" className={asPath === "/gamepond/gameselet" || asPath === "/gamepond/gameselet" ? "nav-link active" : "nav-link"}>
                                <span>รวมเกม</span>
                            </Link>
                            <Link href="/gamepond/xo" className={asPath === "/gamepond/xo" || asPath === "/gamepond/xo/add" ? "nav-link active" : "nav-link"}>
                                <span>เกม XO</span>
                            </Link>
                            <Link href="/gamepond/calculator" className={asPath === "/gamepond/calculator" || asPath === "/gamepond/calculator/add" ? "nav-link active" : "nav-link"}>
                                <span>เครื่องคิดเลข</span>
                            </Link>
                        </Dropdown.Menu>
                    </div> */}
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
