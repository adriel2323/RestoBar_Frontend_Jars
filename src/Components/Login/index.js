import { Button , Form , Col,  Container, Row, Nav, Navbar  } from 'react-bootstrap';
import React, { useRef, useState, useEffect, useContext } from 'react';
import { getMozos, url } from '../services';
import "bootstrap/dist/css/bootstrap.min.css";
import AuthContext from '../../context/authProvider';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { variables } from '../../variables';
import logo from '../../Assets/images/log.jpg'

const CLIENTE_ID = 1
console.log(CLIENTE_ID);


const LoginTest = () => {
    const { setAuth,setAvailable,available } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [nomUsr, setUser] = useState('');
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [bien, setBien] = useState(false)

    const [status, setStatus] = useState({});

    // useEffect(() => {
    //   userRef.current.focus()
    // }, [])

    useEffect( () => {
        const availableServer = localStorage.getItem('available')
        console.log(availableServer);

        if(availableServer == 'true'){
            setAvailable(true)
        }else{
            async function cliente() {
                const consulta_cliente=await axios.get(`${url}/check/${CLIENTE_ID}`)
                if(consulta_cliente.data.code===0){
                    setAvailable(false)
                }else{
                    const availableServer= consulta_cliente
                    setStatus( availableServer.data)
                    setAvailable( availableServer.data.habilitado);
                    console.log(availableServer);
                    localStorage.setItem('available', JSON.stringify(availableServer.data.habilitado))

                }
            }
            cliente()
        }
    },[available])
    
    useEffect(()=>{
        setErrMsg('');
    },[nomUsr, password])

    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            await axios.post(`${url}/buscar`,
                JSON.stringify({nomUsr, password}),
                {
                    headers: { 'Content-Type': 'application/json'},
                    withCredentials: true
                }
            );
            setAuth({ nomUsr, password });
            setUser('');
            setPassword('');
            setBien(true)
        } catch (err) {
            if(!err?.response){
                setErrMsg('No hay respuesta del servidor')
            }else if(err.response?.status === 400){
                setErrMsg('Ingresa un usuario/contraseña');
            }else if(err.response?.status === 401){
                setErrMsg('No se encontró el usuario');
            } else {
                setErrMsg('Falló')
            }
            errRef.current.focus();
        }
    }
    const handleRemove = async (e) =>{
        axios.get(`${url}/logOut`);
        setBien(false)
    }

    // Lógica mozos

    const [mozos, setMozos] = useState([]);

    useEffect(()=>{
        async function mostrarMozos () {
        const response = await getMozos();
        if(response.status === 200){
            setMozos(response.data.data)
        }
        }
        mostrarMozos();
    },[])

    // GUARDAR MOZO EN LOCALSTORAGE
    const guardarMozo=(mozo)=>{
        localStorage.setItem('mozo', JSON.stringify(mozo))
    }

    return (
        <>
        {bien ? (
            <Container fluid className='justify-content-center row' style={{padding:"0", margin:"0"}}>
            <Navbar className='nav-header'>
                <h1 style={{margin: "0 auto"}}>
                        Nombre del mozo
                </h1>
                <Nav.Link style={{ color:variables.blanco, display: 'inline-block'}}
                className='p-4' onClick={handleRemove}>
                    Salir
                </Nav.Link>
            </Navbar>
            
            <Col xs={8}>
              <Row >
                {
                  mozos.map(mozo => (
                    <Button className='mt-3' style={{backgroundColor: variables.colorSecundario, border:'none', color:'black'}}
                     onClick={()=>{navigate("/mesas"); guardarMozo(mozo)}} 
                     key={mozo.idMozo} value={mozo.nomMozo}>
                        {mozo.nomMozo}
                    </Button>
                  ))
                }
              </Row>
            </Col>
          </Container>

        ) : (

        <React.Fragment>
            {
                available ? (
                    <div className='color-overlay d-flex justify-content-center align-items-center'>
                        <Form className='form-login p-4 p-sm-3' 
                        style={{ maxWidth:"255px", display: 'flex', alignItems: 'center', borderRadius:"20px" }}
                        onSubmit={handleSubmit}>
                            <Form.Label  className='logo-text' style={{color:variables.blanco}} >Bienvenido</Form.Label>
                            <Col>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control className='form-input' 
                                type="text" name="nomUsr" placeholder="Usuario" 
                                ref={userRef} autoComplete="off" 
                                onChange={(e)=>setUser(e.target.value)} 
                                value={nomUsr} required/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Control className="form-input" 
                                type="password" name="password" placeholder="Contraseña"
                                onChange={(e)=> setPassword(e.target.value)}
                                value={password} required/>
                            </Form.Group>
                            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} 
                            style={{ margin: '0',  fontWeight: '600', whiteSpace: 'pre-wrap', paddingBottom:"15px" }} aria-live="assertive">
                                {errMsg}
                            </p>

                            <Button type="submit"
                            style={{backgroundColor: variables.colorSecundario, border:'none', color:'black'}}>
                                Ingresar
                            </Button>
                            </Col>
                        </Form>
            </div>) : (
                <div className='normalize' >

                    <div className='cartelDisable'>
                            
                        <h1 className=''>{status.msg}</h1>
                    </div>
                    
                    <img src={logo} className="App-logo" alt="logo">
                    </img>
                </div>
            )
            }
            
        </React.Fragment>
        )}
        </>
    )
}

export default LoginTest;
