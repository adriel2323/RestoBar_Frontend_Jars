import React, { useState, useEffect } from 'react';
import ContenedorPlatos from '../ContenedorPlatos';
import Header from '../Header';
import { getPlatos, getRubros } from '../services';
import { Container, Row } from 'react-bootstrap';
import Footer from '../Footer';
import ContenedorFiltros from '../ContenedorFiltros';

const Menu = () => {
  const [platosDataState, setPlatosDataState] = useState([]);
  const [rubrosDataState, setRubrosDataState] = useState([]);
  const [filtroRubro, setFiltroRubro] = useState(0);
  const [filtroBusqueda, setFiltroBusqueda] = useState('')


  useEffect(() => {
    async function cargarPlatos() {
      const response = await getPlatos();
      if (response.status === 200) {
        setPlatosDataState(response.data.data)
      }
    }

    async function cargarRubros() {
      const response = await getRubros();

      if (response.status === 200) {
        setRubrosDataState(response.data.data);
      }
    }

    cargarRubros();
    cargarPlatos();
  }, [])

  // TRAIGO EL ID DE LA URL (/menu/:id)
  const urlId = window.location.pathname.split("/").pop()

  return (
    <>
      <Row className='row-padre'
        style={{position:'fixed', zIndex:'2', margin:'0'}}>
        <Row className='row-header'>
          <Header  título={`MESA ${urlId}`} />
        </Row>
        <Row>
          <ContenedorFiltros rubros={rubrosDataState} setFiltroRubro={setFiltroRubro} setFiltroBusqueda={setFiltroBusqueda} />
        </Row>
      </Row>

      <Container>
        <Row className="row-platos"
        style={{paddingTop: '120px',paddingBottom:'60px'}}>
          <ContenedorPlatos platos={platosDataState} filtroRubro={filtroRubro} filtroBusqueda={filtroBusqueda} />
        </Row>
        <Row>
          <Footer urlId={urlId} />
        </Row>
      </Container>
    </>
  );
};

export default Menu;