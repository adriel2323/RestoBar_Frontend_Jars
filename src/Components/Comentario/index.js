import { useContext, useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Input } from 'reactstrap';
import { OrdenContext } from '../../context/OrdenContext';
import { Row, Col } from 'react-bootstrap'
import { variables } from '../../variables';

function Comentario(props) {
    const { nuevaOrden, setNuevaOrden } = useContext(OrdenContext)

    const [comentario, setComentario] = useState('')

    const rows = [];
    const platosOrden = [];

    for (const key in nuevaOrden.platos) {
        if (nuevaOrden.platos.hasOwnProperty.call(nuevaOrden.platos, key)) {
            const plato = nuevaOrden.platos[key];
            rows.push(plato)
            platosOrden.push(Object.values(plato))
        }
    }

    const handleAgregarComentario = (idPlato) => {
        setNuevaOrden(nuevoNombre => {
            const comentarioAgregado = { ...nuevoNombre.platos };
            comentarioAgregado[idPlato].dscPlato = `${comentarioAgregado[idPlato].dscPlato} (${comentario})`;
            return { ...nuevoNombre, platos: comentarioAgregado };
        });
        setComentario("");
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Comentario
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    rows.length > 0 ? <Container>
                    {rows.map((plato) => (
                        <div key={plato.idPlato}>
                            <Row>
                                <Col style={{marginBottom:'5px'}}>
                                    <>{plato.dscPlato}</>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Input
                                        type="text"
                                        placeholder="Ej: 2 sin tomate"
                                        style={{borderRadius:'5px'}}
                                        onChange={(e) => setComentario(e.target.value)}
                                    />
                                    <Button variant="primary"
                                     style={{backgroundColor: variables.colorPrimario, border:'none'
                                     , marginTop:'15px', borderRadius:'7px'}}
                                    onClick={() => handleAgregarComentario(plato.idPlato)}>Comentar</Button>
                                </Col>
                            </Row>
                        </div>
                    ))}
                </Container>
                :
                <Container style={{fontFamily:'roboto serif'}}>
                    No hay platos seleccionados
                </Container>
                }
                
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide} style={{backgroundColor: variables.colorSecundario, border:'none', color:'black', borderRadius:'7px'}}>Cerrar</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default Comentario;