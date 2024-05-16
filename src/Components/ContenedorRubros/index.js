import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import FiltroRubros from '../FiltroRubros';
import {RxHamburgerMenu} from   'react-icons/rx'
import { variables } from '../../variables';

function ContenedorRubros({rubros, setFiltroRubro}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () =>{
       setShow(true)};
    return (
        <>
        <Button style={{backgroundColor: variables.blanco, border:"none"}}  onClick={handleShow}>
        <RxHamburgerMenu style={{color:'000000', strokeWidth:'1'}} />
        </Button>

          <Offcanvas show={show} onHide={handleClose} placement="end" size="sm" className="offcanvas-responsive">
            <Offcanvas.Body style={{textAlign :'center'}}>
              <FiltroRubros rubros={rubros} setFiltroRubro={setFiltroRubro} handleClose={handleClose}/>
              <Button variant="secondary" 
              style={{backgroundColor: variables.colorPrimario, border:'none', textAlign:'center'}}
              onClick={handleClose}>
                Cerrar
              </Button>
            </Offcanvas.Body>
          </Offcanvas>
        </>
      );
}

export default ContenedorRubros;