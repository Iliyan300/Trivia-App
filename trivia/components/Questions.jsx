import { useState } from "react";



function Questions({ loading, questions, updateAnswer }) {

  const [selectedAnswers, setSelectedAnswers] = useState({});
console.log(selectedAnswers)

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
      <>
        { loading
        ? <h2> Loading...</h2>
        : <div className="questions-page">
      
      {allAnswers}
      
      <footer className='footer-section'>
      <p className='result'> You scored 0 / 5 correct answers</p>
      <button>Check answers</button>
      </footer>
    </div> }
    </>

    )
}

export default Questions