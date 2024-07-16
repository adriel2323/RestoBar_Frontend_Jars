import { useNavigate  } from 'react-router';
import React, { useContext, useEffect, useState } from "react";
import { Button, Table, Row, Container, Col } from "react-bootstrap";
import { OrdenContext } from "../../context/OrdenContext";
import axios from 'axios';
import Header from "../Header";
import { Contador } from '../Contador';
import { url } from '../services';
import { variables } from '../../variables';


const Ordenes = () => {
  const { nuevaOrden, confirmarPedido } = useContext(OrdenContext);
  const nroMesa = window.location.pathname.split("/").pop()
  const rows = [];
  const platosOrden = [];
  
  for (const key in nuevaOrden.platos) {
      if (nuevaOrden.platos.hasOwnProperty.call(nuevaOrden.platos, key)) {
        const plato = nuevaOrden.platos[key];
        rows.push(plato)
        platosOrden.push(Object.values(plato))
      }
  }
  console.log('los platos de la orden ',platosOrden);
  console.log('Esta son las rows ',rows);

  const imprimir = async () =>{
    const idMozo = JSON.stringify(JSON.parse(localStorage.getItem('mozo')))
    try{

      await axios.post(`${url}/imprimir`,
          JSON.stringify({nuevaOrden, nroMesa, idMozo}),
          {
              headers: { 'Content-Type': 'application/json'},
              withCredentials: true
          }
      );
    } catch (err) {
      console.log(err)
    }
    console.log('Se ejecutó IMPRIMIR')
  }

  const estadoMesa = async () =>{
    let estado = '2'; //Estado 2 = Ocupada
    try{
      await axios.post(`${url}/estadoMesa`,
          JSON.stringify({nroMesa, estado}),
          {
              headers: { 'Content-Type': 'application/json'},
              withCredentials: true
          }
      );
    } catch (err) {
      console.log(err)
    }
  }

  const guardarPlatos = async () =>{
    const idMozo = JSON.stringify((JSON.parse(localStorage.getItem('mozo'))).idMozo)
    const importe = JSON.stringify(nuevaOrden.total);
    console.log('los platos de la orden ',platosOrden);
    try{
      await axios.post(`${url}/guardar`,
        {platosOrden, nroMesa, idMozo, importe},
        {
          headers: { 'Content-Type': 'application/json'},
          withCredentials: true
        }
      );

      imprimir()
    } catch (err) {
      console.log(err)
    }
  }
  

  const agregarPlatos = async () =>{
    
    try{
      await axios.post(`${url}/agregar`,
          {platosOrden, nroMesa},
          {
              headers: { 'Content-Type': 'application/json'},
              withCredentials: true
          }
      );

      imprimir()
    } catch (err) {
      console.log(err)
    }
  }


  let orden = JSON.parse(localStorage.getItem(`orden-${nroMesa}`))

  const navigate = useNavigate();


  return (
    <>
      {rows.length !== 0 ? 
      <>
        <Row className='row-padre' style={{margin:'0'}}>
          <Header título={`MESA ${nroMesa}`} />
        </Row>
        <Container style={{marginBottom:'140px', maxWidth:'85%'}}>
          <Table striped>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Cantidad</th>
              </tr>
            </thead>
            <tbody style={{backgroundColor:variables.colorTerciario}} >
            
            {rows.map((plato) => (
                <tr key={plato.idPlato} style={{ fontWeight:'400' }}>
                  <td style={{verticalAlign: 'middle'}}>{plato.dscPlato}</td>
                  <td><Contador plato={plato} /> </td>
                </tr>
              ))}
            </tbody>
          </Table>
        
        <Row>
        <h3 style={{textAlign:'right'}}>Total: {nuevaOrden.total}</h3>
        </Row>
        <Row style={{justifyContent:'space-between', textAlign: 'center',
        position:'fixed', bottom:'80px',
         right:'0', left:'0',
          margin: '0px 15px'}}>
          <Col style={{
                                alignContent: 'center', justifyContent: 'center',
                                width: '40%'
                            }}>
            <Button variant='primary' 
            style={{
              backgroundColor: variables.colorPrimario, borderRadius: '5px',
              border: 'none', whiteSpace: 'nowrap',
              padding: '10px 15px',
              with: '60%'
          }}
            onClick={()=>navigate('/mesas')}>Ver mesas</Button>
          </Col>
          <Col>
            <Button variant="primary" 
            style={{
              backgroundColor: variables.colorPrimario, borderRadius: '5px',
              border: 'none', whiteSpace: 'nowrap',
              padding: '10px 15px',
              with: '60%'
          }}
            onClick={()=>navigate(`/menu/${nroMesa}`)}>Ver platos</Button>
          </Col>
      </Row>
              <Row style={{justifyContent:'space-between', textAlign: 'center', 
        position:'fixed', bottom:'15px', right:'0', left:'0', margin: '0px 10px'}}>
          {
            orden !== null ? (
              <Col>
              <Button variant='primary' 
                style={{backgroundColor:variables.colorPrimario, borderRadius:'15px',
                border:'none',  whiteSpace: 'nowrap',
                 padding:'10px 102px' }}
                onClick={()=>{
                /* exportPDF(); */
                estadoMesa();
                agregarPlatos();
                confirmarPedido(nroMesa);
                navigate(`/ordenConfirmada/${nroMesa}`);
              }}>Añadir</Button> 
              </Col>
            ) : (
              <Col>
              <Button variant='primary' 
              style={{backgroundColor:variables.colorPrimario, borderRadius:'15px',
              border:'none',  whiteSpace: 'nowrap',
               padding:'10px 90px' }}
                onClick={()=>{
                /* exportPDF(); */
                estadoMesa();
                guardarPlatos();
                confirmarPedido(nroMesa);
                navigate(`/ordenConfirmada/${nroMesa}`);
              }}>Confirmar</Button>
              </Col>
            )
          }
          </Row>
      </Container>
      </>
        :
        <>
          <Row className='row-padre' style={{margin:'0'}}>
            <Header título={`MESA ${nroMesa}`} />
          </Row>
          <Container>
          <h3 style={{margin:'30px 0px', textAlign:'center'}}>No hay platos para ordenar</h3>
          <Row style={{justifyContent:'space-between', textAlign: 'center', 
            position:'fixed', bottom:'20px', right:'0', left:'0', margin: '0px 15px' }}>
            <Col>
              <Button variant='primary' 
              style={{backgroundColor:variables.colorPrimario, borderRadius:'15px',border:'none',
                whiteSpace: 'nowrap', padding:'10px 15px' }}
              onClick={()=>navigate('/mesas')}>Ver mesas</Button>
            </Col>
            <Col>
              <Button variant="primary" 
              style={{backgroundColor:variables.colorPrimario, borderRadius:'15px',border:'none',
                whiteSpace: 'nowrap', padding:'10px 10px' }}
              onClick={()=>navigate(`/menu/${nroMesa}`)}>Volver a platos</Button>
            </Col>
          </Row>
          </Container>
      </>
      }
      
    </>
  );
};

export default Ordenes;