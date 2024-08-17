import { Link, useNavigate } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import { useContext } from "react";
import { AuthContext } from "../Authentication/AuthProvider";

const ModifiedNavbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut().then().catch();
  };

  const navLinks = (
    <>
      <li className="mr-1">
        <Link to="/home/adminDashboard/editRequests">Dashboard</Link>
      </li>
      <li className="mr-1">
        <Link to="/home/transportList">Transport List</Link>
      </li>
    </>
  );

  const handleRedirect = () => {
    navigate("/");
  };

  return (
    <div className="w-full text-white bg-[#1D1912]">
      <div className="navbar bg-[#1D1912] max-w-7xl mx-auto">
        <div className="navbar-start">
          {isAdmin == "admin" && (
            <div className="dropdown ">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow text-black"
              >
                {navLinks}
              </ul>
            </div>
          )}

          <img
            onClick={handleRedirect}
            className="w-44"
            src="/ujjal-flour-high-resolution-logo-transparent.png"
            alt="logo"
          />
        </div>
        {isAdmin == "admin" && (
          <div className="navbar-center hidden lg:flex">
            <ul className="menu text-white menu-horizontal px-1">{navLinks}</ul>
          </div>
        )}
        <div className="navbar-end">
          {user ? (
            <div className="">
              {/* <div className="text-white">{user.email}</div> */}
              <button
                onClick={handleLogOut}
                className="w-28 h-10 bg-[#F3F3E6] text-black font-bold rounded-lg text-xl text-center hover:bg-white"
              >
                Sign Out
              </button>
              <p className="text-white">{user.email}</p>
            </div>
          ) : (
            <div>
              <Link to="/login">
                <button className="w-28 h-10 bg-[#F3F3E6] text-black font-bold rounded-lg text-xl text-center hover:bg-white">
                  Log In
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModifiedNavbar;
