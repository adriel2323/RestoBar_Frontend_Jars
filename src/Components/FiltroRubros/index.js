import React from "react";
import { Button } from "react-bootstrap";

const FiltroRubros = ({ rubros, setFiltroRubro, handleClose }) => {

  return (
    <>
      <Button variant="outline-primary" className="d-block w-100 mb-2"
        style={{
          color: '#46389A',
          fontWeight: '600',
          borderWidth: 'medium',
          borderColor: '#46389A',
          borderRadius: '10px'
        }}
        onClick={() => { setFiltroRubro(0); handleClose() }}>Mostrar todos</Button>
      {Array.isArray(rubros)
        ? rubros.map(rubro => (
          <Button
            variant="outline-primary"
            style={{
              color: '#46389A',
              fontWeight: '600',
              borderWidth: 'medium',
              borderColor: '#46389A',
              borderRadius: '10px',
            }}
            className="d-block w-100 mb-2"
            key={rubro.idRubro}
            onClick={() => { setFiltroRubro(rubro.idRubro); handleClose() }}>
            {rubro.dscRubro}
          </Button>
        ))
        : <p>No hay rubros registrados</p>
      }
    </>
  );
};

export default FiltroRubros;