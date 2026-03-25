import axios from "./api";

/* Hämtar alla produkter från API och loggar fel vid misslyckat anrop. */
export async function getAll(endpoint = '/products') {
    try {
    const response = await axios.get(endpoint);

    if(response.status === 200) return response.data;
    else {
        console.log(response);
        return [];
    }
    } catch(e) {
        e?.response ? console.log(e.response.data) : console.log(e);
    }  
}

/* Hämtar en enskild produkt baserat på dess ID och loggar fel vid misslyckat anrop. */
export async function getOne(id) {
    try{
        const response = await axios.get(`/products/${id}`);
        if(response.status === 200) return response.data;
        else {
        console.log(response.data);
        return null;
        }
    } catch(e) {
        e?.response ? console.log(e.response.data) : console.log(e);
    }
}

/* Skapar en ny produkt och loggar fel vid misslyckat anrop. */
export async function create(product) {
    try{
        const response = await axios.post(`/products`, product);
        if(response.status === 200) return response.data;
        else {
        console.log(response.data);
        return null;
        }
    } catch(e) {
        e?.response ? console.log(e.response.data) : console.log(e);
    }
}

/* Uppdaterar en befintlig produkt och loggar fel vid misslyckat anrop. */
export async function update(product) {
    try{
        const response = await axios.put(`/products/${product.id}`, product);
        if(response.status === 200) return response.data;
        else {
        console.log(response.data);
        return null;
        }
    } catch(e) {
        e?.response ? console.log(e.response.data) : console.log(e);
    }
}
/* Tar bort en produkt baserat på dess ID och loggar fel vid misslyckat anrop. */
export async function remove(id) {
    try{
        const response = await axios.delete(`/products/${id}`, { data: { id }});
        if(response.status === 200) return response.data;
        else {
        console.log(response.data);
        return null;
        }
    } catch(e) {
        e?.response ? console.log(e.response.data) : console.log(e);
    }
}

export async function addRating(productId, rating) {
    try{
        const response = await axios.post(`/products/${productId}/ratings`, rating);
        if(response.status === 200) return response.data;
        else {
        console.log(response.data);
        return null;
        }
    } catch(e) {
        e?.response ? console.log(e.response.data) : console.log(e);
    }
}
export async function getByCategory(categoryName) {
    try {
        const response = await axios.get(`/products/category/${categoryName}`);
        if(response.status === 200) return response.data;
        else {
            console.log(response);
            return [];
        }
    } catch(e) {
        e?.response ? console.log(e.response.data) : console.log(e);
    }
}