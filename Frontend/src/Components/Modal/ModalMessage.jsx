import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ModalMessage({ closeModal, selectedData, fetchData }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    desc: "",
  });

  useEffect(() => {
    if (selectedData) {
      setFormData(selectedData);
    }
  }, [selectedData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const apiUrl = selectedData
      ? `http://localhost:5000/message/${selectedData.id}`
      : "http://localhost:5000/message";

    fetch(apiUrl, {
      method: selectedData ? "PATCH" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          closeModal();
          fetchData();
          toast.success(
            selectedData
              ? "Data updated successfully"
              : "Data added successfully"
          );
        } else {
          console.error("Error");
          toast.error(
            selectedData
              ? "Failed to update data"
              : "Failed to add data"
          );
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Error");
      });
  };

  return (
    <>

      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg p-8">
          <h2 className="text-2xl mb-4">
            {selectedData ? "Edit Data" : "Add Data"}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                phone
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="desc"
                className="block text-sm font-medium text-gray-700"
              >
                desc
              </label>
              <input
                type="text"
                id="desc"
                name="desc"
                value={formData.desc}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={closeModal}
                className="mr-2 py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="py-2 px-4 bg-[#f3b420] text-white hover:bg-[#002259] rounded-md"
              >
                {selectedData ? "Save" : "Submit"}{" "}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ModalMessage;
