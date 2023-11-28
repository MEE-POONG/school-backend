import React from "react";
import LayOut from "@/components/RootPage/TheLayOut";
import { Card } from "react-bootstrap";
import Link from "next/link";
import { AiFillEdit, AiOutlineFileSearch } from "react-icons/ai";



const HomePage: React.FC = (props) => {

  return (
    <LayOut>
      <div className='home-page h-100'>
        <Card className="">
          <Card.Header>
            <h2 className="text-center">Welcome</h2>
          </Card.Header>
          <Card.Body>
            <div className="container">
              <h5>การจัดการเว็บไซต์วิทยาลัยเทคโนโลยีพนมวันท์</h5>
              <p>เมนูลัด:</p>
              <p><AiFillEdit /> <Link href="/headpage">หัวข้อหน้าหลัก {"(แก้ไขเท่านั้น)"}</Link></p>
              <p><AiFillEdit /> <Link href="/about">เกี่ยวกับเรา {"(แก้ไขเท่านั้น)"}</Link></p>
              <p><AiFillEdit /> <Link href="/contact">ติดต่อเรา {"(แก้ไขเท่านั้น)"}</Link></p>
              <p><AiFillEdit /> <Link href="/news">หน้าข่าว</Link></p>
              <p><AiFillEdit /> <Link href="/course">หลักสูตร</Link></p>
              <p><AiFillEdit /> <Link href="/admin">หน้าแอดมิน</Link></p>
              <p><AiOutlineFileSearch /> <Link href="/registerform">ตรวจสอบรายชื่อผู้สมัครผ่านเว็บไซต์</Link></p>
            </div>
          </Card.Body>
        </Card>
      </div>
    </LayOut>
  );
}
export default HomePage;