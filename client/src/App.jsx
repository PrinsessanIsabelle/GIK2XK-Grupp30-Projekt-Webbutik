import { Link, Outlet } from "react-router-dom"
import {Box, AppBar, Typography, Toolbar, Button} from '@mui/material'

function App() {

  return (
    <> <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/">Hem</Link>
          </Typography>
          <Button color="inherit">
            <Link to="/Login">Logga in</Link>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
    <ul>
      <li>
        <Link to="/product/new">Skapa produkt</Link>
      </li>
      <li>
        <Link to="/Cart">Kundvagn</Link>
      </li>
      <li>
        <Link to="/AccountSettings">Konto</Link>
      </li>
    </ul>
    <Outlet />
    </>
  )
}

export default App
