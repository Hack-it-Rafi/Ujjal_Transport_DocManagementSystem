
import { IoMdNotificationsOutline } from "react-icons/io";

const Navbar = () => {
  return (
    <div className="w-screen bg-[#1D1912] h-20">
      <div className="h-full flex items-center justify-between max-w-full mx-4">
        <img
          className="w-44"
          src="/ujjal-flour-high-resolution-logo-transparent.png"
          alt="logo"
        />
        <div className="flex justify-between gap-4">
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
