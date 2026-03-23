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
          await logoutUser(); 
      } catch (err) {
          console.error('Utloggning misslyckades:', err);
      } finally {
          logout();  
      }
  };

  return (
        <>
            {!isHome && <Navbar />}  {}
            <Outlet />
        </>
    );
}

export default App