function getAuthHeader() {
    return {
        'Content-Type': 'application/json'
    };
}

export async function createRating(productId, rating, body) {
    const response = await fetch(`http://localhost:5000/products/${productId}/ratings`, {
        method: 'POST',
        headers: getAuthHeader(),
        credentials: 'include', 
        body: JSON.stringify({ rating, body })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Något gick fel.');
    return data;
}

export async function updateRating(ratingId, rating, body) {
    const response = await fetch(`http://localhost:5000/ratings/${ratingId}`, {
        method: 'PUT',
        headers: getAuthHeader(),
        credentials: 'include',
        body: JSON.stringify({ rating, body })
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Något gick fel.');
    return data;
}

export async function deleteRating(ratingId) {
    const response = await fetch(`http://localhost:5000/ratings/${ratingId}`, {
        method: 'DELETE',
        headers: getAuthHeader(),
        credentials: 'include',
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Något gick fel.');
    return data;
}