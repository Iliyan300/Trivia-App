import { useState } from "react";
import Skeleton from "./Skeleton";
import { darkThemeIcon, dayThemeIcon } from "../public/darkThemeIcons"

function Questions({ errorMessage, loading, questions, updateAnswer, setDarkMode, isDarkToogled, handleRestartGame, finalResult, setFinalResult }) {
const [selectedAnswers, setSelectedAnswers] = useState({});
const [isAllSelected, setIsAllSelected] = useState(false);
const [isNotAnswered, setisNotAnswered] = useState(false);


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
if(!isAllSelected) {
updateAnswer(answer, currentQuestion);
setSelectedAnswers((prevState) => {
return {...prevState, [currentQuestion]: answer}
});
 }
}

function checkAnswers() {

  const selectedAnswers = questions.map((answers) => answers.selectedAnswer);
  const correctAnswered = questions.filter((answers) =>  answers.correctAnswer === answers.selectedAnswer);
  setFinalResult(correctAnswered.length);

  const isAllSelected = selectedAnswers.every((answer) => answer.length > 0 );
  setIsAllSelected(isAllSelected);

  if(isAllSelected) {
    setisNotAnswered(false);
    let correctAnswer = document.getElementsByClassName("correct");
    let incorrectAnswer = document.getElementsByClassName("incorrect");
    [...incorrectAnswer].forEach((element) => element.style.border = "2px solid rgb(236, 79, 17)");
    [...correctAnswer].forEach((element) => element.style.border = "2px solid #62ec11");
    
  } else {
    setisNotAnswered(true);
  }
 
}


const allAnswers = questions.map((question, questionIndex) => (
  
  <div key={questionIndex} id="question">
    <h1 style={isDarkThemeText}>{question.question}</h1>
    <ul style={isDarkTheme} className="questions-list">

      { question.allAnswers.map((answer, answerIndex) => (
        <li 
        key={answerIndex} 
        className={`answer 
        ${isDarkToogled ? "darkThemeAnswer" : ""} 
        ${question.correctAnswer === answer ? "correct" : "incorrect"}`} 
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
      {isNotAnswered && <p id="alert">Please answer all questions</p>}
      {isAllSelected ? <button style={isDarkThemeBtns} onClick={() => handleRestartGame()}>Play Again</button> :<button style={isDarkThemeBtns} onClick={() => checkAnswers()}>Check answers</button>}
      
     
      </footer>
      
    </div>  
     }
    </section>

    )
}

export default Questions