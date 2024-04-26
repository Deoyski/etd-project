import AdminNavbar from "./AdminNavbar";
import { useEffect, useState } from "react";
import background from "../assets/background.png";
import { Link } from "react-router-dom";

function AdminDashboard() {
  const [dataHistory, setDataHistory] = useState([]);
  const [dataCiriJenazah, setDataCiriJenazah] = useState([]);
  const [dataInterval, setDataInterval] = useState([]);
  const [dataUser, setData] = useState([]);
  const [dataRuleBase, setDataRuleBase] = useState([]);
  const [dataMessage, setDataMessage] = useState([]);

  useEffect(() => {
    getCiriJenazah();
    getInterval();
    getRuleBase();
    getHistory();
    getUser();
    getMessage();
  }, []);

  const getCiriJenazah = () => {
    fetch("http://localhost:5000/ciri-jenazah")
      .then((response) => response.json())
      .then((data) => setDataCiriJenazah(data))
      .catch((error) => console.error(error));
  };

  const getInterval = () => {
    fetch("http://localhost:5000/interval")
      .then((response) => response.json())
      .then((data) => setDataInterval(data))
      .catch((error) => console.error(error));
  };

  const getUser = () => {
    fetch("http://localhost:5000/users")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  };

  const getRuleBase = () => {
    fetch("http://localhost:5000/rule-base")
      .then((response) => response.json())
      .then((data) => setDataRuleBase(data))
      .catch((error) => console.error(error));
  };

  const getHistory = () => {
    fetch("http://localhost:5000/history")
      .then((response) => response.json())
      .then((data) => setDataHistory(data))
      .catch((error) => console.error(error));
  };

  const getMessage = () => {
    fetch("http://localhost:5000/message")
      .then((response) => response.json())
      .then((data) => setDataMessage(data))
      .catch((error) => console.error(error));
  };

  return (
    <>
      <AdminNavbar />
      <div className="ps-[270px] flex justify-center items-center">
        <div className="absolute inset-0 w-full h-full bg-cover bg-no-repeat">
          <img className="w-full h-full object-cover" src={background} alt="" />
        </div>
        <div className="container relative flex-col justify-center w-screen pt-6">
          <div className="flex justify-center pb-20 pt-10">
            <div className="w-[90%] flex-col">
              <div className="lg:text-5xl text-4xl font-extrabold pb-6 text-[#F3B320] pr-2">
                Dashboard
              </div>
              <div className="h-[18vh] flex justify-center gap-6 pb-2">
              <Link
                  to="/admin_rule_base"
                  className="w-4/12 hover:bg-[#fffff] bg-white rounded-lg hover:bg-[#F3B320] hover:text-white flex justify-center items-center lg:ps-10 ps-4"
                >
                  <div className="w-2/6">
                    <svg
                      className="w-full h-16 text-[#002259] dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.5 2c-.178 0-.356.013-.492.022l-.074.005a1 1 0 0 0-.934.998V11a1 1 0 0 0 1 1h7.975a1 1 0 0 0 .998-.934l.005-.074A7.04 7.04 0 0 0 22 10.5 8.5 8.5 0 0 0 13.5 2Z" />
                      <path d="M11 6.025a1 1 0 0 0-1.065-.998 8.5 8.5 0 1 0 9.038 9.039A1 1 0 0 0 17.975 13H11V6.025Z" />
                    </svg>
                  </div>
                  <div className="w-4/6 flex-col">
                    <div className=" flex-col">
                      <div className="text-[#002259] text-4xl font-bold">
                        {dataRuleBase.length !== null
                          ? dataRuleBase.length
                          : 0}
                      </div>

                      <div className="text-[#002259] text-lg">
                        Total Rule Base
                      </div>
                    </div>
                  </div>
                </Link>
                <Link
                  to="/admin_rule_base"
                  className="w-4/12 hover:bg-[#fffff] bg-white rounded-lg hover:bg-[#F3B320] hover:text-white flex justify-center items-center lg:ps-10 ps-4"
                >
                  <div className="w-2/6">
                    <svg
                      className="w-full h-16 text-[#002259] dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.5 2c-.178 0-.356.013-.492.022l-.074.005a1 1 0 0 0-.934.998V11a1 1 0 0 0 1 1h7.975a1 1 0 0 0 .998-.934l.005-.074A7.04 7.04 0 0 0 22 10.5 8.5 8.5 0 0 0 13.5 2Z" />
                      <path d="M11 6.025a1 1 0 0 0-1.065-.998 8.5 8.5 0 1 0 9.038 9.039A1 1 0 0 0 17.975 13H11V6.025Z" />
                    </svg>
                  </div>
                  <div className="w-4/6 lg:flex-col">
                    <div className=" flex-col">
                      <div className="text-[#002259] text-4xl font-bold">
                        {dataInterval.length !== null ? dataInterval.length : 0}
                      </div>
                      <div className="text-[#002259] text-lg">
                        Total Rule Base
                      </div>
                    </div>
                  </div>
                </Link>
                <Link
                  to="/admin_tbl_ciri"
                  className="w-4/12 hover:bg-[#fffff] bg-white rounded-lg hover:bg-[#F3B320] hover:text-white flex justify-center items-center lg:ps-10 ps-4"
                >
                  <div className="w-2/6">
                    <svg
                      className="w-full h-16 text-[#002259] dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.5 2c-.178 0-.356.013-.492.022l-.074.005a1 1 0 0 0-.934.998V11a1 1 0 0 0 1 1h7.975a1 1 0 0 0 .998-.934l.005-.074A7.04 7.04 0 0 0 22 10.5 8.5 8.5 0 0 0 13.5 2Z" />
                      <path d="M11 6.025a1 1 0 0 0-1.065-.998 8.5 8.5 0 1 0 9.038 9.039A1 1 0 0 0 17.975 13H11V6.025Z" />
                    </svg>
                  </div>
                  <div className="w-4/6 flex-col">
                    <div className=" flex-col">
                      <div className="text-[#002259] text-4xl font-bold">
                        {dataCiriJenazah.length !== null
                          ? dataCiriJenazah.length
                          : 0}
                      </div>

                      <div className="text-[#002259] text-lg">
                        Total Ciri Jenazah
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
              <div className="h-[18vh] flex justify-center gap-6 pt-2">
                <Link
                  to="/admin_tbl_riwayat"
                  className="w-4/12 hover:bg-[#fffff] bg-white rounded-lg hover:bg-[#F3B320] hover:text-white flex justify-center items-center lg:ps-10 ps-4"
                >
                  <div className="w-2/6 ">
                    <svg
                      className="w-full h-16 text-[#002259] dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.5 2c-.178 0-.356.013-.492.022l-.074.005a1 1 0 0 0-.934.998V11a1 1 0 0 0 1 1h7.975a1 1 0 0 0 .998-.934l.005-.074A7.04 7.04 0 0 0 22 10.5 8.5 8.5 0 0 0 13.5 2Z" />
                      <path d="M11 6.025a1 1 0 0 0-1.065-.998 8.5 8.5 0 1 0 9.038 9.039A1 1 0 0 0 17.975 13H11V6.025Z" />
                    </svg>
                  </div>
                  <div className="w-4/6 flex-col">
                    <div className=" flex-col">
                      <div className="text-[#002259] text-4xl font-bold">
                        {dataHistory.length !== null ? dataHistory.length : 0}
                      </div>
                      <div className="text-[#002259] text-lg">
                        Total Riwayat Tes
                      </div>
                    </div>
                  </div>
                </Link>
                <Link
                  to="/admin_tbl_message"
                  className="w-4/12 hover:bg-[#fffff] bg-white rounded-lg hover:bg-[#F3B320] hover:text-white flex justify-center items-center lg:ps-10 ps-4"
                >
                  <div className="w-2/6">
                    <svg
                      className="w-full h-16 text-[#002259] dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.5 2c-.178 0-.356.013-.492.022l-.074.005a1 1 0 0 0-.934.998V11a1 1 0 0 0 1 1h7.975a1 1 0 0 0 .998-.934l.005-.074A7.04 7.04 0 0 0 22 10.5 8.5 8.5 0 0 0 13.5 2Z" />
                      <path d="M11 6.025a1 1 0 0 0-1.065-.998 8.5 8.5 0 1 0 9.038 9.039A1 1 0 0 0 17.975 13H11V6.025Z" />
                    </svg>
                  </div>
                  <div className="w-4/6 lg:flex-col">
                    <div className=" flex-col">
                      <div className="text-[#002259] text-4xl font-bold">
                        {dataMessage.length !== null ? dataMessage.length : 0}
                      </div>
                      <div className="text-[#002259] text-lg">
                        Total Message
                      </div>
                    </div>
                  </div>
                </Link>
                <Link
                  to="/admin_tbl_user"
                  className="w-4/12 hover:bg-[#fffff] bg-white rounded-lg hover:bg-[#F3B320] hover:text-white flex justify-center items-center lg:ps-10 ps-4"
                >
                  <div className="w-2/6">
                    <svg
                      className="w-full h-16 text-[#002259] dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M13.5 2c-.178 0-.356.013-.492.022l-.074.005a1 1 0 0 0-.934.998V11a1 1 0 0 0 1 1h7.975a1 1 0 0 0 .998-.934l.005-.074A7.04 7.04 0 0 0 22 10.5 8.5 8.5 0 0 0 13.5 2Z" />
                      <path d="M11 6.025a1 1 0 0 0-1.065-.998 8.5 8.5 0 1 0 9.038 9.039A1 1 0 0 0 17.975 13H11V6.025Z" />
                    </svg>
                  </div>
                  <div className="w-4/6 flex-col">
                    <div className=" flex-col">
                      <div className="text-[#002259] text-4xl font-bold">
                        {dataUser.length !== null ? dataUser.length : 0}
                      </div>

                      <div className="text-[#002259] text-lg">Total User</div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
