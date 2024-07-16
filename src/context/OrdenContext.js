import { createContext, useState,useEffect } from "react";

const OrdenContext = createContext();

export const OrdenProvider = ({ children }) => {

  /*NuevaOrden es un objeto que contiene platos(todos) y el total, dentro de platos se encuentran los platos almacenados por id y su cantidad*/
  const [nuevaOrden, setNuevaOrden] = useState({
    platos: {},
    total: 0,
  });
  const [ordenConfirmada, setOrdenConfirmada] = useState([])
  const [ordenBD,setOrdenBD]=useState(false)
  console.log('Esta es la nueva orden ',nuevaOrden);

  function confirmarPedido(nroMesa) {
    const orden = { ...nuevaOrden, nroMesa };
    setOrdenConfirmada((ordenConfirmada) => [...ordenConfirmada, orden]);
    setNuevaOrden({ platos: {}, total: 0 });
  
    let ordenVieja = localStorage.getItem(`orden-${nroMesa}`);
    if (ordenVieja) {
      ordenVieja = JSON.parse(ordenVieja);
      const nuevasOrdenes = { ...ordenVieja.ordenes, [Date.now()]: orden };
      const nuevaOrdenVieja = { ...ordenVieja, ordenes: nuevasOrdenes };
      localStorage.setItem(`orden-${nroMesa}`, JSON.stringify(nuevaOrdenVieja));
    } else {
      const nuevasOrdenes = { [Date.now()]: orden };
      localStorage.setItem(`orden-${nroMesa}`, JSON.stringify({ ordenes: nuevasOrdenes }));
    }
  }

  function agregarPlato(plato) {
    const nuevosPlatos = { ...nuevaOrden.platos };
    if (plato.idPlato in nuevosPlatos) {
      nuevosPlatos[plato.idPlato].cantidad += 1;
    } else {
      nuevosPlatos[plato.idPlato] = { ...plato, cantidad: 1 };
    }
    const nuevoTotal = calcularTotal(nuevosPlatos);
    setNuevaOrden({ platos: nuevosPlatos, total: nuevoTotal });
  }

  function eliminarPlato(plato) {
    const nuevosPlatos = { ...nuevaOrden.platos };
    if (plato.idPlato in nuevosPlatos) {
      if (nuevosPlatos[plato.idPlato].cantidad > 1) {
        nuevosPlatos[plato.idPlato].cantidad -= 1;
      } else {
        delete nuevosPlatos[plato.idPlato];
      }
      const nuevoTotal = calcularTotal(nuevosPlatos);
      setNuevaOrden({ platos: nuevosPlatos, total: nuevoTotal });
    }
  }


  function calcularTotal(platos) {
    let total = 0;
    Object.values(platos).forEach((plato) => {
      total += plato.importe * plato.cantidad;
    });
    return total;
  }

  
  function actualizarCantidad(idPlato, cantidad) {
    const nuevosPlatos = { ...nuevaOrden.platos };
    if (idPlato in nuevosPlatos) {
      nuevosPlatos[idPlato].cantidad = cantidad;
      const nuevoTotal = calcularTotal(nuevosPlatos);
      setNuevaOrden({...nuevaOrden, platos: nuevosPlatos, total: nuevoTotal });
    }
  }
  function clearPedido(nroMesa){
    setOrdenConfirmada([])
    localStorage.removeItem(`orden-${nroMesa}`)
  }

  function limpiarPedidos(mesas){
    mesas.forEach(mesa => {
      if(mesa.estado === 0 && localStorage[`orden-${mesa.nroMesa}`]){
        localStorage.removeItem(`orden-${mesa.nroMesa}`)
      }
    })
    
  }
  


  return (
    <OrdenContext.Provider value={{ordenBD,setOrdenBD, ordenConfirmada, nuevaOrden, setNuevaOrden,eliminarPlato, agregarPlato, clearPedido, actualizarCantidad, confirmarPedido,limpiarPedidos }}>
      {children}
    </OrdenContext.Provider>
  );
};



export {OrdenContext};