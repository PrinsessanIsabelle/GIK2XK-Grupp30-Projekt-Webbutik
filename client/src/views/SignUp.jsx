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
        <Box sx={{ maxWidth: 400, margin: '100px auto', display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h4">Skapa konto</Typography>
            {error && <Typography color="error">{error}</Typography>}
            <TextField
                label="E-post"
                name="email"
                value={form.email}
                onChange={handleChange}
            />
            <TextField
                label="Användarnamn"
                name="username"
                value={form.username}
                onChange={handleChange}
            />
            <TextField
                label="Förnamn"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
            />
            <TextField
                label="Efternamn"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
            />
            <TextField
                label="Lösenord"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
            />
            <Button variant="contained" onClick={handleSubmit}>
                Skapa konto
            </Button>
            <Typography variant="body2">
                Har du redan ett konto? <a href="/Login">Logga in</a>
            </Typography>
        </Box>
    );
}

export default SignUp;