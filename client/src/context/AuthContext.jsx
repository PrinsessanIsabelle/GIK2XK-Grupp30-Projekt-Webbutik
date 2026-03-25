// sköter delat UI-tillstånd i frontend 
// (vad appen “minns” just nu och hur komponenter uppdateras).

import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem('user')) || null
    );

const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);  // no token needed
};

const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
};

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}