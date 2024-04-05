import MainNavbar from "./MainNavbar";
import background from "../assets/background.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Question() {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state ? location.state.formData : null;
  const [additionalQuestionsFetched, setAdditionalQuestionsFetched] = useState(false);

  const [questionIndex, setQuestionIndex] = useState(0); // Indeks pertanyaan saat ini
  const [answers, setAnswers] = useState([]); // Array untuk menyimpan jawaban pengguna
  const [questions, setQuestions] = useState([]); // Arr
  const [answerCodes, setAnswerCodes] = useState([]); // Array untuk menyimpan kode pertanyaan


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
        // Menyaring pertanyaan P5, P6, dan P7
        const filteredQuestions = ciriJenazahData.filter(question => question.kode === "P5" || question.kode === "P6" || question.kode === "P7");
        // Mengurutkan pertanyaan berdasarkan urutan yang diinginkan
        const sortedQuestions = filteredQuestions.sort((a, b) => {
          // Menetapkan urutan untuk P5, P6, dan P7
          const order = { "P5": 0, "P6": 1, "P7": 2 };
          return order[a.kode] - order[b.kode];
        });
        // Set pertanyaan yang sudah difilter dan diurutkan ke dalam state
        setQuestions(sortedQuestions);
      })
      .catch((error) => console.error(error));
  };

  const handleAnswer = (answer) => {
    const currentQuestion = questions[questionIndex];
    const answerText = `${currentQuestion.keterangan} - ${answer ? 'iya' : 'tidak'}`;
     const answerCode = currentQuestion.id; // Mendapatkan kode pertanyaan

    if (answer) {
      setAnswerCodes([...answerCodes, answerCode]);
      setAnswers([...answers, answerText]);
    } else {
      setAnswers([...answers, answerText]);
    }
    console.log(answers);
    console.log(answerCodes);

    
    if (questionIndex + 1 < questions.length) {
      setQuestionIndex(questionIndex + 1);     
    } else {
      if (!additionalQuestionsFetched) {
        fetchAdditionalQuestions();
      } else {
        navigateToTestResult();
      }
    }
  };

  const fetchAdditionalQuestions = () => {
    fetch("http://localhost:5000/ciri-jenazah")
      .then((response) => response.json())
      .then((ciriJenazahData) => {
        const additionalQuestions = ciriJenazahData.filter(question => ["P1", "P2", "P9", "P11"].includes(question.kode));
        setQuestions(additionalQuestions);
        setQuestionIndex(0);
        setAdditionalQuestionsFetched(true);
      })
      .catch((error) => console.error(error));
  };

  const navigateToTestResult = () => {
    navigate("/test_result", {
      state: {
        formData: formData,
        answers: answers,
        answerCodes: answerCodes
      }
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
              <button onClick={() => handleAnswer(true)} className="lg:w-6/12 rounded-md w-full bg-[#F3B320] px-10 py-3">
                  Ya
                </button>
                <button onClick={() => handleAnswer(false)} className="lg:w-6/12 rounded-md w-full bg-[#002259] px-10 py-3 lg:mt-0 mt-2">
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
