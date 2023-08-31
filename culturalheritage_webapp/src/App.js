import logo from "./logo.svg";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import "./App.css";
import MainMap from "./components/MainMap.js";
import React from "react";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/leaflet.js";
import AuthenticationPage from "./pages/Authentication";


const router = createBrowserRouter([
  {
    path: '/',
    element: <MainMap />,
    children: [
      {
        path: '/auth',
        element: <AuthenticationPage />,
      }
    ]
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
