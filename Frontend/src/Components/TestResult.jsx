import MainNavbar from "./MainNavbar";
import background from "../assets/background.png";
import { useLocation } from "react-router-dom";

function TestResult() {
  const location = useLocation();
  const formData = location.state ? location.state.formData : null;
  const answers = location.state ? location.state.answers : [];
  const answerCodes = location.state ? location.state.answerCodes : [];

  // Log formData and answers to console
  console.log("formData:", formData);
  console.log("answers:", answers);
  console.log("answers codes:", answerCodes);
  return (
    <>
      <MainNavbar />
      <div className="relative h-screen flex justify-center items-center ">
        <div className="absolute inset-0 w-full h-full bg-cover bg-no-repeat">
          <img className="w-full h-full object-cover" src={background} alt="" />
        </div>
        <div className="container relative flex-col lg:w-[68%] w-[85%] h-[78%] flex justify-center">
          <div className=" bg-white flex-col h-full rounded-3xl items-center overflow-y-auto lg:px-16 px-10 shadow-xl">
            <div className="flex justify-between pt-16">
              <div className="text-5xl font-extrabold lg:flex   text-[#002259]">
                Test Result
              </div>
              <button className="bg-[#F3B320] text-white px-10 py-2 rounded-md">
                Cetak Pdf
              </button>
            </div>
            <div className="lg:flex pt-14">
              <div className="lg:w-4/12 flex flex-col justify-start gap-4">
                <div className="flex flex-col gap-1">
                  <p className="font-bold">Nomor Pemeriksaan</p>
                  <p className="text-gray-500">{formData.no_pemeriksaan}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-bold">Tanggal Jam Pemeriksaan</p>
                  <p className="text-gray-500">{formData.tgl_pemeriksaan}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-bold">Inisial Nama Jenazah</p>
                  <p className="text-gray-500">{formData.inisial_nama}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-bold">Jenis Kelamin</p>
                  <p className="text-gray-500">{formData.jenis_kelamin}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-bold">Perkiraan Umur</p>
                  <p className="text-gray-500">{formData.perkiraan_umur} tahun</p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-bold">Tanggal dan Jam Penemuan</p>
                  <p className="text-gray-500">{formData.tgl_penemuan}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-bold">Lokasi Penemuan</p>
                  <p className="text-gray-500">{formData.lokasi_penemuan}</p>
                </div>
              </div>
              <div className="lg:w-8/12 flex flex-col justify-start gap-4 lg:border-s-2 lg:border-black lg:pl-10">
                <div className="flex flex-col gap-1">
                  <p className="font-bold">Informasi Tambahan</p>
                  <p className="text-gray-500">{formData.informasi_tambahan}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-bold">
                  Ciri yang ditemukan pada Jenazah :
                  </p>
                  <ol className="text-gray-500 list-decimal pl-4">
                  {answers.map((answer, index) => (
                    <li key={index} className="text-gray-500">
                      {answer}
                    </li>
                  ))}
                  </ol>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-bold">Waktu Sejak Kematian</p>
                  <p className="text-gray-500">2-3 Jam</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center py-12 w-full">
              <button className="bg-[#F3B320] w-9/12 text-white py-3 px-4 rounded">
                Kembali ke Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TestResult;
