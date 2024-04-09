import React, { Fragment, useEffect, useState } from "react";
import { Table } from "flowbite-react";
import MainNavbar from "./MainNavbar";
import background from "../assets/background.png";

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

function TableHistory() {
    const [data, setData] = useState([]);
    const userId2 = localStorage.getItem('id');
    
    // Fetch Data
    useEffect(() => {
      fetch("http://localhost:5000/history")
        .then((response) => response.json())
        .then((data) => {
          // Filter data by userId
          console.log("data berhasil", data);
          const filteredData = data.filter((a) => a.userId === parseInt(userId2));
          console.log("ini data yang diambil",filteredData);
          setData(filteredData);
        })
        .catch((error) => console.error(error));
    }, [userId2]);

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

  // Tambahkan state lokal untuk melacak status toggle
  const [toggleStatus, setToggleStatus] = useState({});

  // Fungsi untuk mengubah status toggle
  const toggleRow = (index) => {
    setToggleStatus((prevStatus) => ({
      ...prevStatus,
      [index]: !prevStatus[index],
    }));
  };

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
      "Tanggal dan Jam Pemeriksaan",
      "Jenis Kelamin",
      "Perkiraan Umur",
      "Tanggal dan Jam Penemuan",
      "Lokasi Penemuan",
      "Informasi Tambahan",
      "Ciri Jenazah",
      "Waktu Kematian",
    ];
    // Prepare data rows
    const rows = dataToRender.map((row) => [
      row.no_pemeriksaan,
      row.inisial_nama,
      row.tgl_pemeriksaan,
      row.jenis_kelamin,
      row.perkiraan_umur,
      row.tgl_penemuan,
      row.lokasi_penemuan,
      row.informasi_tambahan,
      row.ciri_jenazah,
      row.waktu_kematian,
    ]);

    // Combine header and data rows
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((row) => row.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "interval_waktu_saat_kematian_data.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <>
      <MainNavbar />
      <div className="pt-20 flex justify-center items-center">
        <div className="absolute inset-0 w-full h-full bg-cover bg-no-repeat">
          <img className="w-full h-full object-cover" src={background} alt="" />
        </div>
        <div className="container relative flex-col justify-center w-screen pt-10">
          <div className="flex justify-center">
            <div className="w-[80%] flex justify-between items-center">
              <div className="lg:text-5xl text-4xl font-extrabold lg:flex justify-left text-left py-4">
                <div className="text-white pr-2">Test</div>
                <div className="text-[#F3B320]"> History</div>
              </div>
              <div className="flex items-center h-12">
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
            <div className="w-[90%] max-h-[75vh] bg-white lg:px-10 px-5 py-4 rounded-lg overflow-y-auto ">
              <div className="flex justify-between py-3 bg-white">
                <div className="flex items-center">
                  <p className="pe-4">Show</p>
                  <select
                    className="bg-[#EDEDED] rounded-sm border-none"
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
                  >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
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
              <div className="py-4">
                <Table className="w-full" striped>
                  <Table.Head>
                    <Table.HeadCell>No</Table.HeadCell>
                    <Table.HeadCell>No Pemeriksaan</Table.HeadCell>
                    <Table.HeadCell>Inisial Nama</Table.HeadCell>
                    <Table.HeadCell>Jenis Kelamin</Table.HeadCell>
                    <Table.HeadCell>Tanggal dan Jam Pemeriksaan</Table.HeadCell>
                    <Table.HeadCell>Tanggal dan Jam Penemuan</Table.HeadCell>
                    <Table.HeadCell>Pesrkiraan Umur</Table.HeadCell>
                    <Table.HeadCell>Lokasi Penemuan</Table.HeadCell>
                    <Table.HeadCell>Informasi Tambahan</Table.HeadCell>
                    <Table.HeadCell>Ciri Jenazah</Table.HeadCell>
                    <Table.HeadCell>Waktu Kematian</Table.HeadCell>
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
                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {(currentPage - 1) * itemsPerPage + index + 1}
                          </Table.Cell>
                          <Table.Cell>{a.no_pemeriksaan}</Table.Cell>
                          <Table.Cell>{a.inisial_nama}</Table.Cell>
                          <Table.Cell>{a.jenis_kelamin}</Table.Cell>
                          <Table.Cell>
                            {formatDate(a.tgl_pemeriksaan)}
                          </Table.Cell>
                          <Table.Cell>{formatDate(a.tgl_penemuan)}</Table.Cell>
                          <Table.Cell>{a.perkiraan_umur} tahun</Table.Cell>
                          <Table.Cell>{a.lokasi_penemuan}</Table.Cell>
                          <Table.Cell>{a.informasi_tambahan}</Table.Cell>
                          <Table.Cell>
                            {/* Tambahkan button untuk toggle */}
                            <button
                              className="underline"
                              onClick={() => toggleRow(index)}
                            >
                              {toggleStatus[index] ? "Sembunyikan" : "Lihat"}
                            </button>
                          </Table.Cell>
                          <Table.Cell>{a.waktu_kematian}</Table.Cell>
                        </Table.Row>
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
                              </Table.Cell>
                            </Table.Row>
                          )}
                          </React.Fragment>
                      ))}
                  </Table.Body>
                </Table>
              </div>

              <div className="flex justify-between gap-4 py-3">
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

export default TableHistory;
