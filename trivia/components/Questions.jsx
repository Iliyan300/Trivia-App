import { useState } from "react";



function Questions({ loading, questions, updateAnswer }) {
 

function clickAnswer(answer, currentQuestion, index) {

updateAnswer(answer, currentQuestion, index);

}


const allAnswers = questions.map((question, index) => (
  
  <div key={index} id="question">
    <h1>{question.question}</h1>
    <ul id="questions-list">
      {question.allAnswers.map((answer, i) => (
        <li  onClick={() => clickAnswer(answer, question.question, i)} key={i}>{answer}</li>
      ))}
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