import { useState } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

function MainNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="absolute z-10  bg-[#002259] top-0 right-0 left-0 p-5 h-[8vh] flex shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="">
            <img src={logo} alt="logo" />
          </div>
          <div
            className={`lg:flex ${
              isMenuOpen ? "hidden" : "hidden"
            } gap-8 text-white text-lg items-center`}
          >
            <Link to="/">Home</Link>
            <Link to="/tbl_history">Test History</Link>
            <Link to="/tbl_interval">ETD</Link>
            <Link to="/tbl_ciri">Ciri Jenazaah</Link>
            <Link to="/message">Contact Doctor</Link>
            <div className="border rounded-md px-6 py-1">
              <button className="">Log Out</button>
            </div>
          </div>
          <button className="lg:hidden block" onClick={toggleMenu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="lg:hidden gap-2 absolute z-10 top-20 right-0 left-0 bg-[#002259] text-white text-lg flex flex-col items-center px-10 py-2">
          <Link to="/">Home</Link>
          <Link to="/tbl_history">Test History</Link>
          <Link to="/tbl_interval">ETD</Link>
          <Link to="/tbl_ciri">Ciri Jenazaah</Link>
          <Link to="/message">Contact Doctor</Link>
          <div className="text-center  border rounded-md px-6 py-1">
            <button className="">Log Out</button>
          </div>
        </div>
      )}
    </>
  );
}

export default MainNavbar;
