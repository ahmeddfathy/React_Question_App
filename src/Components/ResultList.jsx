import React from "react";
import "../style.css";
export default function ResultList({ results }) {
  return (
    <div>
      <h2 style={{color:'black'}}>Results</h2>
      {results && results.length > 0 ? ( // التحقق من وجود النتائج
        <ul>
          {results.map((result, index) => (
            <li key={index} style={{ color: result.correctAnswer === result.userAnswer ? "green" : "red" }}>
              <div id="question">Question: {result.question}</div>
              <div id="correct_ans">Correct Answer: {result.correctAnswer}</div>
              <div id="wrong_ans">Your Answer: {result.userAnswer}</div>
            </li>
          ))}
        </ul>
      ) : (
        <p style={{color:'black'}}>No results available.</p>
      )}
    </div>
  );
}
