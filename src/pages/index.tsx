import React, { useEffect, useState } from "react";
import Head from 'next/head';
import LayOut from "@/components/LayOut";
import { Alert, Button, Card, Col, Row } from "react-bootstrap";
import { FaRegEye } from "react-icons/fa";


const HomePage: React.FC = () => {

  return (
    <LayOut>
      <Head>
        <title>Wellcome | MePrompt-BackOffice</title>
        <meta
          name="description"
          content="T ACTIVE"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='home-page h-100'>
        <Card className="title">
          <Card.Header>
            <h2 className="display-6 text-center">Welcome</h2>
          </Card.Header>
        </Card>
       

      </div>
    </LayOut>
  );
}
export default HomePage;