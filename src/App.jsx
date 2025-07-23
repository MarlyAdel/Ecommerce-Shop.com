
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Products from './Components/Products/Products';
import Categories from './Components/Categories/Categories';
import Cart from './Components/Cart/Cart';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import CategoryPage from './Components/CategoryPage/CategoryPage';
import NotFound from './Components/NotFound/NotFound';
import ProtectedRoutes from './Components/ProtectedRoutes/ProtectedRoutes';
import Authview from './Components/AuthView/Authview';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import Checkout from './Components/Checkout/Checkout';
import { ToastContainer } from 'react-toastify';
import Order from './Components/Order/Order';


function App() {
  
  const routes = createBrowserRouter([
    {path:"" , element: <Layout/> , children: [
    {index: true , element:<ProtectedRoutes><Home/></ProtectedRoutes>},
    {path:"products" , element:<ProtectedRoutes><Products/></ProtectedRoutes> },
    {path:"categories" , element:<ProtectedRoutes><Categories/></ProtectedRoutes> },
    {path:"categories/:name" , element:<ProtectedRoutes><CategoryPage/></ProtectedRoutes> },
    {path: "cart" , element:<ProtectedRoutes><Cart/></ProtectedRoutes> },
    {path:"checkout" , element:<ProtectedRoutes><Checkout/></ProtectedRoutes> },
    {path:"order" , element:<ProtectedRoutes><Order/></ProtectedRoutes> },
    {path: "login" , element:<Authview><Login/></Authview> },
    {path: "register" , element:<Authview><Register/></Authview> },
    {path:"productdetails/:categoryId/:id", element:<ProtectedRoutes><ProductDetails/></ProtectedRoutes> },
    {path:'*' , element:<NotFound/>}
    ]}
  ])

  return (
    <>
      <RouterProvider router={routes} />
      <ToastContainer />
    </>
  );
}

export default App


//loli@gmail.com
//L12345