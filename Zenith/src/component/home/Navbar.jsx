import React, { useState } from "react";
import { UserButton } from '@clerk/clerk-react'


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="w-full text-gray-700 bg-white h-screen z-50">
      <div className="flex flex-col max-w-screen-6xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
        <div className="p-4 flex flex-row justify-between items-center h-[100px]">
          <a
            href="/home"
            className="text-xl font-semibold tracking-widest text-gray-900 uppercase rounded-lg  focus:outline-none focus:shadow-outline"
          >
            Zenith AI
          </a>
          <button
            className="md:hidden rounded-lg focus:outline-none focus:shadow-outline"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              fill="currentColor"
              viewBox="0 0 20 20"
              className="w-6 h-6"
            >
              {menuOpen ? (
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              )}
            </svg>
          </button>
        </div>
        <nav
          className={`${
            menuOpen ? "flex h-screen z-50 bg-white gap-8" : "hidden"
          } flex-col flex-grow pb-4 md:pb-0 md:flex md:justify-end md:flex-row`}
        >
           <a
            href="https://framevr.io/zenithai"
            className="hover:scale-105 hover:duration-300 hover:transition-all px-4 py-2 mt-2 text-xl font-semibold text-gray-900 rounded-lg md:mt-0 hover:text-gray-900 focus:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
          >
            Virtual Mediation
          </a>
          <a
            href="/articles"
            className="hover:scale-105 hover:duration-300 hover:transition-all px-4 py-2 mt-2 text-xl font-semibold text-gray-900 rounded-lg md:mt-0 hover:text-gray-900 focus:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
          >
            Articles
          </a>
         
         
          <a
            href="/face-detection"
            className="hover:scale-105 hover:duration-300 hover:transition-all px-4 py-2 mt-2 text-xl font-semibold bg-transparent rounded-lg md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
          >
            Mood Detection
          </a>
          <a
            href="/chat"
            className="hover:scale-105 hover:duration-300 hover:transition-all px-4 py-2 mt-2 text-xl font-semibold bg-transparent rounded-lg md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
          >
            Virutal Chat
          </a>
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="hover:scale-105 hover:duration-300 hover:transition-all flex flex-row items-center w-full px-4 py-2 mt-2 text-xl  font-semibold text-left bg-transparent rounded-lg dark:bg-transparent md:w-auto md:inline md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
            >
              <span>Helpline</span>
              <svg
                fill="currentColor"
                viewBox="0 0 20 20"
                className={`inline w-4 h-4 ml-1 transition-transform duration-200 transform ${
                  dropdownOpen ? "rotate-180" : "rotate-0"
                }`}
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 w-full mt-4 origin-top-right rounded-md shadow-lg md:w-96 z-50">
                <div className="px-2 py-2 bg-white rounded-xl shadow">
                  <a
                    href="https://www.thelivelovelaughfoundation.org/find-help/helplines"
                   
                  >
                   <p className="block px-4 py-4  text-xl hover:scale-105 hover:duration-300 hover:transition-all font-semibold bg-transparent rounded-lg dark:bg-transparent  md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"> Find Help </p>
                  </a>
                  <div className=" bg-gray-800 h-[0.5px]"></div>
                  <a
                    href="https://www.nimh.nih.gov/health/topics/suicide-prevention"
                   
                  >
                  <p className="block px-4 py-4 text-xl hover:scale-105 hover:duration-300 hover:transition-all font-semibold bg-transparent rounded-lg dark:bg-transparent  md:mt-0 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"> Suicide Prevention  </p>
                  </a>
                </div>
              </div>
            )}
          </div>
          <a
            href="/profile"
            className="hover:scale-105 hover:duration-300 hover:transition-all px-4 py-2 mt-2 text-xl font-semibold bg-transparent rounded-lg md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 focus:bg-gray-200 focus:outline-none focus:shadow-outline flex items-center gap-4"
          >
            <UserButton />
            <span>
            Profile
            </span>
          </a>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
