import React, { useEffect, useState } from "react";
import LayOut from "@/components/RootPage/TheLayOut";
import { Alert, Button, Card, Col, Row } from "react-bootstrap";
import { FaRegEye } from "react-icons/fa";


const HomePage: React.FC = (props) => {

  return (
    <LayOut>
      
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