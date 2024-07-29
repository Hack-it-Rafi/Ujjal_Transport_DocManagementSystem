import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LandingPage from './Components/General/LandingPage';
import Root from './Components/Root';
import TransportList from './Components/General/TransportList';

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
