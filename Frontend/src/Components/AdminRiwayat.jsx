import AdminNavbar from "./AdminNavbar";
import { Table } from "flowbite-react";
import React, { Fragment, useState } from "react";
import background from "../assets/background.png";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminRiwayat() {
  // const dispatch = useDispatch();
  const [data, setDataHistory] = useState([]);
  const [dataUser, setDataUser] = useState([]);
  const [userDataMap, setUserDataMap] = useState({});

  // Tambahkan state lokal untuk melacak status toggle
  const [toggleStatus, setToggleStatus] = useState({});

  // Fungsi untuk mengubah status toggle
  const toggleRow = (index) => {
    setToggleStatus((prevStatus) => ({
      ...prevStatus,
      [index]: !prevStatus[index],
    }));
  };

  useEffect(() => {
    getUser();
    getHistory();
    getUserById();
  }, []);

  // Fetch Data
   const getUser = () => {
    fetch("http://localhost:5000/users")
      .then((response) => response.json())
      .then((data) => {
        setDataUser(data);
        // Buat peta data pengguna untuk pencocokan ID dengan nama pengguna
        const userMap = {};
        data.forEach((user) => {
          userMap[user.id] = user.username;
        });
        setUserDataMap(userMap);
      })
      .catch((error) => console.error(error));
  };

  const getUserById = (userId) => {
    return userDataMap[userId] || ""; // Mengembalikan string kosong jika tidak ada data pengguna
  };

  const getHistory = () => {
    fetch("http://localhost:5000/history")
      .then((response) => response.json())
      .then((data) => setDataHistory(data))
      .catch((error) => console.error(error));
  };

 // Delete Data
  const handleDelete = (id) => {
    fetch(`http://localhost:5000/history/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          getHistory(); // Refetch data after successful deletion
          toast.success("Data deleted successfully");
        } else {
          console.error("Failed to delete data");
          toast.error("Failed to delete data");
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to delete data");
      });
  };

  // Search
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when search query changes
  };

  // Filtered data based on search query
  const filteredData = data
    ? data.filter(
        (el) =>
        el.no_pemeriksaan.toLowerCase().includes(searchQuery.toLowerCase()) ||
        el.inisial_nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
        el.jenis_kelamin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        el.informasi_tambahan
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        el.ciri_jenazah.toLowerCase().includes(searchQuery.toLowerCase()) ||
        el.waktu_kematian.toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(el.tgl_pemeriksaan)
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        String(el.perkiraan_umur)
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        String(el.tgl_penemuan)
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        el.lokasi_penemuan.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Data to render in the table
  const dataToRender = searchQuery ? filteredData : data;

  // Pagination
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Pagination controls
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  // Calculate start and end index for displaying items
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

   // Export CSV
   const exportToCsv = () => {
    // Prepare header row
    const headers = [
      "Nomor Pemeriksaan",
      "Inisial Nama",
      "Jenis Kelamin",
      "Tanggal dan Jam Pemeriksaan",
      "Tanggal dan Jam Penemuan",
      "Perkiraan Umur",
      "Lokasi Penemuan",
      "Informasi Tambahan",
      "Waktu Kematian",
      "Ciri Jenazah",
    ];
    // Prepare data rows
    const rows = dataToRender.map((row) => [
      row.no_pemeriksaan,
      row.inisial_nama,
      row.jenis_kelamin,
      row.tgl_pemeriksaan,
      row.tgl_penemuan,
      row.perkiraan_umur,
      row.lokasi_penemuan,
      row.informasi_tambahan,
      row.waktu_kematian,
      row.ciri_jenazah,
    ]);

    // Combine header and data rows
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((row) => row.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "riwayat_test_data.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <>
      <ToastContainer />
      <AdminNavbar />
      <div className="ps-[270px] flex justify-center items-center">
        <div className="absolute inset-0 w-full h-full bg-cover bg-no-repeat">
          <img className="w-full h-full object-cover" src={background} alt="" />
        </div>
        <div className="container relative flex-col justify-center w-screen pt-10">
          <div className="flex justify-center">
            <div className="w-[90%] flex justify-between items-center">
              <div className="lg:text-5xl text-4xl font-extrabold lg:flex justify-left text-left py-6">
                <div className="text-white pr-2">Tabel</div>
                <div className="text-[#F3B320] pr-2">Riwayat Tes</div>
              </div>
              <div className="flex items-center h-12 gap-3">
                <button
                  onClick={exportToCsv}
                  className="bg-[#F3B320] py-3 px-6 rounded-lg text-white"
                >
                  Export CSV
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-[90%] max-h-[80vh] bg-white lg:px-10 px-5 py-4 rounded-lg overflow-y-auto ">
              <div className="flex justify-between py-2 bg-white">
                <div className="flex items-center">
                  <p className="pe-4">Show</p>
                  <select
                    className="bg-[#EDEDED] rounded-sm border-none"
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                  </select>
                  <p className="px-4">entries</p>
                </div>
                <div className="flex items-center">
                  <p className="pe-4">Search: </p>
                  <input
                    className="bg-[#EDEDED] rounded-sm border-none"
                    type="text"
                    value={searchQuery}
                    onChange={handleSearch}
                  />
                </div>
              </div>
              <div className="py-4 w-full">
              <Table className="w-full" striped>
                  <Table.Head>
                    <Table.HeadCell>No</Table.HeadCell>
                    <Table.HeadCell>Username Pengguna</Table.HeadCell>
                    <Table.HeadCell>No Pemeriksaan</Table.HeadCell>
                    <Table.HeadCell>Inisial Nama</Table.HeadCell>
                    <Table.HeadCell>Jenis Kelamin</Table.HeadCell>
                    <Table.HeadCell>Tanggal dan Jam Pemeriksaan</Table.HeadCell>
                    <Table.HeadCell>Tanggal dan Jam Penemuan</Table.HeadCell>
                    <Table.HeadCell>Perkiraan Umur</Table.HeadCell>
                    <Table.HeadCell>Lokasi Penemuan</Table.HeadCell>
                    <Table.HeadCell>Informasi Tambahan</Table.HeadCell>
                    <Table.HeadCell>Ciri Jenazah</Table.HeadCell>
                    <Table.HeadCell>Delete</Table.HeadCell>
                  </Table.Head>
                  <Table.Body className="divide-y">
                    {dataToRender
                      .slice(startIndex, endIndex)
                      .map((a, index) => (
                        <React.Fragment key={index}>
                          <Table.Row
                            key={index}
                            className="bg-white dark:border-gray-700 dark:bg-gray-800"
                          >
                            {/* ...baris tabel lainnya */}
                            {/* Tambahkan toggle di baris tabel */}
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                              {(currentPage - 1) * itemsPerPage + index + 1}
                            </Table.Cell>
                            <Table.Cell>{getUserById(a.userId)}</Table.Cell>
                            <Table.Cell>{a.no_pemeriksaan}</Table.Cell>
                            <Table.Cell>{a.inisial_nama}</Table.Cell>
                            <Table.Cell>{a.jenis_kelamin}</Table.Cell>
                            <Table.Cell>
                              {formatDate(a.tgl_pemeriksaan)}
                            </Table.Cell>
                            <Table.Cell>
                              {formatDate(a.tgl_penemuan)}
                            </Table.Cell>
                            <Table.Cell>{a.perkiraan_umur} tahun</Table.Cell>
                            <Table.Cell>{a.lokasi_penemuan}</Table.Cell>
                            <Table.Cell>{a.informasi_tambahan}</Table.Cell>
                            <Table.Cell>
                              {/* Tambahkan button untuk toggle */}
                              <button
                                className="underline"
                                onClick={() => toggleRow(index)}
                              >
                                {toggleStatus[index] ? "Hide" : "Show"}
                              </button>
                            </Table.Cell>
                            <Table.Cell className="py-3 w-1/12 whitespace-nowrap ">
                              <button onClick={() => handleDelete(a.id)}>
                                <svg
                                  className="w-6 h-6 text-gray-800 dark:text-white"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </button>
                            </Table.Cell>
                          </Table.Row>
                          {/* Tampilkan detail ciri jenazah jika toggle aktif */}
                          {toggleStatus[index] && (
                            <Table.Row>
                              <Table.Cell colSpan="12">
                                <div className="pb-2 font-bold">
                                  Ciri Jenazah :{" "}
                                </div>
                                {/* Tampilkan detail ciri jenazah di sini */}
                                {a.ciri_jenazah
                                  .slice(1, -1)
                                  .split(",")
                                  .map((item, index) => (
                                    <div key={index}>{item.trim()}</div>
                                  ))}
                                <div className="my-2 pt-2 font-bold border-t-2">
                                  Waktu Kematian : {a.waktu_kematian}
                                </div>
                              </Table.Cell>
                            </Table.Row>
                          )}
                        </React.Fragment>
                      ))}
                  </Table.Body>
                  
                </Table>
              </div>

              <div className="flex justify-between gap-4 py-2">
                <div className="py-2">
                  Showing <b>{startIndex + 1}</b> to {endIndex} of {totalItems}{" "}
                  entries
                </div>
                <div className="flex gap-3">
                  <button
                    className="bg-[#EDEDED] py-2 px-4 rounded-sm"
                    onClick={prevPage}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  <span className="py-2">
                    <b>{currentPage}</b> of {totalPages}
                  </span>
                  <button
                    className="bg-[#EDEDED] py-2 px-4 rounded-sm"
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    const formattedDate = date.toLocaleDateString("id-ID", options);
    return formattedDate.replace("pukul", ",");
  }

export default AdminRiwayat;
