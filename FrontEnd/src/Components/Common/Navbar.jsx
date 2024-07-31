
import { IoMdNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";

const Navbar = () => {

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
          <div className="flex justify-center items-center gap-2">
          <ul className="flex text-white px-3 gap-5">{navLinks}</ul>
          </div>
          <button>
            <IoMdNotificationsOutline className="text-white text-3xl" />
          </button>
          <button className="w-28 h-10 bg-[#F3F3E6] text-black font-bold rounded-lg text-xl text-center hover:bg-white">
            <p>Login</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
