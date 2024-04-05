// AdminNavbar.js
import { useState } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

function AdminNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="absolute z-10 bg-[rgb(0,34,89)] top-0 bottom-0 left-0 p-10 w-[300px] h-screen">
        <div className="container  flex flex-col items-start">
          <div className="">
            <img src={logo} alt="logo" />
          </div>
          <div className={`lg:flex ${isMenuOpen ? '' : 'hidden'} gap-4 text-white text-lg mt-8 flex-col`}>
            <Link to="/admin_dashboard">Dashboard</Link>
            <Link to="/admin_tbl_interval">Tabel Interval ETD</Link>
            <Link to="/admin_tbl_ciri">Tabel Ciri Jenazah</Link>
            <Link to="/admin_rule_base">Rule Base</Link>
            <Link to="/admin_tbl_user">Tabel User</Link>
            <Link to="/admin_tbl_message">Tabel message</Link>
            <Link to="/">Log Out</Link>
          </div>
          <button className="lg:hidden block mt-8" onClick={toggleMenu}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="lg:hidden fixed z-10 right-0 left-0 bg-[#002259] text-white text-lg flex flex-col items-right px-10 py-2">
         <Link to="/admin_dashboard">Dashboard</Link>
            <Link to="/admin_tbl_interval">Tabel Interval ETD</Link>
            <Link to="/admin_tbl_ciri">Tabel Ciri Jenazah</Link>
            <Link to="/admin_rule_base">Rule Base</Link>
            <Link to="/admin_rule_base">Table User</Link>
            <Link to="/admin_rule_message">Table Message</Link>
            <Link to="/">Log Out</Link>
        </div>
      )}
    </>
  );
}

export default AdminNavbar;
