import React, {useContext, useState} from 'react'
import { Button } from 'react-bootstrap'
import { OrdenContext } from '../../context/OrdenContext';
import añadir from '../../Assets/images/anadir.png'
import restar from '../../Assets/images/restar.png'

export const Contador = ({ plato }) => {
  const { agregarPlato, eliminarPlato, nuevaOrden } = useContext(OrdenContext);

  const cantidadPlato = nuevaOrden.platos[plato.idPlato]?.cantidad || 0;
  const [cantidad, setCantidad] = useState(cantidadPlato);
  

  function sumarAlContador() {
    agregarPlato(plato)
    setCantidad(cantidad + 1)
  }

  function restarAlContador() {
    if(cantidad >= 1) {
      eliminarPlato(plato)
      setCantidad(cantidad -1)
    }
    }
  
    
  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end', whiteSpace: 'nowrap' }}>
        <Button style={{display: "flex", justifyContent: "center", 
          alignItems: "center", borderRadius: "50%",
          width: "32px", height: "32px", border: "none", 
          backgroundColor: "#fff", color: "#000"}} onClick={sumarAlContador}>
            <img src={añadir} alt='sumar' style={{height:'10px'}}></img>
        </Button>
        <span style={{ margin: '0 10px' }}>{cantidad}</span>
        <Button style={{display: "flex", justifyContent: "center", 
        alignItems: "center", borderRadius: "50%",
        width: "32px", height: "32px", border: "none", 
        backgroundColor: "#fff", color: "#000"}} 
        onClick={restarAlContador}>
            <img src={restar} alt='restar' style={{height:'8px'}}></img>
        </Button>
    </div>
  )
}