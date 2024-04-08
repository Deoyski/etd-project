import MainNavbar from "./MainNavbar";
import background from "../assets/background.png";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

function TestResult() {
  const location = useLocation();
  const userId = localStorage.getItem('id');
  const formData = location.state ? location.state.formData : null;
  const answers = location.state ? location.state.answers : [];
  // const answerCodes = location.state ? location.state.answerCodes : [];
  const answerCodes = location.state ? location.state.answerCodes.slice() : [];
  const index = answerCodes.indexOf(46);
  if (index !== -1) {
    answerCodes.splice(index, 1);
  }
  const [data, setDataRuleBase] = useState([]);
  const [timeOfDeath, setTimeOfDeath] = useState(null);

  // Fetch Data
  useEffect(() => {
    fetch("http://localhost:5000/rule-base")
      .then((response) => response.json())
      .then((data) => {
        setDataRuleBase(data);
        const matchedIntervalIds = determineIntervalId(data, answerCodes);
        if (matchedIntervalIds.length > 0) {
          // Jika ada interval ID yang cocok, ambil data interval untuk interval ID pertama yang cocok
          fetchIntervalData(matchedIntervalIds[0]);
        } else {
          console.log("Tidak ada interval yang cocok dengan data rule base.");
        }
      })
      .catch((error) => console.error(error));
  }, [answerCodes]);

  const determineIntervalId = (ruleBaseData, answerCodes) => {
    // Buat objek untuk menyimpan jumlah kemunculan cirijenazahId untuk setiap intervalId
    const intervalCount = {};

    // Inisialisasi set answerCodes untuk memudahkan pencarian
    const matchedCiriJenazahIds = new Set(answerCodes);

    // Iterasi setiap item pada data rule base
    ruleBaseData.forEach((item) => {
      const intervalId = item.intervalId;
      const ciriJenazahId = item.ciriJenazahId;

      // Periksa apakah ciriJenazahId ada di dalam answerCodes
      if (matchedCiriJenazahIds.has(ciriJenazahId)) {
        // Tambahkan intervalId ke intervalCount jika belum ada
        if (!intervalCount[intervalId]) {
          intervalCount[intervalId] = new Set();
        }
        intervalCount[intervalId].add(ciriJenazahId);
      }
    });

    // Temukan intervalId yang memiliki semua cirijenazah yang cocok
    let matchedIntervalId = null;

    for (const [intervalId, ciriJenazahSet] of Object.entries(intervalCount)) {
      if (ciriJenazahSet.size === matchedCiriJenazahIds.size) {
        // Jika set cirijenazahId pada intervalId sama dengan set answerCodes,
        // maka intervalId ini cocok dengan semua cirijenazah
        matchedIntervalId = intervalId;
        break; // Keluar dari loop karena sudah ditemukan intervalId yang cocok
      }
    }

    return matchedIntervalId;
  };

  const fetchIntervalData = (matchedIntervalId) => {
    // console.log(matchedIntervalId);
    fetch(`http://localhost:5000/interval/${matchedIntervalId}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log("ini data interval", data);
        const mostFrequentTimeOfDeath = data.keterangan;
        // Check if timeOfDeath is already set
        if (timeOfDeath === null) {
          setTimeOfDeath(mostFrequentTimeOfDeath);
        }
      })
      .catch((error) => {
        console.error(error);
        // If there's an error, set timeOfDeath to default value
        setTimeOfDeath("Ciri Jenazah belum dapat ditentukan");
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
    .then(response => {
      if (response.ok) {
        // Berhasil disimpan, tambahkan penanganan sesuai kebutuhan Anda
        console.log("Data hasil tes berhasil disimpan.");
      } else {
        // Gagal disimpan, tambahkan penanganan sesuai kebutuhan Anda
        console.error("Gagal menyimpan data hasil tes.");
      }
    })
    .catch(error => {
      console.error("Error:", error);
    });
  };

  // console.log("rulebase :", data);
  // // Log formData and answers to console
  // console.log("formData:", formData);
  // console.log("answers:", answers);
  // console.log("answers codes:", answerCodes);
  return (
    <>
      <MainNavbar />
      <div className="relative h-screen flex justify-center items-center ">
        <div className="absolute inset-0 w-full h-full bg-cover bg-no-repeat">
          <img className="w-full h-full object-cover" src={background} alt="" />
        </div>
        <div className="container relative flex-col lg:w-[68%] w-[85%] h-[77%] flex justify-center">
          <div className=" bg-white flex-col h-full rounded-3xl items-center overflow-y-auto lg:px-16 px-10 shadow-xl">
            <div className="flex justify-between pt-10">
              <div className="text-4xl font-extrabold lg:flex   text-[#002259]">
                Test Result
              </div>
              <div className="flex gap-3">
                <button className="bg-[#F3B320] text-white px-10 py-2 rounded-md">
                  Print Hasil
                </button>
                <button onClick={handleSaveResult} className="bg-[#F3B320] text-white px-10 py-2 rounded-md">
                  Simpan Hasil
                </button>
              </div>
            </div>
            <div className="lg:flex pt-12">
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
                  <p className="text-gray-500">
                    {formData.perkiraan_umur} tahun
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-bold">Tanggal dan Jam Penemuan</p>
                  <p className="text-gray-500">{formData.tgl_penemuan}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-bold">Lokasi Penemuan</p>
                  <p className="text-gray-500">{formData.lokasi_penemuan}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-bold">Informasi Tambahan</p>
                  <p className="text-gray-500">{formData.informasi_tambahan}</p>
                </div>
              </div>

              <div className="lg:w-8/12 flex flex-col justify-start gap-4 lg:border-s-2 lg:border-black lg:pl-10">
                <div className="flex flex-col gap-1">
                  <p className="font-bold">
                    Ciri yang ditemukan pada Jenazah :
                  </p>
                  <ol className="text-gray-500 list-decimal pl-4">
                    {answers
                      .map((answer, index) => (
                        <li key={index} className="text-gray-500">
                          {answer}
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
              </div>
            </div>
            <div className="flex items-center justify-center py-6 w-full">
              <Link
                className="bg-[#F3B320] w-9/12 text-white text-center py-3 px-4 rounded"
                to="/"
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
