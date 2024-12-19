import { useState } from "react";
import Skeleton from "./Skeleton";
import ToggleNight from '../components/toggleNight'

function Questions({ loading, questions, updateAnswer, setIsNightToogled, isNightToogled }) {
const [selectedAnswers, setSelectedAnswers] = useState({});


function selectandUpdate(answer, currentQuestion) {
updateAnswer(answer, currentQuestion);
setSelectedAnswers((prevState) => {
return {...prevState, [currentQuestion]: answer}
});
}


const allAnswers = questions.map((question, questionIndex) => (
  
  <div key={questionIndex} id="question">
    <h1>{question.question}</h1>
    <ul id="questions-list">

      { question.allAnswers.map((answer, answerIndex) => (
        <li 
        key={answerIndex} 
        onClick={() => selectandUpdate(answer, question.question)} 
        style={{backgroundColor: selectedAnswers[question.question] === answer ? "orange" : ""}}>
        {answer}
      </li>
      )) }

    </ul>
    <div className="line-break"></div>
  </div>
))
    

    return(
      
      <section className={`questions-section ${isNightToogled ? "night" : "day"}`}>
        { loading
        ? 
        <div className="skeleton">
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />
        </div>
        : <div className="questions-page">
          <ToggleNight setIsNightToogled={setIsNightToogled}/>
      {allAnswers}
      
      <footer className='footer-section'>
      <p className='result'> You scored 0 / 5 correct answers</p>
      <button>Check answers</button>
      </footer>
    </div> }
    </section>

    )
}

export default Questions