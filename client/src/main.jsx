import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './context/AuthContext';
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './views/Home.jsx'
import ProductDetail from './views/ProductDetail.jsx'
import ProductRating from './views/ProductRating.jsx'
import ProductEdit from './views/ProductEdit.jsx'
import Cart from './views/Cart.jsx'
import Login from './views/Login.jsx'
import SignUp from './views/SignUp.jsx'
import AccountSettings from './views/AccountSettings.jsx'
import Payment from './views/Payment.jsx'
import Categories from './views/Categories.jsx';

const router = createBrowserRouter([
  { path: '/', element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/products/new', element: <ProductEdit /> },
      { path: '/products/:id/edit', element: <ProductEdit /> },
      { path: '/products/:id', element: <ProductDetail /> },
      { path: '/products/:id/rating', element: <ProductRating /> },
      { path: '/Login', element: <Login /> },
      { path: '/SignUp', element: <SignUp /> },
      { path: '/AccountSettings', element: <AccountSettings /> },
      { path: '/Cart/:id', element: <Cart /> },
      { path: '/Cart/:id/Payment', element: <Payment /> },
      { path: '/categories/:name/products', element: <Categories /> }
    ]
  }
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);