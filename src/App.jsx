import React, { useState } from 'react';
import Quiz from './Components/Quiz';
import Home from './Components/Home';

function App() {
  const [showQuiz, setShowQuiz] = useState(false);

  return (
    <>
      {showQuiz ? <Quiz /> : <Home onStart={() => setShowQuiz(true)} />}
    </>
  );
}

export default App;