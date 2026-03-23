import { Link, Outlet } from "react-router-dom"
import { Box, AppBar, Typography, Toolbar, Button } from '@mui/material'
import { useAuth } from './context/AuthContext';
import { useCart } from './context/CartContext';
import { logoutUser } from './services/authService';
import Navbar from './components/Navbar';
import { useLocation } from 'react-router-dom';

function App() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const location = useLocation();
  const isHome = location.pathname === '/';

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
            {!isHome && <Navbar />}  {/* ✅ only show on non-home pages */}
            <Outlet />
        </>
    );
}

export default App