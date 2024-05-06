import ContenedorRubros from "../ContenedorRubros";
import { Col, Form } from "react-bootstrap";

const ContenedorFiltros = ({ rubros, setFiltroRubro, setFiltroBusqueda }) => {

  return (
    <>
      <Col xs={2}>
        <ContenedorRubros rubros={rubros} setFiltroRubro={setFiltroRubro} />
      </Col>
      <Col xs={10}>
        <Form.Control
          className='form-input'
          type='text'
          name='buscar'
          placeholder='Buscar plato...'
          onChange={(e) => setFiltroBusqueda(e.target.value)}
        />
        </Col>
    </>
  );
};

export default ContenedorFiltros;