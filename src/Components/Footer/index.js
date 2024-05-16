import React, { useState } from 'react'
import { Button } from "react-bootstrap"
import { Navbar, NavLink, Col } from 'reactstrap';
import { FaRegCommentDots } from 'react-icons/fa'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import Comentario from '../Comentario';
import { variables } from '../../variables';

const Footer = (urlId) => {
  const [modalShow, setModalShow] = useState(false);

  const navigate = useNavigate()

  return (
      <Navbar
      className="fixed-bottom"
      style={{backgroundColor: variables.colorPrimario}}>
          <Col style={{textAlign:'center'}}>
            <NavLink href="#">
              <Button 
              style={{whiteSpace:'nowrap',backgroundColor:variables.blanco, color:variables.colorPrimario,borderRadius:'20px',borderColor:variables.colorDesactivado}}
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
                style={{ backgroundColor:variables.blanco, color:variables.colorPrimario, borderRadius:'20px',borderColor:variables.colorDesactivado}}
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