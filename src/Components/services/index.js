import axios from 'axios';

export const url = 'http://10.84.1.112:3050'

// Platos
export async function getPlatos () {
  try {
    const response = await axios({
      url:`${url}/platos`,
      method: 'GET'
    })
    return response  
  }catch(e){
    console.log(e)
  }
}

// Rubros
export async function getRubros () {
  try {
    const response = await axios({
      url:`${url}/rubros`,
      method: 'GET'
    })
    return response
  }catch(e){
    console.log(e)
  }
}

// Mesas
export async function getMesas () {
  try {
    const response = await axios({
      url:`${url}/mesas`,
      method: 'GET'
    })
    return response
  }catch(e){
    console.log(e)
  }
}

// Mozos
export async function getMozos () {
  try {
    const response = await axios ({
      url:`${url}/mozos`,
      method: 'GET'
    })
    return response;
  }catch(e){
    console.log(e);
  }
}

// Comanderas
export async function getComanderas () {
  try {
    const response = await axios ({
      url:`${url}/comanderas`,
      method: 'GET'
    })
    return response;
  } catch (error) {
    console.log(error)
  }
}