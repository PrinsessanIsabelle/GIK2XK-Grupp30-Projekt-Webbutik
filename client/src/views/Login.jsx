import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../services/authService';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleLogin = async () => {
    try {
        const data = await loginUser(email, password);
        login(data.user); 
        navigate('/');
    } catch (err) {
        setError(err.message);
    }
};

    return (
        <Box sx={{ maxWidth: 400, margin: '100px auto', display: 'flex', flexDirection: 'column', gap: 2, }}>
            <Typography variant="h4">Logga in</Typography>
            {error && <Typography color="error">{error}</Typography>}
            <TextField
                label="E-post"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                    backgroundColor: 'white',
                    borderRadius: '4px',
                    border: '1px solid #060505',
                }}
            />
            <TextField
                label="Lösenord"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{
                    backgroundColor: 'white',
                    borderRadius: '4px',
                    border: '1px solid #060505',
                }}
            />
            <Button variant="contained" onClick={handleLogin}
                    sx={{
                    backgroundColor: '#b2ff59',
                    color: '#000',
                    fontWeight: 'bold',

                    
                    '&:hover': { backgroundColor: '#9cef5d' }
                }}>
                Logga in
            </Button>
            <Typography variant="body2">
                Inget konto? <a href="/SignUp">Skapa konto</a>
            </Typography>   
        </Box>
        
    );
}

export default Login;