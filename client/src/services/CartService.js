import axios from './api';

export async function getMyCart() {
	try {
		const response = await axios.get('/carts/me');
		if (response.status === 200) return response.data;
		console.log(response);
		return null;
	} catch (e) {
		e?.response ? console.log(e.response.data) : console.log(e);
	}
}

export async function getCartById(id) {
	try {
		const response = await axios.get(`/carts/${id}`);
		if (response.status === 200) return response.data;
		console.log(response);
		return null;
	} catch (e) {
		e?.response ? console.log(e.response.data) : console.log(e);
	}
}

export async function addProductToCart(productId, amount = 1) {
	try {
		const response = await axios.post('/carts/me/rows', { productId, amount });
		if (response.status === 200) return response.data;
		console.log(response);
		return null;
	} catch (e) {
		e?.response ? console.log(e.response.data) : console.log(e);
	}
}

export async function updateCartRowAmount(rowId, amount) {
	try {
		const response = await axios.put(`/carts/me/rows/${rowId}`, { amount });
		if (response.status === 200) return response.data;
		console.log(response);
		return null;
	} catch (e) {
		e?.response ? console.log(e.response.data) : console.log(e);
	}
}

export async function removeCartRow(rowId) {
	try {
		const response = await axios.delete(`/carts/me/rows/${rowId}`);
		if (response.status === 200) return response.data;
		console.log(response);
		return null;
	} catch (e) {
		e?.response ? console.log(e.response.data) : console.log(e);
	}
}

export async function clearCart() {
	try {
		const response = await axios.delete('/carts/me/rows');
		if (response.status === 200) return response.data;
		console.log(response);
		return null;
	} catch (e) {
		e?.response ? console.log(e.response.data) : console.log(e);
	}
}

export async function checkoutCart() {
	try {
		const response = await axios.post('/carts/me/checkout');
		if (response.status === 200) return response.data;
		console.log(response);
		return null;
	} catch (e) {
		e?.response ? console.log(e.response.data) : console.log(e);
	}
}
