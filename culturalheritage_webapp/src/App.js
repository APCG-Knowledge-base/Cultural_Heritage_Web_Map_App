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
import { checkAuthNamestorageLoader } from "./util/auth";


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
        loader:checkAuthNamestorageLoader,
      },
    ]
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
