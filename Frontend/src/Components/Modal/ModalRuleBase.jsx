import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from 'prop-types'; // Import PropTypes

function ModalRuleBase({ closeModal, selectedData, fetchData, dataInterval, dataCiriJenazah }) {
  const [formData, setFormData] = useState({
    intervalId: selectedData ? selectedData.intervalId : "",
    ciriJenazahId: selectedData ? selectedData.ciriJenazahId : "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const apiUrl = selectedData
      ? `http://localhost:5000/rule-base/${selectedData.id}`
      : "http://localhost:5000/rule-base";

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
          toast.success(selectedData ? "Data updated successfully" : "Data added successfully");
        } else {
          console.error("Error");
          toast.error(selectedData ? "Failed to update data" : "Failed to add data");
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
        <div className="bg-white w-4/12 rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">
            {selectedData ? "Edit Data" : "Add Data"}
          </h2>
          <form onSubmit={handleSubmit}>
          <div className="mb-4">
          <label htmlFor="intervalId" className="block text-sm font-medium text-gray-700">
            Interval
          </label>
          <select
            id="intervalId"
            name="intervalId"
            value={formData.intervalId}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          >
            <option value="">Select Interval</option>
            {dataInterval.map((interval) => (
              <option key={interval.id} value={interval.id}>
                {interval.kode} : {interval.keterangan}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="ciriJenazahId" className="block text-sm font-medium text-gray-700">
            Ciri Jenazah
          </label>
          <select
            id="ciriJenazahId"
            name="ciriJenazahId"
            value={formData.ciriJenazahId}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          >
            <option value="">Select Ciri Jenazah</option>
            {dataCiriJenazah.map((ciriJenazah) => (
              <option key={ciriJenazah.id} value={ciriJenazah.id}>
                {ciriJenazah.kode} : {ciriJenazah.keterangan}
              </option>
            ))}
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
{selectedData ? "Save" : "Submit"}              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

ModalRuleBase.propTypes = {
  closeModal: PropTypes.func.isRequired,
  selectedData: PropTypes.object, // selectedData is optional
  fetchData: PropTypes.func.isRequired,
  dataInterval: PropTypes.array.isRequired, // dataInterval should be an array
  dataCiriJenazah: PropTypes.array.isRequired, // dataCiriJenazah should be an array
};

export default ModalRuleBase;
