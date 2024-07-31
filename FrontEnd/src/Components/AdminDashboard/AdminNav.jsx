import { Link } from "react-router-dom";

const AdminNav = () => {
  const navLinks = (
    <>
      <li className="mr-1">
        <Link to="/home/adminDashboard/editRequests">Edit Requests</Link>
      </li>
      <li className="mr-1">
        <Link to="/home/adminDashboard/addVehicle">Add Vehicle</Link>
      </li>
      <li className="mr-1">
        <Link to="/myPostedJobs">Users</Link>
      </li>
    </>
  );

  return (
    <div className="w-full flex justify-center">
      <div className="mx-auto navbar-center flex my-5">
        <ul className="menu menu-horizontal px-3 gap-5">{navLinks}</ul>
      </div>
    </div>
  );
};

export default AdminNav;
