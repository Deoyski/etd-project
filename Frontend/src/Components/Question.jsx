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
  const [answerP, setAnswerP] = useState([]);

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
            question.kode === "C5" ||
            question.kode === "C6" ||
            question.kode === "C23" ||
            question.kode === "C34" ||
            question.kode === "C7"
        );
        // Mengurutkan pertanyaan berdasarkan urutan yang diinginkan
        const sortedQuestions = filteredQuestions.sort((a, b) => {
          // Menetapkan urutan keluar pertanyaan
          const order = { C5: 0, C6: 1, C7: 2, C23: 3, C34: 4 };
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
    const answerP = currentQuestion.kode; // Mendapatkan kode pertanyaan
    console.log(answerP);
    if (answer) {
    
        setAnswerCodes([...answerCodes, answerCode]);
        setAnswers([...answers, answerText]);
        setAnswerP([...answerP, answerP]);

    } else {
      setAnswers([...answers, answerText]);
    }
    console.log(answerCode);

    if (questionIndex + 1 < questions.length) {
      setQuestionIndex(questionIndex + 1);
    } else if (!additionalQuestionsFetched) {
      // Mengambil jawaban empat pertanyaan sebelumnya
      const previousAnswers = answers.slice(Math.max(0, questionIndex - 4));
      // console.log("Jawaban sebelumnya:", previousAnswers);

      const C5_Yes = previousAnswers
        .filter((_, index) => questions[index].kode === "C5")
        .every((answer) => answer.endsWith("IYA"));
      const C6_Yes = previousAnswers
        .filter((_, index) => questions[index].kode === "C6")
        .every((answer) => answer.endsWith("IYA"));
      const C7_Yes = previousAnswers
        .filter((_, index) => questions[index].kode === "C7")
        .every((answer) => answer.endsWith("IYA"));
      const C23_Yes = previousAnswers
        .filter((_, index) => questions[index].kode === "C23")
        .every((answer) => answer.endsWith("IYA"));

      const C5_No = previousAnswers
        .filter((_, index) => questions[index].kode === "C5")
        .every((answer) => answer.endsWith("TIDAK"));
      const C6_No = previousAnswers
        .filter((_, index) => questions[index].kode === "C6")
        .every((answer) => answer.endsWith("TIDAK"));
      const C7_No = previousAnswers
        .filter((_, index) => questions[index].kode === "C7")
        .every((answer) => answer.endsWith("TIDAK"));
      const C23_No = previousAnswers
        .filter((_, index) => questions[index].kode === "C23")
        .every((answer) => answer.endsWith("TIDAK"));

      if (C6_Yes && C7_Yes && C5_No && C23_No) {
        fetchAdditionalQuestions([
          "C1",
          "C2",
          "C3",
          "C9",
          "C10",
          "C17",
          "C18",
          "C35",
        ]);
      } else if (C5_Yes && C6_No && C7_No && C23_No) {
        fetchAdditionalQuestions([
          "C8",
          "C12",
          "C16",
          "C20",
          "C22",
          "C26",
          "C32",
          "C33",
          "C35",
        ]);
      } else if (C5_Yes && C6_No && C7_Yes && C23_No) {
        fetchAdditionalQuestions(["C11", "C19", "C21", "C22", "C35"]);
      } else if (C5_Yes && C23_Yes && C6_No && C7_No) {
        fetchAdditionalQuestions([
          "C13",
          "C14",
          "C15",
          "C24",
          "C25",
          "C26",
          "C27",
          "C28",
          "C29",
          "C30",
          "C31",
          "C35",
        ]);
      } else if (C5_No && C6_No && C7_Yes && C23_No) {
        fetchAdditionalQuestions(["C3", "P4", "C10", "C11", "C18", "C35"]);
      } else {
      navigateToTestResult();

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
        answerP: answerP
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
