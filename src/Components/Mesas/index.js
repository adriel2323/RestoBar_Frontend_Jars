import React, { useState, useEffect,useContext } from 'react';
import { useNavigate } from 'react-router';
import { Button, Container, Row, Col, Form, Modal } from 'react-bootstrap';
import Header from '../Header';
import { getMesas, /* getComanderas */ } from '../services';
import { variables } from '../../variables';
import { OrdenContext } from '../../context/OrdenContext';
import { url} from '../services';

const Mesas = () => {
  const {limpiarPedidos} = useContext(OrdenContext);

  const [mesas, setMesas] = useState([]);
  const [filtroMesas, setFiltroMesas] = useState('')
  const [mesaReservada, setMesaReservada] = useState(null);

  const mesasFiltradas = mesas.filter(mesa => mesa.nroMesa.toString().includes(filtroMesas));
  async function cargarOrdenStorage(mesa) {
    if(mesa.estado===2){
      let orden={}
      let nroMesa = mesa.nroMesa;
      fetch(`${url}/platosmesa/${nroMesa}`)
      .then(response => response.json())
      .then(response => {
        orden= response.orden;
        const nuevasOrdenes = { [Date.now()]: orden };
        localStorage.setItem(`orden-${nroMesa}`, JSON.stringify({ ordenes: nuevasOrdenes }));
      })
      .catch(error => console.error(error));
  
      
    }
  }

  useEffect(() => {
    let mozoStorage= (JSON.parse(localStorage.getItem('mozo')))

    localStorage.clear()
    localStorage.setItem('mozo', JSON.stringify(mozoStorage))
    async function mostrarMesas() {
      
      const response = await getMesas();
      if (response.status === 200) {
        const mesasConUrl = response.data.data.map(mesa => ({
          ...mesa,
          url: mesa.estado === 0 ? `/menu/${mesa.nroMesa}` : `/ordenConfirmada/${mesa.nroMesa}`
        }));
        setMesas(mesasConUrl)
        mesasConUrl.map(mesa => cargarOrdenStorage(mesa))
        limpiarPedidos(mesasConUrl,);
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
                  color = variables.colorTerciario;
                  colorL = 'black';
                } else if (mesa.estado === 2) {
                  color = variables.colorPrimario;
                  colorL = variables.blanco;
                } else if (mesa.estado === 1) {
                  color = variables.colorDesactivado;
                  colorL = variables.blanco;
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
                  color = variables.colorTerciario;
                  colorL = 'black';
                } else if (mesa.estado === 2) {
                  color = variables.colorPrimario;
                  colorL = variables.blanco;
                } else if (mesa.estado === 1) {
                  color = variables.colorDesactivado;
                  colorL = variables.blanco;
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
                style={{backgroundColor: variables.colorSecundario, border:'none', color: 'black'}}>
                    Cancelar
                </Button>
                <Button onClick={handleConfirm} style={{backgroundColor: variables.colorPrimario, border:'none'}}>
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