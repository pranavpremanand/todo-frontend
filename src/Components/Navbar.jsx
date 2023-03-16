import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset } from "../Redux/todoSlice";

const Navbar = () => {
  const dispatch =useDispatch()
  const navigate = useNavigate();
  return (
    <div className="h-24">
      <div className="justify-between px-3 flex items-center bg-gradient-to-tr from-gray-900 to-gray-600 ">
        <div className="flex p-3 gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-10 h-10 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
            />
          </svg>

          <h2 className="font-normal self-end text-white text-2xl">
            Make your Day!
          </h2>
        </div>

        <a
          onClick={() => {
            localStorage.removeItem("token");
            dispatch(reset())
            navigate("/signin");
          }}
          className="justify-self-end relative cursor-pointer inline-flex items-center justify-center p-2 px-4 py-1 overflow-hidden font-medium text-black transition duration-300 ease-out border-2 border-white-500 rounded-full shadow-md group"
        >
          <span class="absolute inset-0 flex items-center justify-center w-full h-full text-black duration-300 -translate-x-full bg-white group-hover:translate-x-0 ease">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-gray-700"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
              />
            </svg>
          </span>
          <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
            Signout
          </span>
          <span className="relative invisible">Signout</span>
        </a>
      </div>
    </div>
  );
};

export default Navbar;
