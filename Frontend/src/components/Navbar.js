import React from "react";
import { useNavigate } from "react-router-dom";
import "../style/index.css";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const navigate = useNavigate();
  const userName = jwtDecode(localStorage.getItem('token')).data.name;

  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      navigate("/");

      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "Logout out successfully"
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="bg-transparent-600 p-4 shadow-md decoration-slice">
      <div className="container mx-auto flex justify-between items-center">
        <ul className="flex space-x-4 justify-center">
          <li><a href="/dashboard" className="text-black hover:font-semibold">Home</a></li>
          <li><a href="/product" className="text-black hover:font-semibold">Products</a></li>
          <li><a href="/LogActivity" className="text-black hover:font-semibold">LogActivity</a></li>
          <li><a href="https://scanner-zqer.vercel.app/" target="_blank" rel="noreferrer" className="text-black hover:font-semibold">Scanner</a></li>
        </ul>

        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="mx-auto focus:outline-none">
              <div className="flex items-center">
                <li><a><span className="text-black font-normal">Welcome! {userName}</span></a></li>
              </div>
            </div>
            <ul className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
              <li><a href="#" onClick={handleLogout}>Logout</a></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
