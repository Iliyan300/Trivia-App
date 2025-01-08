import { useState } from "react";
import Skeleton from "./Skeleton";
import { darkThemeIcon, dayThemeIcon } from "../public/darkThemeIcons"

function Questions({ errorMessage, loading, questions, updateAnswer, setDarkMode, isDarkToogled, handleRestartGame, finalResult, setFinalResult, isAllSelected, setIsAllSelected, selectedAnswers, setSelectedAnswers }) {

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
    let correctAnswer = document.querySelectorAll(".correct");
    let correctAnswered = document.getElementsByClassName("correct-answered");
    let incorrectAnswered = document.getElementsByClassName("incorrect-answered");
    let correctItems = document.querySelectorAll(".correct-answered li.incorrect");
    let incorrectItems = document.querySelectorAll(".incorrect-answered li.incorrect");
    let incorrectSelected = document.querySelectorAll(".incorrect.selected");
       
    [...correctAnswered].forEach((element) => element.style.backgroundColor = "#3cfa3c");
   [...incorrectAnswered].forEach((element) => element.style.backgroundColor = "grey");
    correctAnswer.forEach((element) => element.style.backgroundColor = "#19e52a");
    correctItems.forEach((li) => li.style.border = "none");
    incorrectItems.forEach((li) => li.style.border = "none");
    incorrectSelected.forEach((li) => li.style.border = "2px solid red");
    
   

  } else {
    setisNotAnswered(true);
  }
 
}


const allAnswers = questions.map((question, questionIndex) => (
  
  <div key={questionIndex} id="question">
    <h1 style={isDarkThemeText}>{question.question}</h1>
    <ul style={isDarkTheme} className={`questions-list ${question.selectedAnswer === question.correctAnswer ? "correct-answered" : "incorrect-answered"}`}>

      { question.allAnswers.map((answer, answerIndex) => (
        <li key={answerIndex} 
        className={`answer 
        ${isDarkToogled ? "darkThemeAnswer" : ""} 
        ${question.correctAnswer === answer ? "correct" : "incorrect"}
        ${selectedAnswers[question.question] === answer ? "selected" : ""}`}
        style={{backgroundColor: selectedAnswers[question.question] === answer ? "#6c5dc5" : ""}}
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
          <button id="dark-toogle-btn" style={isDarkThemeBtns} onClick={() => setDarkMode(prev => !prev)}> {isDarkToogled ? dayThemeIcon : darkThemeIcon} </button>
          </div>
          <div className="questions-type">
          <h1 style={isDarkThemeText}>Type: General Knowledge</h1>
          <h1 style={isDarkThemeText}>Level: Easy</h1> 
          </div>
         {errorMessage 
         ? <h3 id="error">{errorMessage}</h3> 
         : allAnswers}
          
          <footer className='footer-section'>
      {isAllSelected && <p id="result"> You scored {finalResult} / {questions.length} correct answers</p>}
      {isNotAnswered && <p id="alert">Please answer all questions</p>}
      {isAllSelected 
      ? <button id="play-again-btn" style={isDarkThemeBtns} onClick={() => handleRestartGame()}>Play Again</button> 
      : <button id="check-answers-btn" style={isDarkThemeBtns} onClick={() => checkAnswers()}>Check answers</button>}
      </footer>
    </div>  
     }
    </section>

    )
}

export default Questions