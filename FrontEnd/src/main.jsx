import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './Components/Root';
import TransportList from './Components/General/TransportList';
import LandingPage from './Components/General/LandingPage';
import TransportDetails from './Components/General/TransportDetails';
import AdminDashboard from './Components/AdminDashboard/AdminDashboard';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage></LandingPage>
  },
  {
    path: "/home",
    element: <Root></Root>,
    children:[
      {
        path:"transportList",
        element: <TransportList></TransportList>
      },
      {
        path: "transportDetails",
        element: <TransportDetails></TransportDetails>
      },
      {
        path:"adminDashBoard",
        element:<AdminDashboard></AdminDashboard>,
        children:[
          {
            path:""
          }
        ]
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>,
)
