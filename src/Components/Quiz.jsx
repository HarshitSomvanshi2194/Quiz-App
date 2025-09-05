import React, { useRef, useState, useEffect } from "react";
import "./Quiz.css";
import { data } from "../assets/data";

function Quiz() {
  const [index, setIndex] = useState(0);
  const [questions, setQuestions] = useState(data[0]);
  const [locked, setLocked] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);
  const [timer, setTimer] = useState(10);

  const Option1 = useRef(null);
  const Option2 = useRef(null);
  const Option3 = useRef(null);
  const Option4 = useRef(null);

  const option_values = [Option1, Option2, Option3, Option4];

  // Timer logic
  useEffect(() => {
    if (result || locked) return;
    if (timer === 0) {
      setLocked(true);
      option_values[questions.ans - 1].current.classList.add("correct");
      setTimeout(() => {
        next();
      }, 1000);
      return;
    }
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer, locked, result, questions]);

  const checkAnswer = (e, ans) => {
    if (!locked) {
      if (questions.ans === ans) {
        e.target.classList.add("correct");
        setLocked(true);
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add("wrong");
        setLocked(true);
        option_values[questions.ans - 1].current.classList.add("correct");
      }
    }
  };

  const next = () => {
    if (locked) {
      if (index === data.length - 1) {
        setResult(true);
        return;
      }
      setIndex((prev) => prev + 1);
      setQuestions(data[index + 1]);
      setLocked(false);
      setTimer(10);
      option_values.forEach((option) => {
        option.current.classList.remove("correct");
        option.current.classList.remove("wrong");
      });
    }
  };

  const reset = () => {
    setIndex(0);
    setQuestions(data[0]);
    setScore(0);
    setLocked(false);
    setResult(false);
    setTimer(10);
    option_values.forEach((option) => {
      option.current.classList.remove("correct");
      option.current.classList.remove("wrong");
    });
  };

  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr />

      {!result ? (
        <>
          {/* 🔹 use timer-badge class (so CSS applies) */}
          <div className="timer-badge">Time Left: {timer} sec</div>

          <h2>
            {index + 1}. {questions.question}
          </h2>

          <ul>
            <li ref={Option1} onClick={(e) => checkAnswer(e, 1)}>
              {questions.option1}
            </li>
            <li ref={Option2} onClick={(e) => checkAnswer(e, 2)}>
              {questions.option2}
            </li>
            <li ref={Option3} onClick={(e) => checkAnswer(e, 3)}>
              {questions.option3}
            </li>
            <li ref={Option4} onClick={(e) => checkAnswer(e, 4)}>
              {questions.option4}
            </li>
          </ul>

          <button onClick={next}>Next</button>
          <div className="index">
            {index + 1} of {data.length} questions
          </div>
        </>
      ) : (
        <>
          <h2>
            You scored {score} out of {data.length}
          </h2>
          <button onClick={reset}>Reset</button>
        </>
      )}
    </div>
  );
}

export default Quiz;
