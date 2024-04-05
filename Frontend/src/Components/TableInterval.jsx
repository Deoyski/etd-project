import { useEffect, useState } from "react";
import { Table } from "flowbite-react";
import MainNavbar from "./MainNavbar";
import background from "../assets/background.png";

function TableInterval() {
  const [data, setData] = useState([]);

  // Fetch Data
  useEffect(() => {
    fetch("http://localhost:5000/interval")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }, []);

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
          el.kode.toLowerCase().includes(searchQuery.toLowerCase()) ||
          el.keterangan.toLowerCase().includes(searchQuery.toLowerCase())
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
    const headers = ["Kode", "Keterangan"];
    // Prepare data rows
    const rows = dataToRender.map((row) => [row.kode, row.keterangan]);

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
                <div className="text-white pr-2">Table </div>
                <div className="text-[#F3B320]"> ETD</div>
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
            <div className="w-[80%] max-h-[75vh] bg-white lg:px-10 px-5 py-4 rounded-lg overflow-y-auto ">
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
                    <Table.HeadCell>Kode</Table.HeadCell>
                    <Table.HeadCell>Ciri Jenazah</Table.HeadCell>
                  </Table.Head>
                  <Table.Body className="divide-y">
                    {dataToRender
                      .slice(startIndex, endIndex)
                      .map((a, index) => (
                        <Table.Row
                          key={index}
                          className="bg-white dark:border-gray-700 dark:bg-gray-800"
                        >
                          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {(currentPage - 1) * itemsPerPage + index + 1}
                          </Table.Cell>
                          <Table.Cell>{a.kode}</Table.Cell>
                          <Table.Cell>{a.keterangan}</Table.Cell>
                        </Table.Row>
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

export default TableInterval;
