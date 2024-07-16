import React, { useEffect, useState } from 'react';
import { Navbar, NavDropdown, Modal, Button } from "react-bootstrap";
import { useNavigate } from 'react-router';
import axios from 'axios';
import { url } from '../services';
import { variables } from '../../variables';

const Header = (props, req, res) => {
    const navigate = useNavigate()
    const [show, setShow] = useState(false);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    let nomMozo = '';
    const handleConfirm = () => {
        axios.get(`${url}/logOut`);
        localStorage.removeItem('mozo')
        handleClose();
        navigate('/')
    };
    
    // TRAYENDO EL NOMBRE DEL MOZO DE LOCALSTORAGE (MOZO)
    useEffect(() => {
        if(localStorage.getItem('mozo')===null){
            navigate('/')
        } else{
            nomMozo = (JSON.parse(localStorage.getItem('mozo'))).nomMozo
            console.log(nomMozo)
        }
    },[])
    
    const ordenes = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.includes('orden-')) {
            const orden = JSON.parse(localStorage.getItem(key));
            if (orden && orden.ordenes) {
            const { nroMesa } = orden.ordenes[Object.keys(orden.ordenes)[0]];
            ordenes.push({ nroMesa });
            }
        }
    }
    
    return (
        <>
            <Navbar className='d-flex justify-content-between align-items-center'
            style={{maxHeight:'70px'}}>
                <h1 className='titulo' style={{color:variables.blanco, margin: '0 0 0 25px'}}>
                {props.título}
                </h1>
                <NavDropdown style={{ color:variables.blanco, display: 'inline-block' }}
                className='p-4' title={nomMozo} id="basic-nav-dropdown" >
                <NavDropdown.Item onClick={()=>navigate("/mesas")}>Ver mesas</NavDropdown.Item>
                {ordenes.map((orden) => (
                    <NavDropdown.Item key={orden.nroMesa} onClick={() => navigate(`/ordenConfirmada/${orden.nroMesa}`)}>
                    {`Mesa ${orden.nroMesa}`}
                    </NavDropdown.Item>
                ))}                        
                <NavDropdown.Item onClick={handleShow}>Salir</NavDropdown.Item>
                </NavDropdown>
            </Navbar>
            <Modal show={show} onHide={handleClose} animation={false} centered>
                <Modal.Header closeButton>
                <Modal.Title>¿Deseas cerrar sesión?</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                <Button onClick={handleClose}
                style={{backgroundColor: variables.colorSecundario, border:'none', color: 'black'}}>
                    Cancelar
                </Button>
                <Button onClick={handleConfirm}
                style={{backgroundColor: variables.colorPrimario, border:'none'}}>
                    Confirmar
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Header;
