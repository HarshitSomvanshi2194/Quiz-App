import React from "react";
import "./Quiz.css";

function Home({ onStart }) {
  return (
    <div className="container">
      <h1>Welcome to the Quiz App</h1>
      <hr />
      <p style={{ textAlign: "center", fontSize: "1.1rem", color: "#888", marginBottom: 32 }}>
        Test your knowledge with our fun quiz! Click below to begin.
      </p>
      <button onClick={onStart} style={{ maxWidth: 220, margin: "0 auto" }}>Start Quiz</button>
    </div>
  );
}

export default Home;
