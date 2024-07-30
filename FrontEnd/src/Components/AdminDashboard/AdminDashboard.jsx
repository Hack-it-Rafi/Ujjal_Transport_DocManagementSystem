import { Outlet } from "react-router-dom";
import AdminNav from "./AdminNav";

const AdminDashboard = () => {
    return (
        <div className="w-screen">
            <AdminNav></AdminNav>
            <Outlet></Outlet>
        </div>
    );
};

export default AdminDashboard;