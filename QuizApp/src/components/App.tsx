import React, {useState} from 'react';
import '../styles/App.css'
import QuestionBox from './QuestionBox';
import { fetchQuestions } from './ApiCall';
import { Difficulty } from './ApiCall';
function App() {
  const TotalQuestions = 10;
  const [loading, setLoading] = useState(false);
  const [questions,setQuestions] = useState([]);
  const [number, setNumber] = useState(0);
  const [userAnswer,setUserAnswer] = useState([]);
  const [score,setScore] = useState(0);
  const [quizEnded,setQuizEnded] = useState(true);
  console.log(fetchQuestions(TotalQuestions,Difficulty.EASY)); 

  const startQuiz = async () =>{

  };

  const checkAnswer = (e : React.MouseEvent<HTMLButtonElement>) => {

  }

  const nextQuestion = () =>{

  }

  return (
    <>
      <div className='App'>
        <h1>Welcome To your Quiz</h1>
        <button className='startButton' onClick={startQuiz}>
        Start Your Quiz
        </button>
        <p className='score'>Score:</p>
        <p>Loading Questions</p>
        {/* <QuestionBox 
        questionNumber={number + 1}
        totalQuestions={TotalQuestions}
        question={questions[number].question}
        options ={questions[number].answers}
        userAnswer={userAnswer?userAnswer[number] : undefined}
        callback={checkAnswer}
        /> */}
        <button className='nextButton' onClick={nextQuestion}>
        Next Quesion
        </button>
      </div>
    </>
  )
}

export default App
