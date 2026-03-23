export async function loginUser(email, password) {
    const response = await fetch('http://localhost:5000/auth/login', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', 
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error || 'Inloggning misslyckades.');
    }
    return data; 
}

export async function logoutUser() {
    const response = await fetch('http://localhost:5000/auth/logout', {
        method: 'POST',
        credentials: 'include',  
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error || 'Utloggning misslyckades.');
    }
    return data;
}

export async function signUpUser(userData) {
    const response = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(userData)
    });

    const data = await response.json();
    if (!response.ok) {
        throw new Error(data.error || 'Registrering misslyckades.');
    }
    return data;
}