import MainNavbar from "./MainNavbar";
import background from "../assets/background.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Question() {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state ? location.state.formData : null;
  const [additionalQuestionsFetched, setAdditionalQuestionsFetched] =
    useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]); // Menyimpan jawaban pengguna
  const [questions, setQuestions] = useState([]); // Menyimpan pertanyaan
  const [answerCodes, setAnswerCodes] = useState([]);

  useEffect(() => {
    fetchData();
    // Tampilkan data di console log saat komponen dimount
    if (formData) {
      console.log(formData);
    }
  }, [formData]);

  const fetchData = () => {
    // Fetch data dari tabel ciri-jenazah
    fetch("http://localhost:5000/ciri-jenazah")
      .then((response) => response.json())
      .then((ciriJenazahData) => {
        const filteredQuestions = ciriJenazahData.filter(
          (question) =>
            question.kode === "P5" ||
            question.kode === "P6" ||
            question.kode === "P23" ||
            question.kode === "P34" ||
            question.kode === "P7"
        );
        // Mengurutkan pertanyaan berdasarkan urutan yang diinginkan
        const sortedQuestions = filteredQuestions.sort((a, b) => {
          // Menetapkan urutan keluar pertanyaan
          const order = { P5: 0, P6: 1, P7: 2, P23: 3, P34: 4 };
          return order[a.kode] - order[b.kode];
        });
        // Set pertanyaan yang sudah difilter dan diurutkan ke dalam state
        setQuestions(sortedQuestions);
      })
      .catch((error) => console.error(error));
  };

  const handleAnswer = (answer) => {
    const currentQuestion = questions[questionIndex];
    const answerText = `${currentQuestion.keterangan} - ${
      answer ? "IYA" : "TIDAK"
    }`;
    const answerCode = currentQuestion.id; // Mendapatkan kode pertanyaan

    if (answer) {
    
        setAnswerCodes([...answerCodes, answerCode]);
        setAnswers([...answers, answerText]);

    } else {
      setAnswers([...answers, answerText]);
    }
    console.log(answerCode);

    if (questionIndex + 1 < questions.length) {
      setQuestionIndex(questionIndex + 1);
    } else if (!additionalQuestionsFetched) {
      // Mengambil jawaban empat pertanyaan sebelumnya
      const previousAnswers = answers.slice(Math.max(0, questionIndex - 4));
      console.log("Jawaban sebelumnya:", previousAnswers);

      const P5_Yes = previousAnswers
        .filter((_, index) => questions[index].kode === "P5")
        .every((answer) => answer.endsWith("IYA"));
      const P6_Yes = previousAnswers
        .filter((_, index) => questions[index].kode === "P6")
        .every((answer) => answer.endsWith("IYA"));
      const P7_Yes = previousAnswers
        .filter((_, index) => questions[index].kode === "P7")
        .every((answer) => answer.endsWith("IYA"));
      const P23_Yes = previousAnswers
        .filter((_, index) => questions[index].kode === "P23")
        .every((answer) => answer.endsWith("IYA"));

      const P5_No = previousAnswers
        .filter((_, index) => questions[index].kode === "P5")
        .every((answer) => answer.endsWith("TIDAK"));
      const P6_No = previousAnswers
        .filter((_, index) => questions[index].kode === "P6")
        .every((answer) => answer.endsWith("TIDAK"));
      const P7_No = previousAnswers
        .filter((_, index) => questions[index].kode === "P7")
        .every((answer) => answer.endsWith("TIDAK"));
      const P23_No = previousAnswers
        .filter((_, index) => questions[index].kode === "P23")
        .every((answer) => answer.endsWith("TIDAK"));

      if (P6_Yes && P7_Yes && P5_No && P23_No) {
        fetchAdditionalQuestions([
          "P1",
          "P2",
          "P3",
          "P9",
          "P10",
          "P17",
          "P18",
          "P35",
        ]);
      } else if (P5_Yes && P6_No && P7_No && P23_No) {
        fetchAdditionalQuestions([
          "P8",
          "P12",
          "P16",
          "P20",
          "P22",
          "P26",
          "P32",
          "P33",
          "P35",
        ]);
      } else if (P5_Yes && P6_No && P7_Yes && P23_No) {
        fetchAdditionalQuestions(["P11", "P19", "P21", "P22", "P35"]);
      } else if (P5_Yes && P23_Yes && P6_No && P7_No) {
        fetchAdditionalQuestions([
          "P13",
          "P14",
          "P15",
          "P24",
          "P25",
          "P26",
          "P27",
          "P28",
          "P29",
          "P30",
          "P31",
          "P35",
        ]);
      } else if (P5_No && P6_No && P7_Yes && P23_No) {
        fetchAdditionalQuestions(["P3", "P4", "P10", "P11", "P18", "P35"]);
      }
    } else {
      navigateToTestResult();
    }
  };

  const fetchAdditionalQuestions = (additionalQuestionCodes) => {
    fetch("http://localhost:5000/ciri-jenazah")
      .then((response) => response.json())
      .then((ciriJenazahData) => {
        const additionalQuestions = ciriJenazahData.filter((question) =>
          additionalQuestionCodes.includes(question.kode)
        );
        if (additionalQuestions.length > 0) {
          setQuestions(additionalQuestions);
          setQuestionIndex(0);
          setAdditionalQuestionsFetched(true); // Tandai bahwa pertanyaan tambahan sudah diambil
        }
      })
      .catch((error) => console.error(error));
  };
  
  const navigateToTestResult = () => {
    navigate("/test_result", {
      state: {
        formData: formData,
        answers: answers,
        answerCodes: answerCodes,
      },
    });
  };

  const renderQuestion = () => {
    if (questions.length > 0 && questionIndex < questions.length) {
      const currentQuestion = questions[questionIndex];
      return (
        <div className="py-6 text-2xl text-center text-[#002259]">
          {currentQuestion.keterangan} ?
        </div>
      );
    } else {
      return (
        <div className="py-20 text-2xl text-center text-[#002259]">
          Pertanyaan tidak ditemukan.
        </div>
      );
    }
  };

  return (
    <>
      <MainNavbar />
      <div className="relative h-screen flex justify-center items-center ">
        <div className="absolute inset-0 w-full h-full bg-cover bg-no-repeat">
          <img className="w-full h-full object-cover" src={background} alt="" />
        </div>
        <div className="container relative flex-col lg:w-[50%] w-[90%] lg:h-[50%] flex justify-center">
          <div className=" bg-white flex-col h-full lg:p-10 p-6 rounded-3xl lg:px-16 shadow-xl justify-center items-center flex ">
            <div className="lg:text-6xl text-5xl font-extrabold flex-col text-center justify-center text-[#002259]">
              Question
            </div>
            <div className="py-20 text-2xl text-center text-[#002259]">
              {renderQuestion()}
            </div>
            <div className="flex text-white font-bold justify-center w-full">
              <div className="w-10/12 lg:flex gap-4">
                <button
                  onClick={() => handleAnswer(true)}
                  className="lg:w-6/12 rounded-md w-full bg-[#F3B320] px-10 py-3"
                >
                  Ya
                </button>
                <button
                  onClick={() => handleAnswer(false)}
                  className="lg:w-6/12 rounded-md w-full bg-[#002259] px-10 py-3 lg:mt-0 mt-2"
                >
                  Tidak
                </button>
              </div>
            </div>
            {/* <div className="text-center pt-10 text-[#5D84B3]">
              2/20 Questions
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Question;
