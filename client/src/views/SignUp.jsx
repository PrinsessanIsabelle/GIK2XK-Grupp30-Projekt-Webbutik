import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { signUpUser, loginUser } from '../services/authService';
import { TextField, Button, Typography, Box } from '@mui/material';

function SignUp() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [form, setForm] = useState({
        email: '',
        username: '',
        password: '',
        firstName: '',
        lastName: ''
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            // 1. Create the account
            await signUpUser(form);

            // 2. Automatically log in
            const data = await loginUser(form.email, form.password);
            login(data.user);

            // 3. Redirect to home
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <Box sx={{ maxWidth: 400, margin: '100px auto', display: 'flex', flexDirection: 'column', gap: 2,  }}>
            <Typography variant="h4">Skapa konto</Typography>
            {error && <Typography color="error">{error}</Typography>}
            <TextField
                label="E-post"
                name="email"
                value={form.email}
                onChange={handleChange}
                sx={{
                    backgroundColor: 'white',
                    borderRadius: '4px',
                    border: '1px solid #060505',
                }}
            />
            <TextField
                label="Användarnamn"
                name="username"
                value={form.username}
                onChange={handleChange}
                sx={{
                    backgroundColor: 'white',
                    borderRadius: '4px',
                    border: '1px solid #060505',
                }}
            />
            <TextField
                label="Förnamn"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                sx={{
                    backgroundColor: 'white',
                    borderRadius: '4px',
                    border: '1px solid #060505',
                }}
            />
            <TextField
                label="Efternamn"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                sx={{
                    backgroundColor: 'white',
                    borderRadius: '4px',
                    border: '1px solid #060505',
                }}
            />
            <TextField
                label="Lösenord"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                sx={{
                    backgroundColor: 'white',
                    borderRadius: '4px',
                    border: '1px solid #060505',
                }}
            />
            <Button variant="contained" onClick={handleSubmit}
               sx={{
                    backgroundColor: '#b2ff59',
                    color: '#000',
                    fontWeight: 'bold',

                    
                    '&:hover': { backgroundColor: '#9cef5d' }
                }}>
            
                Skapa konto
            </Button>
            <Typography variant="body2">
                Har du redan ett konto? <a href="/Login">Logga in</a>
            </Typography>
        </Box>
    );
}

export default SignUp;