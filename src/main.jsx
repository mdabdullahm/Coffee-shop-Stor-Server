import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import App from './App.jsx';
import AddCoffee from './components/AddCoffee.jsx';
import UpdateCoffee from './components/UpdateCoffee.jsx';
import CoffeeDetails from './components/CoffeeDetails.jsx';
import SignUp from './components/SignUp.jsx';
import Login from './components/Login.jsx';
import Users from './components/Users.jsx';
import Main from './Layout/Main.jsx';
import AuthProvider from './providers/AuthProvider.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <App></App>,
        loader: () => fetch('https://coffee-stor-server.onrender.com/coffee'),
      },
      {
        path: "addCoffee",
        element: <AddCoffee></AddCoffee>,
      },
      {
        path: "updateCoffee/:id",
        element: <UpdateCoffee></UpdateCoffee>,
        loader: ({ params }) => fetch(`https://coffee-stor-server.onrender.com/coffee/${params.id}`)
      },
      {
        path: "coffee/:id",
        element: <CoffeeDetails></CoffeeDetails>,
        loader: ({ params }) => fetch(`https://coffee-stor-server.onrender.com/coffee/${params.id}`)
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: '/users',
        element: <Users></Users>,
        loader: () => fetch('https://coffee-stor-server.onrender.com/user')
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);