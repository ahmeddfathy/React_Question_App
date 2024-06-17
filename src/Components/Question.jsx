import axios from "axios";
import React, { useEffect, useState } from "react";
import "../style.css";
import ResultList from "./ResultList";
import { useNavigate } from "react-router-dom";

export default function Question() {
  const [MYQuestions, setMYQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score2, setScore2] = useState(0);
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);


  async function getQuestion() {
    let Result = await axios.get(
      "https://opentdb.com/api.php?amount=49&category=18&type=multiple"
    );
    setMYQuestions(Result.data.results);
  }

  const handleSelectChange = (event, correctAnswers) => {
    const selectedValue = event.target.value;

    if (!correctAnswers.includes(selectedValue)) {
      const result = {
        question: MYQuestions[currentQuestionIndex].question,
        correctAnswer: MYQuestions[currentQuestionIndex].correct_answer,
        userAnswer: selectedValue,
      };
      setResults([...results, result]);
    
    } else {
      setScore2(score2 + 1);
    }
  };
  console.log(results);
  const handleNextQuestion = () => {
    if (currentQuestionIndex < MYQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleSubmit = () => {
    setShowResults(true);

  };

  useEffect(() => {
    getQuestion();
  }, []);

  return (
    <div>
      {currentQuestionIndex < MYQuestions.length && (
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-10 col-md-6 col-lg-4">
              <div className="card mt-5" style={{ width: "20rem" }} id="mycard">
                <div className="card-body">
                  <label className="form-label txt">
                    Question {currentQuestionIndex + 1}
                  </label>
                  <div className="form-control txt">
                    {MYQuestions[currentQuestionIndex].question}
                  </div>
                  <label htmlFor="h" className="txt">
                    Select Answer
                  </label>
                  <select
                    id="h"
                    onChange={(e) =>
                      handleSelectChange(e, [
                        MYQuestions[currentQuestionIndex].correct_answer,
                      ])
                    }
                    className="form-select txt"
                    aria-label="Default select example"
                  >
                    <option value="">Open this select menu</option>
                    {MYQuestions[currentQuestionIndex].incorrect_answers.map(
                      (val, i) => (
                        <option key={i} value={val}>
                          {val}
                        </option>
                      )
                    )}
                    <option value={MYQuestions[currentQuestionIndex].correct_answer}>
                      {MYQuestions[currentQuestionIndex].correct_answer}
                    </option>
                  </select>
                  {currentQuestionIndex < MYQuestions.length - 1 ? (
                    <button onClick={handleNextQuestion} id="mybtn">
                      Next
                    </button>
                  ) : (
                    <button onClick={handleSubmit} id="mybtn">
                      Submit
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showResults && currentQuestionIndex >= MYQuestions.length - 1 && (
        <>
          <div className="txt" style={{color:"black"}}>Score: {score2}</div>
          <ResultList results={results} />
        </>
      )}
    </div>
  );
}
