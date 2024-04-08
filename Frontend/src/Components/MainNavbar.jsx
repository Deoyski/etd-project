import { useState } from "react";
import logo from "../assets/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";

function MainNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState('');
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    // Hapus token dan role dari localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    // Redirect ke halaman login
    navigate("/login");
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setIsMenuOpen(false); // Tutup menu setelah link diklik
  };

  useState(() => {
    setActiveLink(location.pathname);
  }, [location]);

  return (
    <>
      <div className="absolute z-10  bg-[#002259] top-0 right-0 left-0 p-5 h-[8vh] flex shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="">
            <img src={logo} alt="logo" />
          </div>
          <div
            className={`lg:flex ${
              isMenuOpen ? "" : "hidden"
            } gap-8 text-white text-lg items-center`}
          >
            <Link
              to="/"
              className={`${activeLink === '/' ? 'font-bold text-yellow-300' : 'hover:text-yellow-300'}`}
              onClick={() => handleLinkClick('/')}
            >
              Home
            </Link>
            <Link
              to="/tbl_history"
              className={`${activeLink === '/tbl_history' ? 'font-bold text-yellow-300' : 'hover:text-yellow-300'}`}
              onClick={() => handleLinkClick('/tbl_history')}
            >
              Test History
            </Link>
            <Link
              to="/tbl_interval"
              className={`${activeLink === '/tbl_interval' ? 'font-bold text-yellow-300' : 'hover:text-yellow-300'}`}
              onClick={() => handleLinkClick('/tbl_interval')}
            >
              ETD
            </Link>
            <Link
              to="/tbl_ciri"
              className={`${activeLink === '/tbl_ciri' ? 'font-bold text-yellow-300' : 'hover:text-yellow-300'}`}
              onClick={() => handleLinkClick('/tbl_ciri')}
            >
              Ciri Jenazah
            </Link>
            <Link
              to="/message"
              className={`${activeLink === '/message' ? 'font-bold text-yellow-300' : 'hover:text-yellow-300'}`}
              onClick={() => handleLinkClick('/message')}
            >
              Contact Doctor
            </Link>
            <div className="text-center border rounded-md px-6 py-1">
              <button
                className="hover:text-yellow-300"
                onClick={handleLogout}
              >
                Log Out
              </button>
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
          <Link to="/" onClick={() => handleLinkClick('/')}>Home</Link>
          <Link to="/tbl_history" onClick={() => handleLinkClick('/tbl_history')}>Test History</Link>
          <Link to="/tbl_interval" onClick={() => handleLinkClick('/tbl_interval')}>ETD</Link>
          <Link to="/tbl_ciri" onClick={() => handleLinkClick('/tbl_ciri')}>Ciri Jenazah</Link>
          <Link to="/message" onClick={() => handleLinkClick('/message')}>Contact Doctor</Link>
          <div className="text-center border rounded-md px-6 py-1">
            <button onClick={handleLogout}>Log Out</button>
          </div>
        </div>
      )}
    </>
  );
}

export default MainNavbar;
