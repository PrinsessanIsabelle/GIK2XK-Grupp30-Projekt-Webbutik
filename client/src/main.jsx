import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ProductEdit from './views/ProductEdit.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Home from './views/Home.jsx'
import ProductDetail from './views/ProductDetail.jsx'
import Cart from './views/Cart.jsx'
import Login from './views/Login.jsx'
import SignUp from './views/SignUp.jsx'
import AccountSettings from './views/AccountSettings.jsx'

const router = createBrowserRouter([
  {path: '/', element: <App />,
    children: [
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/product/new',
      element: <ProductEdit />
    },
    {
      path: '/cart',
      element: <Cart />
    },
    {
      path: '/Login',
      element: <Login />
    },
    {
      path: '/AccountSettings',
      element: <AccountSettings />
    },
  ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
