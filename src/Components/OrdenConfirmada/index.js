import React, { useContext, useState,useEffect } from "react"
import { Button, Table, Row, Container, Col, Modal } from "react-bootstrap"
import { OrdenContext } from "../../context/OrdenContext"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from '../Header';
import { url } from "../services";
import { variables } from "../../variables";

const OrdenConfirmada = () => {
    const nroMesa = window.location.pathname.split("/").pop()
    const { clearPedido} = useContext(OrdenContext)
    let orden = JSON.parse(localStorage.getItem(`orden-${nroMesa}`));
    let rows = [];
    let total = 0;
    let contador = 0;
    
    if (orden) {
        for (let key in orden.ordenes) {
            total += orden.ordenes[key].total;
        }
    }

    if (orden !== null) {
        for (const key in orden.ordenes) {
            if (orden.ordenes.hasOwnProperty(key)) {
                const ordenActual = orden.ordenes[key];
                for (const platoKey in ordenActual.platos) {
                    if (ordenActual.platos.hasOwnProperty(platoKey)) {
                        const plato = ordenActual.platos[platoKey];
                        rows.push({ ...plato, key: `${plato.idPlato}_${contador}` });
                        contador++
                    }
                }
            }
        }
    }
    const estadoMesa = async () => {
        let estado = '0'; //Estado 0 = Libre
        try {
            await axios.post(`${url}/estadoMesa`,
                JSON.stringify({ nroMesa, estado }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
        } catch (err) {
            console.log(err)
        }
    }

    const horaCierre = async () => {
        try {
            await axios.post(`${url}/cerrarMesa`,
                JSON.stringify({ nroMesa }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            )
        } catch (err) {
            console.log(err)
        }
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleConfirm = () => {
        clearPedido(nroMesa);
        handleClose();
        estadoMesa();
        horaCierre();
        navigate('/mesas')
    };

    const noOrder = () => {
        clearPedido(nroMesa);
        estadoMesa()
        horaCierre();
        navigate('/mesas');
    }

    const navigate = useNavigate();
    console.log(orden)
    console.log(rows)

    return (
        <React.Fragment>
            {rows.length !== 0  ? (
                <React.Fragment>
                    
                    <Row className='row-padre' style={{ margin:'0' }}>
                        <Header título={`ORDEN TOTAL: ${nroMesa}`} />
                    </Row>
                    <Container style={{marginBottom:'140px', maxWidth:'85%'}}>
                        <Table striped style={{marginTop:'10px'}} >
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Cantidad</th>
                                </tr>
                            </thead>
                            <tbody >
                                {rows.map((plato) => (
                                    <tr key={plato.key} style={{ fontWeight:'400', backgroundColor:variables.colorTerciario}} >
                                        <td>{plato.dscPlato}</td>
                                        <td>{ plato.cantidad}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <Row>
                            <h3 style={{textAlign:'right'}}>Total: {total||0}</h3>
                        </Row>
                        <Row style={{
                            justifyContent: 'space-between', textAlign: 'center',
                            position: 'fixed', bottom: '80px', right: '0', left: '0', 
                        }}>
                            <Col style={{
                                alignContent: 'center', justifyContent: 'center',
                                width: '40%'
                            }}>
                                <Button variant="primary"
                                    style={{
                                        backgroundColor: variables.colorPrimario, borderRadius:'5px',
                                        border: 'none', whiteSpace: 'nowrap',
                                        padding: '10px 15px',
                                        width: '60%'
                                        
                                    }}
                                    onClick={() => navigate('/mesas')}>Ver mesas</Button>
                            </Col>
                            <Col style={{
                                alignContent: 'center', justifyContent: 'center',
                                width: '40%'
                            }}>
                                <Button variant="primary"
                                    style={{
                                        backgroundColor: variables.colorPrimario, borderRadius:'5px',
                                        border: 'none', whiteSpace: 'nowrap',
                                        padding: '10px 15px',
                                        width: '60%'
                                    }}
                                    onClick={() => navigate(`/menu/${nroMesa}`)}>Ver platos</Button>
                            </Col>
                        </Row>
                        {/* <Row style={{justifyContent:'space-between', textAlign: 'center', 
        position:'fixed', bottom:'15px', right:'0', left:'0', margin: '0px 10px'}}>
                            <Col>
                                <Button variant="primary"
                                    style={{backgroundColor:variables.colorPrimario, borderRadius:'15px',
                                    border:'none',  whiteSpace: 'nowrap',
                                    padding:'10px 81px' }}
                                    onClick={() => { handleShow(); }}>Cerrar Mesa</Button>
                            </Col>
                        </Row> */}
                        <Modal show={show} onHide={handleClose} animation={false} centered>
                            <Modal.Header closeButton>
                                <Modal.Title>¿Seguro que quieres cerrar la mesa {nroMesa}?</Modal.Title>
                            </Modal.Header>
                            <Modal.Footer>
                                <Button onClick={handleClose}
                                    style={{ backgroundColor: variables.colorSecundario, border: 'none', color: 'black', borderRadius:'7px' }}>
                                    Cancelar
                                </Button>
                                <Button onClick={handleConfirm}
                                    style={{ backgroundColor: variables.colorPrimario, border: 'none', borderRadius:'7px' }}>
                                    Confirmar
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </Container>                 
                </React.Fragment>
                
            ) : (
                <React.Fragment>
                    <Row className='row-padre' style={{margin:'0'}}>
                        <Header título={`Orden ${nroMesa} vacía`} />
                    </Row>
                    <Container>
                        <Row>
                            <h3 style={{ margin: '30px 0px' }}>No hay platos ordenados</h3>
                        </Row>
                        <Row style={{
                            justifyContent: 'space-between', textAlign: 'center',
                            position: 'fixed', bottom: '20px', right: '0', left: '0', margin: '0px 15px'
                        }}>
                            <Button variant="primary" style={{ backgroundColor: variables.colorPrimario, borderRadius:'15px', border: 'none', whiteSpace: 'nowrap' }}
                            onClick={() => { noOrder() }}>Mesa sin orden</Button>
                        </Row>
                    </Container>
                </React.Fragment>
            )}
        </React.Fragment>
    )
}

export default OrdenConfirmada;