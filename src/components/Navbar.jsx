import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserLarge } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";

function Navbar() {
  
  
  // Check if the current route is the login page
  const isLoginPage = location.pathname === '/login';
  const token = localStorage.getItem("token");
  return (
    <>
      <div className="flex justify-between px-[65px] h-[80px] w-[100%] bg-indigo-950 text-zinc-50">
        <div className="flex justify-center items-center">
          <h1
            onClick={() => {
              window.location.href = "/";
            }}
            className="items-center mt-2 h-[50px] font-bold text-[20px] text-stone-50"
          >
            MoviEase.com
          </h1>
        </div>

        <div className="flex justify-center items-center gap-10 cursor-pointer">
          {!token ? (
            <h1 onClick={() => {window.location.href = "/login"}} className="pt-[5px] items-center mt-2 h-[50px] font-semibold text-[20px] text-stone-50">
              Login
            </h1>
          ) : (
            <h1 className="pt-[5px] items-center mt-2 h-[50px] font-semibold text-[20px] text-stone-50">

            </h1>
          )}
          <div className="flex justify-center items-center">
            <FontAwesomeIcon icon={faUserLarge} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
