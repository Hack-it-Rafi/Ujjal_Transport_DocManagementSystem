import { Link } from "react-router-dom";

const AdminNav = () => {
  const navLinks = (
    <>
      <li className="mr-1">
        <Link to="/">Home</Link>
      </li>
      <li className="mr-1">
        <Link to="/addJobs">Add Jobs</Link>
      </li>
      <li className="mr-1">
        <Link to="/myPostedJobs">My Posted Jobs</Link>
      </li>
      <li className="mr-1">
        <Link to="/myBids">My Bids</Link>
      </li>
      <li className="">
        <Link to="/bidRequests">Bid Requests</Link>
      </li>
    </>
  );

  return (
    <div className="w-full flex justify-center">
      <div className="mx-auto navbar-center flex my-5">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>
    </div>
  );
};

export default AdminNav;
