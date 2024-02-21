import React, {useState} from 'react';
import '../styles/App.css'
import QuestionBox from './QuestionBox';
import { fetchQuestions } from './ApiCall';
import {QuestionCard, Difficulty } from './ApiCall';

type Answers = {
  question : string;
  answer : string;
  correct : boolean;
  correctAnswer : string;
}

function App() {
  const TotalQuestions = 10;
  const [loading, setLoading] = useState(false);
  const [questions,setQuestions] = useState<QuestionCard[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswer,setUserAnswer] = useState<Answers[]>([]);
  const [score,setScore] = useState(0);
  const [quizEnded,setQuizEnded] = useState(true);
  console.log(questions); 

  const startQuiz = async () =>{
    setLoading(true);
    setQuizEnded(false);
    const newQuestions = await fetchQuestions(TotalQuestions,Difficulty.EASY);
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswer([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e : React.MouseEvent<HTMLButtonElement>) => {
    if(!quizEnded){
      const answer = e.currentTarget.value;

      const isCorrect = questions[number].correctAnswer === answer;
      
      if(isCorrect) setScore(prev => prev + 1);

      const answeObject = {
        question : questions[number].question,
        answer,
        correct: isCorrect,
        correctAnswer:questions[number].correctAnswer,
      }
      setUserAnswer( (prev) => [...prev,answeObject]);

    }
  }

  const nextQuestion = () =>{

  }

  return (
    <>
      <div className='App'>
        <h1>Welcome To your Quiz</h1>
        {(quizEnded || userAnswer.length === TotalQuestions) ? (
            <button className='startButton' onClick={startQuiz}>
              Start Your Quiz
            </button>
           ):null }
    
        {!quizEnded ? <p className='score'>Score:</p> : null}
        {loading? <p>Loading Questions</p> : null}
        {!loading && !quizEnded && <QuestionBox 
        questionNumber={number + 1}
        totalQuestions={TotalQuestions}
        question={questions[number].question}
        options ={questions[number].answers}
        userAnswer={userAnswer?userAnswer[number] : undefined}
        callback={checkAnswer}
        />}
        {!loading && !quizEnded && userAnswer.length === number + 1 && number !== TotalQuestions -1 ?
          (<button className='nextButton' onClick={nextQuestion}>
        Next Quesion
        </button>) : null }
      </div>
    </>
  )
}

export default App
