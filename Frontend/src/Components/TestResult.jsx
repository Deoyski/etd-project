import MainNavbar from "./MainNavbar";
import background from "../assets/background.png";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactToPrint from "react-to-print";

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false, 
    timeZone: "Asia/Jakarta"
  };
  const formattedDate = date.toLocaleString("id-ID", options);
  return formattedDate.replace("pukul", ",");
}
function TestResult() {
  const location = useLocation();
  const userId = localStorage.getItem("id");
  const username = localStorage.getItem("username");
  const formData = location.state ? location.state.formData : null;
  const answers = location.state ? location.state.answers : [];
  // const answerP = location.state ? location.state.answerP : [];
  const answerCodes = location.state ? location.state.answerCodes.slice() : [];
  const index = answerCodes.indexOf(46);
  if (index !== -1) {
    answerCodes.splice(index, 1);
  }
  const [data, setDataRuleBase] = useState([]);
  const [timeOfDeath, setTimeOfDeath] = useState(null);
  const [dataFetched, setDataFetched] = useState(false);
  let componentRef = useRef();

  useEffect(() => {
    if (!dataFetched) {
      // Cek apakah data telah diambil sebelumnya
      fetchData(); // Panggil fungsi untuk mengambil data jika belum diambil
    }
  }, [dataFetched]);

  const fetchData = () => {
    fetch("http://localhost:5000/rule-base")
      .then((response) => response.json())
      .then((data) => {
        setDataRuleBase(data);
        const matchedIntervalIds = determineIntervalId(data, answerCodes);
          fetchIntervalData(matchedIntervalIds);
        setDataFetched(true); // Setel state dataFetched menjadi true setelah berhasil mengambil data
      })
      .catch((error) => console.error(error));
  };

  const determineIntervalId = (ruleBaseData, answerCodes) => {
    // Buat objek untuk menyimpan jumlah kemunculan cirijenazahId untuk setiap intervalId
    const intervalCount = {};

    // Inisialisasi set answerCodes untuk memudahkan pencarian
    const matchedCiriJenazahIds = new Set(answerCodes);
    console.log("Data yang match:", matchedCiriJenazahIds);

    // Iterasi setiap item pada data rule base
    ruleBaseData.forEach((item) => {
      const intervalId = item.intervalId;
      const ciriJenazahId = item.ciriJenazahId;

      console.log("Iterasi:", item);

      // Tambahkan intervalId ke intervalCount jika belum ada
      if (!intervalCount[intervalId]) {
        intervalCount[intervalId] = new Set();
      }

      // Tambahkan ciriJenazahId ke set pada intervalId
      intervalCount[intervalId].add(ciriJenazahId);
      console.log("Interval Count setelah penambahan:", intervalCount);
    });

    // Temukan intervalId yang memiliki semua cirijenazah yang cocok dengan answerCodes
    let matchedIntervalId = null;

    for (const [intervalId, ciriJenazahSet] of Object.entries(intervalCount)) {
      let isMatched = true;

      // Periksa apakah semua ciri jenazah pada intervalId cocok dengan answerCodes
      for (const ciriJenazahId of ciriJenazahSet) {
        if (!matchedCiriJenazahIds.has(ciriJenazahId)) {
          // Jika ada ciri jenazah pada intervalId yang tidak cocok, set isMatched menjadi false
          isMatched = false;
          break;
        }
      }

      if (isMatched) {
        console.log("Semua cirijenazah ditemukan pada intervalId:", intervalId);
        // Jika semua ciri jenazah pada intervalId cocok dengan answerCodes, set matchedIntervalId dan keluar dari loop
        matchedIntervalId = intervalId;
        break;
      }
    }

    console.log("Interval ID yang cocok:", matchedIntervalId);
    return matchedIntervalId;
  };

  const fetchIntervalData = (matchedIntervalId) => {
    console.log("data yang masuk" , matchedIntervalId);
    fetch(`http://localhost:5000/interval/${matchedIntervalId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("ini data interval", data);
        const mostFrequentTimeOfDeath = data.keterangan;
        // Check if timeOfDeath is already set
        if (timeOfDeath === null) {
          setTimeOfDeath(mostFrequentTimeOfDeath);
        }
      })
      .catch((error) => {
        console.error(error);
        // If there's an error, set timeOfDeath to default value
        setTimeOfDeath("Waktu saat kematian belum dapat ditentukan");
      });
  };

  const handleSaveResult = () => {
    // Lakukan permintaan POST ke endpoint backend
    fetch("http://localhost:5000/history", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        no_pemeriksaan: formData.no_pemeriksaan,
        inisial_nama: formData.inisial_nama,
        tgl_pemeriksaan: formData.tgl_pemeriksaan,
        jenis_kelamin: formData.jenis_kelamin,
        perkiraan_umur: formData.perkiraan_umur,
        tgl_penemuan: formData.tgl_penemuan,
        lokasi_penemuan: formData.lokasi_penemuan,
        informasi_tambahan: formData.informasi_tambahan,
        ciri_jenazah: answers,
        waktu_kematian: timeOfDeath,
      }),
    })
      .then((response) => {
        if (response.ok) {
          // Berhasil disimpan, tambahkan penanganan sesuai kebutuhan Anda
          console.log("Data successful saved");
          toast.success("Data hasil tes berhasil disimpan.");
        } else {
          // Gagal disimpan, tambahkan penanganan sesuai kebutuhan Anda
          toast.error("Data failed saved");
          console.error("Gagal menyimpan data hasil tes.");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // console.log("rulebase :", data);
  // console.log("formData:", formData);
  // console.log("answers:", answers);
  console.log("answers codes:", answerCodes);
  // console.log("answers P:", answerP);
  return (
    <>
      <ToastContainer />
      <MainNavbar />
      <div className="relative h-screen flex justify-center items-center ">
        <div className="absolute inset-0 w-full h-full bg-cover bg-no-repeat">
          <img className="w-full h-full object-cover" src={background} alt="" />
        </div>
        <div className="container relative flex-col lg:w-[68%] w-[85%] h-[72%] flex justify-center">
          <div className=" bg-white flex-col h-full rounded-3xl items-center overflow-y-auto shadow-xl">
            <div className="lg:flex justify-between pt-10 lg:px-16 px-10">
              <div className="text-4xl font-extrabold lg:flex   text-[#002259]">
                Test Result
              </div>
              <div className="lg:flex gap-3 ">
                <ReactToPrint
                  trigger={() => (
                    <button className="bg-[#f3b420] text-white px-10 py-2 rounded-md lg:my-0 md:my-0 my-2">
                      Print Test Result
                    </button>
                  )}
                  content={() => componentRef.current}
                />
                <button
                  onClick={handleSaveResult}
                  className="bg-[#002259] text-white px-10 py-2 rounded-md"
                >
                  Simpan Hasil
                </button>
              </div>
            </div>
            <div className="lg:px-16 px-10" ref={componentRef}>
              <div className="text-3xl font-bold lg:flex pb-4 pt-6">
                Visum et Repertum
              </div>
              <hr></hr>
              <div className="lg:flex pt-4 text-sm">
                <div className="lg:w-4/12 flex flex-col justify-start gap-3">
                  <div className="flex flex-col gap-1">
                    <p className="font-bold">Nomor Pemeriksaan</p>
                    <p className="text-gray-500">{formData.no_pemeriksaan}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="font-bold">Tanggal Jam Pemeriksaan</p>
                    <p className="text-gray-500">{formatDate(formData.tgl_pemeriksaan)} WIB</p>
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
                    <p className="text-gray-500">
                      {formData.perkiraan_umur} tahun
                    </p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="font-bold">Tanggal dan Jam Penemuan</p>
                    <p className="text-gray-500">{formatDate(formData.tgl_penemuan)} WIB</p>
                  </div>
                  <div className="flex flex-col gap-1 ">
                    <p className="font-bold">Lokasi Penemuan</p>
                    <p className="text-gray-500">{formData.lokasi_penemuan}</p>
                  </div>
                  <div className="flex flex-col gap-1 pb-3">
                    <p className="font-bold">Informasi Tambahan</p>
                    <p className="text-gray-500">
                      {formData.informasi_tambahan}
                    </p>
                  </div>
                </div>
                <div className="lg:w-8/12 flex flex-col justify-start gap-3 lg:border-s-2 lg:border-black lg:pl-10">
                  <div className="flex flex-col gap-1">
                    <p className="font-bold">
                      Ciri yang ditemukan pada Jenazah :
                    </p>
                    <ol className="text-gray-500 list-decimal pl-4">
                      {answers
                        .filter(
                          (answer) =>
                            answer !==
                            "Melanjutkan ke pertanyaan yang lebih spesifik - IYA"
                        )
                        .map((filteredAnswer, index) => (
                          <li key={index} className="text-gray-500">
                            {filteredAnswer}
                          </li>
                        ))}
                    </ol>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="font-bold">Waktu Sejak Kematian</p>
                    <p className="text-gray-500">
                      {timeOfDeath
                        ? timeOfDeath
                        : "Belum ada interval waktu saat kematian yang tepat"}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1 ">
                    <p className="font-bold">Pemeriksa, </p>
                    <p className="text-gray-500">{username}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center py-6 w-full lg:px-16 px-10">
              <Link
                className="bg-[#F3B320] w-full text-white text-center py-3 px-4 rounded"
                to="/home"
              >
                Kembali ke Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TestResult;
