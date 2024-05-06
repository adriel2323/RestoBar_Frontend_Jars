import React, { useState } from 'react'
import { Button } from "react-bootstrap"
import { Navbar, NavLink, Col } from 'reactstrap';
import { FaRegCommentDots } from 'react-icons/fa'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import Comentario from '../Comentario';


const Footer = (urlId) => {
  const [modalShow, setModalShow] = useState(false);

  const navigate = useNavigate()

  return (
      <Navbar
      className="fixed-bottom"
      style={{backgroundColor: '#46389A'}}>
          <Col style={{textAlign:'center'}}>
            <NavLink href="#">
              <Button 
              style={{whiteSpace:'nowrap',backgroundColor:'#fff', color:'#46389A',borderRadius:'20px',borderColor:'#8E8E8E'}}
              onClick={() => setModalShow(true)}>
                Comentario <FaRegCommentDots />
              </Button>
              <Comentario
              show={modalShow}
              onHide={() => setModalShow(false)}
              />
            </NavLink>
          </Col>
          <Col style={{textAlign:'center'}}>
            <NavLink>
              <Button
                style={{ backgroundColor:'#fff', color:'#46389A', borderRadius:'20px',borderColor:'#8E8E8E'}}
                onClick={() => {
                  navigate(`/orden/${urlId.urlId}`)
                }}>
                Ver orden <BsFillCheckCircleFill />
              </Button>
            </NavLink>
          </Col>
      </Navbar>

  );
};

export default Footer;