import MainNavbar from "./MainNavbar";
import background from "../assets/background.png";
import { Label, Select, TextInput } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CorpseData() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    no_pemeriksaan: "",
    tgl_pemeriksaan: "",
    inisial_nama: "",
    jenis_kelamin: "",
    perkiraan_umur: "",
    tgl_penemuan: "",
    lokasi_penemuan: "",
    informasi_tambahan: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if any  field is empty
    const requiredFields = ['no_pemeriksaan', 'tgl_pemeriksaan', 'inisial_nama', 'jenis_kelamin', 'perkiraan_umur', 'tgl_penemuan', 'lokasi_penemuan'];
    const emptyFields = requiredFields.filter(field => !formData[field]);

    if (emptyFields.length > 0) {
      // Display toast for empty fields
      toast.error(`Please fill in all 
      required fields: ${emptyFields.join(', ')}`);
      return; // Stop submission
    }

   // Proceed with form submission if all required fields are filled
    const dataToSend = {
      formData: formData
    };
    navigate("/question", { state: dataToSend }); // Use navigate instead of history.push
  };

  return (
    <>  
    <ToastContainer />
      <MainNavbar />
      <div className="relative h-screen flex justify-center items-center ">
        <div className="absolute inset-0 w-full h-full bg-cover bg-no-repeat">
          <img className="w-full h-full object-cover" src={background} alt="" />
        </div>
        <div className="container relative flex-col lg:w-[50%] w-[80%] h-[58%] flex justify-center">
          <div className=" bg-white flex-col h-full p-10 rounded-3xl lg:px-16 shadow-xl overflow-y-auto">
            <div className="text-5xl font-extrabold lg:flex   text-[#002259]">
              Corpse Data
            </div>
            <form
              className="flex-col flex justify-start gap-4 text-start pt-10 text-xl"
              onSubmit={handleSubmit}
            >
              <div className="lg:flex gap-10">
                <div className="lg:w-6/12">
                  <div className="pt-2">
                    <div className="mb-1 ">
                      <Label
                        htmlFor="no_pemeriksaan"
                        value="Nomor Pemeriksaan"
                      />
                    </div>
                    <TextInput
                      id="no_pemeriksaan"
                      type="text"
                      placeholder="Contoh: A-123XXXXXXXX"
                      value={formData.no_pemeriksaan}
                      onChange={handleChange}
                      required
                      shadow
                    />
                  </div>
                  <div className="pt-2">
                    <div className="mb-1 block">
                      <Label
                        htmlFor="tgl_pemeriksaan"
                        value="Tanggal dan Jam Pemeriksaan"
                      />
                    </div>
                    <TextInput
                      id="tgl_pemeriksaan"
                      type="datetime-local"
                      placeholder="Masukkan Tanggal Jam Pemeriksaan"
                      value={formData.tgl_pemeriksaan}
                      onChange={handleChange}
                      required
                      shadow
                    />
                  </div>
                  <div className="pt-2">
                    <div className="mb-1 block">
                      <Label
                        htmlFor="inisial_nama"
                        value="Inisial Nama Jenazah"
                      />
                    </div>
                    <TextInput
                      id="inisial_nama"
                      type="text"
                      placeholder="Masukkan Inisial Nama Jenazah"
                      value={formData.inisial_nama}
                      onChange={handleChange}
                      required
                      shadow
                    />
                  </div>
                  <div className="pt-2">
                    <div className="mb-1 block">
                      <Label htmlFor="jenis_kelamin" value="Jenis Kelamin" />
                    </div>
                    <Select
                      id="jenis_kelamin"
                      onChange={handleChange}
                      value={formData.jenis_kelamin}
                      className="block w-full  rounded-md"
                  
                    >
                      <option value="">Pilih Jenis Kelamin</option>
                      <option value="Laki-laki">Laki-laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </Select>
                  </div>
                </div>
                <div className="lg:w-6/12">
                  <div className="pt-2">
                    <div className="mb-1 ">
                      <Label htmlFor="perkiraan_umur" value="Perkiraan Umur" />
                    </div>
                    <TextInput
                      id="perkiraan_umur"
                      type="number"
                      placeholder="Masukkan Perkiraan Umur"
                      onChange={handleChange}
                      value={formData.perkiraan_umur}
                      shadow
                    />
                  </div>
                  <div className="pt-2">
                    <div className="mb-1 block">
                      <Label
                        htmlFor="tgl_penemuan"
                        value="Tanggal dan Jam Penemuan"
                      />
                    </div>
                    <TextInput
                      id="tgl_penemuan"
                      type="datetime-local"
                      placeholder="Masukkan Tanggal dan Jam Penemuan"
                      value={formData.tgl_penemuan}
                      onChange={handleChange}
                      shadow
                    />
                  </div>
                  <div className="pt-2">
                    <div className="mb-1 block">
                      <Label
                        htmlFor="lokasi_penemuan"
                        value="Lokasi Penemuan"
                      />
                    </div>
                    <TextInput
                      id="lokasi_penemuan"
                      type="text"
                      placeholder="Masukkan Lokasi Penemuan"
                      value={formData.lokasi_penemuan}
                      onChange={handleChange}
                      shadow
                    />
                  </div>
                  <div className="pt-2">
                    <div className="mb-1 block">
                      <Label
                        htmlFor="informasi_tambahan"
                        value="Informasi Tambahan"
                      />
                    </div>
                    <TextInput
                      id="informasi_tambahan"
                      type="text"
                      placeholder="Masukkan Informasi Tamabahan"
                      value={formData.informasi_tambahan}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
               <div className="flex justify-end">
                  <button
                    className="bg-[#F3B320] rounded-md hover:bg-[#002259] text-white mt-6 lg:px-12 px-7 py-2"
                    type="submit"
                  >
                    Next
                  </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CorpseData;
