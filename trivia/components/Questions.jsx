import { useState } from "react";
import Skeleton from "./Skeleton";
import { darkThemeIcon, dayThemeIcon } from "../public/darkThemeIcons"

function Questions({ errorMessage, loading, questions, updateAnswer, setDarkMode, isDarkToogled }) {
const [selectedAnswers, setSelectedAnswers] = useState({});
const [finalResult, setFinalResult] = useState(0);
const [isAllSelected, setIsAllSelected] = useState(false);
const [isPopUp, setIsPopUp] = useState(false);

const isDarkTheme = {
  color: isDarkToogled ? "#fff" : "#293264",
  backgroundColor: isDarkToogled ? "#a6b3ee96" : "",
}

const isDarkThemeBtns = {
  color: isDarkToogled ? "#fff" : "",
  backgroundColor: isDarkToogled ? "#a6b3ee98" : "",
}

const isDarkThemeText = {

  color: isDarkToogled ? "#a6b3ee" : "#293264",
}

function selectandUpdate(answer, currentQuestion) {
updateAnswer(answer, currentQuestion);
setSelectedAnswers((prevState) => {
return {...prevState, [currentQuestion]: answer}
});
}


function checkAnswers() {

  const selectedAnswers = questions.map((answers) => answers.selectedAnswer);
  const correctAnswered = questions.filter((answers) =>  answers.correctAnswer === answers.selectedAnswer);
  setFinalResult(correctAnswered.length);

  const isAllSelected = selectedAnswers.every((answer) => answer.length > 0 );
  setIsAllSelected(isAllSelected);

  if(isAllSelected) {
    setIsPopUp(false);
  } else {
    setIsPopUp(true);
  }
 
 
}


const allAnswers = questions.map((question, questionIndex) => (
  
  <div key={questionIndex} id="question">
    <h1 style={isDarkThemeText}>{question.question}</h1>
    <ul style={isDarkTheme} className="questions-list">

      { question.allAnswers.map((answer, answerIndex) => (
        <li 
        key={answerIndex} 
        className={`answer ${isDarkToogled ? "darkThemeAnswer" : ""}`}
        style={{backgroundColor: selectedAnswers[question.question] === answer ? "#6c5dc5" : "", 
        color: selectedAnswers[question.question] === answer ? "#fff" : "" }}
        onClick={() => selectandUpdate(answer, question.question)}>
        {answer}
      </li>
      )) }

    </ul>
    <div className="line-break"></div>
  </div>
))
    

    return(
      
      <section className="questions-section">
        { loading 
        ? 
        <div className="skeleton">
        <Skeleton isDarkToogled={isDarkToogled} />
        <Skeleton isDarkToogled={isDarkToogled} />
        <Skeleton isDarkToogled={isDarkToogled} />
        <Skeleton isDarkToogled={isDarkToogled} />
        <Skeleton isDarkToogled={isDarkToogled} />
        </div>
        : 
        
        <div className="questions">
          <div className="dark-mode-btn">
          <button style={isDarkThemeBtns} onClick={() => setDarkMode(prev => !prev)}> {isDarkToogled ? dayThemeIcon : darkThemeIcon} </button> 
          </div>
         {errorMessage ? <h3 id="error">{errorMessage}</h3> : allAnswers}
          <footer className='footer-section'>
      {isAllSelected && <p className="result"> You scored {finalResult} / {questions.length} correct answers</p>}
      {isPopUp && <p id="alert">Please answer all questions</p>}
      <button style={isDarkThemeBtns} onClick={() => checkAnswers()}>Check answers</button>
      
     
      </footer>
      
    </div>  
     }
    </section>

    )
}

export default Questions