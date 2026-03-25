import { Link, Outlet } from "react-router-dom"
import { Box, AppBar, Typography, Toolbar, Button, Container } from '@mui/material'
import { useAuth } from './context/AuthContext';
import { useCart } from './context/CartContext';
import { logoutUser } from './services/authService';
import Navbar from './components/Navbar';
import { useLocation } from 'react-router-dom';

/* App-komponenten för att hantera applikationens layout */
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
            {!isHome && <Navbar />} 
            <Container maxWidth={false} sx={{
                  }}>   
                 <Box sx={{
                     backgroundColor: '#ab47bc',
                     borderRadius: 3,
                     boxShadow: 10,
                     overflow: 'hidden',
                     marginBlockStart: "10px",
                     }}>
                  <Outlet />
                 </Box >
            </Container>
        </>
    );
}

export default App