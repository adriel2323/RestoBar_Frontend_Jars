import React from 'react';
import { Card } from 'react-bootstrap';
import { Contador } from '../Contador';

const Plato = ({ plato }) => {
  return (
    <>
      { plato.ControlStock === true ?
      <Card className='mt-3' style={{ maxWidth: '92%', backgroundColor:'#B0E0E6', borderRadius:'15px', border:'none' }} >
      <Card.Body className='text-left d-flex' 
        style={{ display: 'flex', alignItems: 'center', textAlign: 'center', justifyContent: 'space-between' }}>
        <Card.Text style={{ margin: '0',  fontWeight: '600', whiteSpace: 'pre-wrap', textAlign: 'left', maxWidth: '60%' }}>
          {plato.dscPlato}
        </Card.Text>
          <Contador plato={plato} />
        </Card.Body>
      </Card>
      :
      <Card className='mt-3' style={{ maxWidth: '92%', backgroundColor:'#B0E0E6', borderRadius:'15px', border:'none' }} >
        <Card.Body className='text-left d-flex' 
          style={{ display: 'flex', alignItems: 'center', textAlign: 'center', justifyContent: 'space-between' }}>
          <Card.Text style={{ margin: '0',  fontWeight: '600', whiteSpace: 'pre-wrap' }}>
            {plato.dscPlato}
          </Card.Text>
          <Card.Text style={{ margin: '0', fontWeight: '600' }}>No Stock</Card.Text>
        </Card.Body>
      </Card>
      }
    </>
  );
};

export default Plato;
