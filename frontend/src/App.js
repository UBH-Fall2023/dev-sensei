import React from "react";
import Dashboard from "./Users/Dashboard";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from "./Layout";
import Signup from "./Signup";
import Signin from "./Signin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Signup />,
      },
      {
        path: "/signin",
        element: <Signin />,
      },
      {
        path: "/user",
        element: <Dashboard />
      },
    ]
  }
]);

function App() {
  return (
    <div className="">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
