import ProductList from '../components/ProductList';
import CategoryList from '../components/CategoryList';
import { useEffect, useState } from 'react';
import { getAll } from '../services/ProductService';
import { Box, Typography, Container, Toolbar, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { logoutUser } from '../services/authService';

function Home() {
    const [products, setProducts] = useState([]);
    const { user, logout } = useAuth();

    useEffect(() => {
        getAll().then((response) => {
            setProducts(response || []);
        });
    }, []);

    const handleLogout = async () => {
        try {
            await logoutUser();
        } catch (err) {
            console.error('Utloggning misslyckades:', err);
        } finally {
            logout();
        }
    };

    return (
        <>
            {/* Hero banner with integrated navbar */}
            <Box sx={{
                background: 'linear-gradient(135deg, #1b5e20, #4a148c)',
                color: 'white',
                paddingBottom: '60px',
            }}>
                {/* Navbar inside banner */}
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Typography variant="h6">
                        <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
                            Hem
                        </Link>
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button color="inherit" component={Link} to="/products/new" sx={{ color: 'white' }}>
                            Skapa produkt
                        </Button>
                        <Button color="inherit" component={Link} to="/Cart" sx={{ color: 'white' }}>
                            Kundvagn
                        </Button>
                        {user ? (
                            <>
                                <Typography sx={{ color: 'white', alignSelf: 'center', mr: 1 }}>
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

                {/* Hero text */}
                <Box sx={{ textAlign: 'center', padding: '40px 20px 20px' }}>
                    <Typography variant="h3" fontWeight="bold" gutterBottom>
                        🧪 Whimsical Potions
                    </Typography>
                    <Typography variant="h6" sx={{ opacity: 0.9 }}>
                        Upptäck våra magiska drycker och bryggeri
                    </Typography>
                </Box>
            </Box>

            {/* Rest of the page */}
            <Container maxWidth="xl">
                <Typography variant="h5" fontWeight="bold" marginBottom={2} marginTop={4} sx={{ color: '#4a148c' }}>
                    Kategorier
                </Typography>
                <CategoryList />

                <Typography variant="h5" fontWeight="bold" marginTop={4} marginBottom={2} sx={{ color: '#4a148c' }}>
                    Alla produkter
                </Typography>
                <ProductList products={products} />
            </Container>
        </>
    );
}

export default Home;