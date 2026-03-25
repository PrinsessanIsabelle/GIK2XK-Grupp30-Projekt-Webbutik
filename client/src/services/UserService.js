import axios from './api';

/* Hämtar alla användare från API och loggar fel vid misslyckat anrop. */
export async function getAll() {
    try {
    const response = await axios.get('/users');

    if(response.status === 200) return response.data;
    else {
        console.log(response);
        return [];
    }
    } catch(e) {
        e?.response ? console.log(e.response.data) : console.log(e);
    }  
}