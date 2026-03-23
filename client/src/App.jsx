import { Link, Outlet } from "react-router-dom"
import { Box, AppBar, Typography, Toolbar, Button } from '@mui/material'
import { useAuth } from './context/AuthContext';
import { useCart } from './context/CartContext';
import { logoutUser } from './services/authService';

function App() {
  const { user, logout } = useAuth();
  const { cart } = useCart();

  const handleLogout = async () => {
      try {
          await logoutUser();  // tells the server to destroy the session
      } catch (err) {
          console.error('Utloggning misslyckades:', err);
      } finally {
          logout();  // always clear the local state even if server call fails
      }
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/">Hem</Link>
            </Typography>
            {user ? (
              <>
                <Typography color="inherit" sx={{ mr: 2 }}>
                  Hej, {user.username}!
                </Typography>
                <Button color="inherit" component={Link} to="/AccountSettings">
                  Konto
                </Button>
                <Button color="inherit" component={Link} to="/cart">
                  Kundvagn ({cart?.totalAmount || 0})
                </Button>
                <Button color="inherit" onClick={handleLogout}>
                  Logga ut
                </Button>
              </>
            ) : (
              <>
                <Button color="inherit" component={Link} to="/cart">
                  Kundvagn ({cart?.totalAmount || 0})
                </Button>
                <Button color="inherit" component={Link} to="/Login">
                  Logga in
                </Button>
              </>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      <ul>
        <li><Link to="/products/new">Skapa produkt</Link></li>
        <li><Link to="/cart">Kundvagn</Link></li>
      </ul>
      <Outlet />
    </>
  )
}

export default App