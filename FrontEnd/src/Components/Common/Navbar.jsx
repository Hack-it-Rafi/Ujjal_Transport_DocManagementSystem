import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Authentication/AuthProvider";
import useAdmin from "../Hooks/useAdmin";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isAdmin] = useAdmin();

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

  return (
    <div className="bg-[#1D1912] h-20">
      <div className="h-full flex items-center justify-between max-w-7xl mx-auto">
        <img
          className="w-44"
          src="/ujjal-flour-high-resolution-logo-transparent.png"
          alt="logo"
        />

        <div className="flex justify-between gap-4">
          {isAdmin == "admin" && (
            <div className="flex justify-center items-center gap-2">
              <ul className="flex text-white px-3 gap-5">{navLinks}</ul>
            </div>
          )}
          {user ? (
            <>
              <button
                onClick={handleLogOut}
                className="w-28 h-10 bg-[#F3F3E6] text-black font-bold rounded-lg text-xl text-center hover:bg-white"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link to="/login">
              <button className="w-28 h-10 bg-[#F3F3E6] text-black font-bold rounded-lg text-xl text-center hover:bg-white">
                Log In
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
