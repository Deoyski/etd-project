import { useState } from "react";
import logo from "../assets/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";

function AdminNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const [logoutActive, setLogoutActive] = useState(false); // Tambahkan state untuk tombol Log Out
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    // Hapus token dan role dari localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    // Redirect ke halaman login
    navigate("/");
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setIsMenuOpen(false); // Tutup menu setelah link diklik
  };

  // Set activeLink berdasarkan lokasi saat ini
  useState(() => {
    setActiveLink(location.pathname);
  }, [location]);

  return (
    <>
      <div className="absolute z-10 bg-[rgb(0,34,89)] top-0 bottom-0 left-0 p-10 w-[270px] h-screen">
        <div className="container  flex flex-col items-start">
          <div className="">
            <img src={logo} alt="logo" />
          </div>
          <div
            className={`lg:flex ${
              isMenuOpen ? "" : "hidden"
            } gap-4 text-white text-lg mt-8 flex-col`}
          >
            <Link
              className={`${activeLink === '/admin_dashboard' ? 'font-bold text-yellow-300' : 'hover:text-yellow-300'}`}
              to="/admin_dashboard"
              onClick={() => handleLinkClick('/admin_dashboard')}
            >
              Dashboard
            </Link>
            <Link
              className={`${activeLink === '/admin_tbl_interval' ? 'font-bold text-yellow-300' : 'hover:text-yellow-300'}`}
              to="/admin_tbl_interval"
              onClick={() => handleLinkClick('/admin_tbl_interval')}
            >
              Tabel Interval ETD
            </Link>
            <Link
              className={`${activeLink === '/admin_tbl_ciri' ? 'font-bold text-yellow-300' : 'hover:text-yellow-300'}`}
              to="/admin_tbl_ciri"
              onClick={() => handleLinkClick('/admin_tbl_ciri')}
            >
              Tabel Ciri Jenazah
            </Link>
            <Link
              className={`${activeLink === '/admin_rule_base' ? 'font-bold text-yellow-300' : 'hover:text-yellow-300'}`}
              to="/admin_rule_base"
              onClick={() => handleLinkClick('/admin_rule_base')}
            >
              Tabel Rule Base
            </Link>
            <Link
              className={`${activeLink === '/admin_tbl_riwayat' ? 'font-bold text-yellow-300' : 'hover:text-yellow-300'}`}
              to="/admin_tbl_riwayat"
              onClick={() => handleLinkClick('/admin_tbl_riwayat')}
            >
              Tabel Riwayat Tes
            </Link>
            <Link
              className={`${activeLink === '/admin_tbl_message' ? 'font-bold text-yellow-300' : 'hover:text-yellow-300'}`}
              to="/admin_tbl_message"
              onClick={() => handleLinkClick('/admin_tbl_message')}
            >
              Tabel Message
            </Link>
            <Link
              className={`${activeLink === '/admin_tbl_user' ? 'font-bold text-yellow-300' : 'hover:text-yellow-300'}`}
              to="/admin_tbl_user"
              onClick={() => handleLinkClick('/admin_tbl_user')}
            >
              Tabel User
            </Link>
            <button
              className={`text-left ${logoutActive ? 'font-bold text-yellow-300' : 'hover:text-yellow-300'}`}
              onClick={() => { handleLogout(); setLogoutActive(true); }} // Set logoutActive ke true saat tombol diklik
              onMouseLeave={() => setLogoutActive(false)} // Set logoutActive kembali ke false saat mouse meninggalkan tombol
            >
              Log Out
            </button>
          </div>
          <button className="lg:hidden block mt-8" onClick={toggleMenu}>
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
                d="M4 6h16M4 1  2h16m-7 6h7"
              />
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
          <Link to="/admin_tbl_riwayat">Tabel Riwayat Tes</Link>
          <Link to="/admin_tbl_message">Tabel Message</Link>
          <Link to="/admin_tbl_user">Tabel User</Link>
          <button className="text-left" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      )}
    </>
  );
}

export default AdminNavbar;
