import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Components/Root";
import TransportList from "./Components/General/TransportList";
import LandingPage from "./Components/General/LandingPage";
import TransportDetails from "./Components/General/TransportDetails";
import AdminDashboard from "./Components/AdminDashboard/AdminDashboard";
import EditRequestList from "./Components/AdminDashboard/EditRequestList";
import AddVehicle from "./Components/AdminDashboard/AddVehicle";
import AuthProvider from "./Components/Authentication/AuthProvider";
import UserList from "./Components/AdminDashboard/UserList";
import Login from "./Components/Authentication/Login";
import PrivateRoute from "./Components/Authentication/PrivateRoute";
import AdminRoute from "./Components/Authentication/AdminRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import EditDocument from "./Components/General/EditDocument";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage></LandingPage>,
  },
  {
    path: "login",
    element: <Login></Login>,
  },
  {
    path: "/home",
    element: <Root></Root>,
    children: [
      {
        path: "transportList",
        element: (
          <PrivateRoute>
            <TransportList></TransportList>
          </PrivateRoute>
        ),
      },
      {
        path: "transportDetails/:id",
        element: (
          <PrivateRoute>
            <TransportDetails></TransportDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "editDocument/:id",
        element: (
          <PrivateRoute>
            <EditDocument></EditDocument>
          </PrivateRoute>
        ),
      },
      {
        path: "adminDashboard",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AdminDashboard></AdminDashboard>
            </AdminRoute>
          </PrivateRoute>
        ),
        children: [
          {
            path: "editRequests",
            element: (
              <PrivateRoute>
                <AdminRoute>
                  <EditRequestList></EditRequestList>
                </AdminRoute>
              </PrivateRoute>
            ),
          },
          {
            path: "addVehicle",
            element: (
              <PrivateRoute>
                <AdminRoute>
                  <AddVehicle></AddVehicle>
                </AdminRoute>
              </PrivateRoute>
            ),
          },
          {
            path: "users",
            element: (
              <PrivateRoute>
                <AdminRoute>
                  <UserList></UserList>
                </AdminRoute>
              </PrivateRoute>
            ),
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
