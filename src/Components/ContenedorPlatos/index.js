import Plato from '../Plato';
import { Col } from 'react-bootstrap';

const ContenedorPlatos = ({ platos, filtroRubro, filtroBusqueda }) => {
  let platosFiltrados = platos.filter(plato => plato.idRubro === filtroRubro);

  if (filtroRubro === 0) {
    platosFiltrados = platos.filter(plato =>
      plato.dscPlato.toLowerCase().includes(filtroBusqueda.toLowerCase())
    );
  } else if (filtroBusqueda !== '') {
    platosFiltrados = platosFiltrados.filter(plato =>
      plato.dscPlato.toLowerCase().includes(filtroBusqueda.toLowerCase())
    );
  }
  
  if (filtroRubro === 0 && filtroBusqueda === '') {
    return (
    <Col className='justify-content-center row'
    style={{margin:'auto'}}>
      {platos.map(plato => (
          <Plato  key={plato.idPlato}
          plato={plato}
          />
      ))}
    </Col>
    )
  } else {
    return (
      <Col className='justify-content-center row'
      style={{margin:'auto'}}>
          {platosFiltrados.map(plato => (
            <Plato  key={plato.idPlato}
            plato={plato}
          />
          ))}
      </Col>
    )
  };
};

export default ContenedorPlatos;