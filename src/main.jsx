import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// আপনার সমস্ত কম্পোনেন্ট এবং লেআউট ইম্পোর্ট করুন
import App from './App.jsx';
import AddCoffee from './components/AddCoffee.jsx';
import UpdateCoffee from './components/UpdateCoffee.jsx';
import CoffeeDetails from './components/CoffeeDetails.jsx';
import SignUp from './components/SignUp.jsx';
import Login from './components/Login.jsx';
import Users from './components/Users.jsx'; // <-- নতুন Users কম্পোনেন্ট ইম্পোর্ট করুন
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
        loader: () => fetch('http://localhost:2000/coffee'),
      },
      {
        path: "addCoffee",
        element: <AddCoffee></AddCoffee>,
      },
      {
        path: "updateCoffee/:id",
        element: <UpdateCoffee></UpdateCoffee>,
        loader: ({ params }) => fetch(`http://localhost:2000/coffee/${params.id}`)
      },
      {
        path: "coffee/:id",
        element: <CoffeeDetails></CoffeeDetails>,
        loader: ({ params }) => fetch(`http://localhost:2000/coffee/${params.id}`)
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
        // ✅ সমাধান: Users পেজের জন্য নতুন রাউটটি এখানে যোগ করা হয়েছে
        path: '/users',
        element: <Users></Users>,
        loader: () => fetch('http://localhost:2000/user')
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