import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ModalUser({ closeModal, selectedData, fetchData }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
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

  const handleRoleChange = (e) => {
    console.log(e);
    setFormData({
      ...formData,
      role: e.target.value,
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(selectedData);
    const apiUrl = selectedData
      ? `http://localhost:5000/users/${selectedData.id}`
      : "http://localhost:5000/users";

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
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
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
                Email
              </label>
              <input
                type="email"
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
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700"
              >
                Role
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleRoleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
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

export default ModalUser;
