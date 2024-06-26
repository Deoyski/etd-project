import AdminNavbar from "./AdminNavbar";
import { Table } from "flowbite-react";
import { useState } from "react";
import background from "../assets/background.png";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalUser from "./Modal/ModalUser";

function AdminUser() {
  // const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  // Fetch Data
  const fetchData = () => {
    fetch("http://localhost:5000/users")
      .then((response) => response.json())
      .then((data) => {
        // Filter out users with role "admin"
        const filteredData = data.filter((user) => user.role !== "master");
        setData(filteredData);
      })
      .catch((error) => console.error(error));
  };

  // Delete Data
  const handleDelete = (id) => {
    fetch(`http://localhost:5000/users/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          fetchData(); // Refetch data after successful deletion
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
          el.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
          el.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          el.role.toLowerCase().includes(searchQuery.toLowerCase()) 

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
    const headers = ["username", "email"];
    // Prepare data rows
    const rows = dataToRender.map((row) => [row.username, row.email]);

    // Combine header and data rows
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((row) => row.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "tbl_user.csv");
    document.body.appendChild(link);
    link.click();
  };

  const handleCloseModal = () => {
    setSelectedData(null);
    setShowModal(false);
  };

  const handleAdd = () => {
    setSelectedData(null);
    setShowModal(true);
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
                <div className="text-[#F3B320] pr-2">User</div>
              </div>
              <div className="flex items-center h-12 gap-3">
                <button
                  onClick={exportToCsv}
                  className="bg-[#F3B320] py-3 px-6 rounded-lg text-white"
                >
                  Export CSV
                </button>
                <button
                  onClick={handleAdd}
                  className="bg-[#F3B320] py-3 px-6 rounded-lg text-white"
                >
                  + Add Data
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
                <Table className="overflow-x-auto " striped hoverable>
                  <Table.Head className="text-md">
                    <Table.HeadCell className="w-1/12">No</Table.HeadCell>
                    <Table.HeadCell className="w-2/12">Username</Table.HeadCell>
                    <Table.HeadCell className="w-4/12">
                      Email
                    </Table.HeadCell>
                    <Table.HeadCell className="w-4/12">
                      Role
                    </Table.HeadCell>
                    <Table.HeadCell className="w-2/12">Delete</Table.HeadCell>
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
                          <Table.Cell className="py-3 w-3/12 whitespace-nowrap">
                            {a.username}
                          </Table.Cell>
                          <Table.Cell className="py-3 w-6/12 whitespace-nowrap">
                            {a.email}
                          </Table.Cell>
                          <Table.Cell className="py-3 w-6/12 whitespace-nowrap">
                            {a.role}
                          </Table.Cell>
                          
                          <Table.Cell className="py-3 w-1/12 whitespace-nowrap ">
                            <button
                              onClick={() => handleDelete(a.id)}
                              className=""
                            >
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
      {showModal && (
        <ModalUser
          closeModal={handleCloseModal}
          selectedData={selectedData}
          fetchData={fetchData}
        />
      )}
    </>
  );
}

export default AdminUser;
