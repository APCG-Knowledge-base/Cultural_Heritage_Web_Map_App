import logo from "./logo.svg";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import "./App.css";
import MainMap from "./components/MainMap.js";
import React from "react";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/leaflet.js";
import AuthenticationPage, {action as authAction} from "./pages/Authentication";
import RootLayout from './pages/Root';
import NewEventPage, {action as eventAction} from './pages/NewEvent';
import AdminPage from './pages/AdminPage';
import NewAdminEventPage from './pages/NewAdminEventPage';
import EditEventPage from './pages/EditEventPage';
import { checkAuthNamestorageLoader,checkAuthLoader } from "./util/auth";
import AdminLoginPage from "./pages/AdminLoginPage.js";



const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <MainMap /> },
      {
        path: '/auth',
        element: <AuthenticationPage />,
        action:authAction
      },
      {
        path: '/events',
        element: <NewEventPage />,
        action:eventAction,
        loader:checkAuthLoader,
      },
      { 
        path: '/admin',
        element: <AdminLoginPage />,
      },
      {
        path: '/admin-page',
        element: <AdminPage />,
        loader: checkAuthLoader, // Ensure only authorized users can access
      },
      {
        path: '/new-event',
        element: <NewAdminEventPage />,
        loader: checkAuthLoader, // Ensure only authorized users can access
      },
      {
        path: '/edit-event/:id',
        element: <EditEventPage />,
        loader: checkAuthLoader, // Ensure only authorized users can access
      },
      
    ]
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
