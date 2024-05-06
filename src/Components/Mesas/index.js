import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Button, Container, Row, Col, Form, Modal } from 'react-bootstrap';
import Header from '../Header';
import { getMesas, /* getComanderas */ } from '../services';

const Mesas = () => {

  const [mesas, setMesas] = useState([]);
  const [filtroMesas, setFiltroMesas] = useState('')
  const [mesaReservada, setMesaReservada] = useState(null);

  const mesasFiltradas = mesas.filter(mesa => mesa.nroMesa.toString().includes(filtroMesas));

  useEffect(() => {
    async function mostrarMesas() {
      const response = await getMesas();
      if (response.status === 200) {
        const mesasConUrl = response.data.data.map(mesa => ({
          ...mesa,
          url: mesa.estado === 0 ? `/menu/${mesa.nroMesa}` : `/ordenConfirmada/${mesa.nroMesa}`
        }));
        console.log('estas son las mesas ',mesasConUrl)
        setMesas(mesasConUrl)
      }
    }
    mostrarMesas();
  }, [])

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClick = (mesa) => {
    setMesaReservada(mesa);
    if (mesa.estado === 1) {
      handleShow();
    } else {
      navigate(mesa.url)
    }
  };

  const handleConfirm = () => {
    if(mesaReservada){
      navigate(`/menu/${mesaReservada.nroMesa}`)
    }
    handleClose();
  };


  let color;
  let colorL;
  const navigate = useNavigate()

  return (
    <React.Fragment>
      <Row className='row-padre' style={{margin:'0', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Row>
          <Header título="MESAS" />
          <Form.Control style={{maxWidth:'85%', marginLeft:'22px'}}
            className='form-input'
            type="text" name="buscar"
            placeholder="Buscar mesa..."
            onChange={(e) => setFiltroMesas(e.target.value)} />
        </Row>
      </Row>
      <Container fluid>
        <Row className="justify-content-center">
          <Col className='justify-content-center row' xs={8}>
            {
              filtroMesas ? mesasFiltradas.map(mesa => {

                if (mesa.estado === 0) {
                  color = '#DEDEDE';
                  colorL = 'black';
                } else if (mesa.estado === 2) {
                  color = '#46389A';
                  colorL = '#fff';
                } else if (mesa.estado === 1) {
                  color = '#868686';
                  colorL = '#fff';
                }

                return (
                  <Button
                    className='mt-3'
                    variant="outline-dark"
                    style={{ backgroundColor: color, color: colorL }}
                    onClick={() => handleClick(mesa)}
                    key={mesa.nroMesa}>
                    {mesa.nroMesa}
                  </Button>
                );
              }) : mesas.map(mesa => {

                if (mesa.estado === 0) {
                  color = '#DEDEDE';
                  colorL = 'black';
                } else if (mesa.estado === 2) {
                  color = '#46389A';
                  colorL = '#fff';
                } else if (mesa.estado === 1) {
                  color = '#868686';
                  colorL = '#fff';
                }

                return (
                  <Button
                    className='mt-3'
                    variant="outline-dark"
                    style={{ backgroundColor: color, color: colorL }}
                    onClick={() => handleClick(mesa)}
                    key={mesa.nroMesa}>
                    {mesa.nroMesa}
                  </Button>
                );
              })
            }
            <Modal show={show} onHide={handleClose} animation={false} centered>
              <Modal.Header>
                <Modal.Title>Esta mesa está reservada, ¿Quieres iniciar el pedido?</Modal.Title>
              </Modal.Header>
              <Modal.Footer>
                <Button onClick={handleClose}
                style={{backgroundColor: '#A196E2', border:'none', color: 'black'}}>
                    Cancelar
                </Button>
                <Button onClick={handleConfirm} style={{backgroundColor: '#46389A', border:'none'}}>
                    Confirmar
                </Button>
              </Modal.Footer>
            </Modal>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  )
}

export default Mesas;