import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { logoutUser } from '../services/authService';
import { useCart } from '../context/CartContext';

function Navbar() {
    const { user, logout } = useAuth();
    const { cart } = useCart(); // ✅ destructure cart

    const handleLogout = async () => {
        try {
            await logoutUser();
        } catch (err) {
            console.error(err);
        } finally {
            logout();
        }
    };

    return (
        <AppBar position="static" sx={{ background: 'linear-gradient(135deg, #1b5e20, #4a148c)' }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Typography variant="h6">
                    <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Hem</Link>
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button component={Link} to="/products/new" sx={{ color: 'white' }}>
                        Skapa produkt
                    </Button>
                    <Button component={Link} to="/Cart" sx={{ color: 'white' }}>
                        Kundvagn ({cart?.totalAmount || 0}) {}
                    </Button>
                    {user ? (
                        <>
                            <Typography sx={{ color: 'white', alignSelf: 'center' }}>
                                Hej, {user.username}!
                            </Typography>
                            <Button component={Link} to="/AccountSettings" sx={{ color: 'white' }}>
                                Konto
                            </Button>
                            <Button onClick={handleLogout} sx={{ color: 'white' }}>
                                Logga ut
                            </Button>
                        </>
                    ) : (
                        <Button component={Link} to="/Login" sx={{ color: 'white' }}>
                            Logga in
                        </Button>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;