/* Funktion för att logga in en användare, post till auth/login returnerar en om användaren är inloggad eller inte */
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
/* Funktion för att logga ut en användare, post till auth/logout */
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
/* Funktion för att registrera en ny användare, post till users */
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