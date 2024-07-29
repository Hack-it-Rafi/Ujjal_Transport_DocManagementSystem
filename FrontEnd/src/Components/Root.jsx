import { Outlet } from "react-router-dom";
import Navbar from "./Common/Navbar";

const Root = () => {
  return (
    <div className="bg-[#F3F3E6] min-h-screen">
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  );
};

export default Root;
