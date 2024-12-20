import { useState } from "react";
import Skeleton from "./Skeleton";


function Questions({ loading, questions, updateAnswer, setDarkMode, isDarkToogled }) {
const [selectedAnswers, setSelectedAnswers] = useState({});

const isDarkTheme = {
  color: isDarkToogled ? "#fff" : "#293264",
  backgroundColor: isDarkToogled ? "#a6b3ee96" : "",
}

const isDarkThemeBtns = {
  color: isDarkToogled ? "#fff" : "",
  backgroundColor: isDarkToogled ? "#a6b3ee98" : "",
}

const isDarkThemeText = {

  color: isDarkToogled ? "#485ccf" : "293264",
}

function selectandUpdate(answer, currentQuestion) {
updateAnswer(answer, currentQuestion);
setSelectedAnswers((prevState) => {
return {...prevState, [currentQuestion]: answer}
});
}


const allAnswers = questions.map((question, questionIndex) => (
  
  <div  key={questionIndex} id="question">
    <h1 style={isDarkThemeText}>{question.question}</h1>
    <ul style={isDarkTheme} id="questions-list">

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
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        </div>
        : 
        <div className="questions">
          <button style={isDarkThemeBtns} onClick={() => setDarkMode(prev => !prev)}> {isDarkToogled ? "Day" : "Night"} </button> 
       {allAnswers}
      <footer className='footer-section'>
      <p className='result'> You scored 0 / 5 correct answers</p>
      <button style={isDarkThemeBtns}>Check answers</button>
      </footer>
    </div> }
    </section>

    )
}

export default Questions