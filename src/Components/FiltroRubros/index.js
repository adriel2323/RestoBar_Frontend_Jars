import React from "react";
import { Button } from "react-bootstrap";
import { variables } from "../../variables";

const FiltroRubros = ({ rubros, setFiltroRubro, handleClose }) => {

  return (
    <>
      <Button variant="outline-primary" className="d-block w-100 mb-2"
        style={{
          color: variables.colorPrimario,
          fontWeight: '600',
          borderWidth: 'medium',
          borderColor: variables.colorPrimario,
          borderRadius: '10px'
        }}
        onClick={() => { setFiltroRubro(0); handleClose() }}>Mostrar todos</Button>
      {Array.isArray(rubros)
        ? rubros.map(rubro => (
          <Button
            variant="outline-primary"
            style={{
              color: variables.colorPrimario,
              fontWeight: '600',
              borderWidth: 'medium',
              borderColor: variables.colorPrimario,
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