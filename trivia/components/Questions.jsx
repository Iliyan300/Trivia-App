import { useState, useEffect } from 'react'
import { decodeHtmlEntities } from '../src/decodeHtml'


function Questions({ loading, questions, errorMessage }) {
    
const [QandA, setQandA] = useState([]);
const [result, setResult] = useState(0);
const [selectedAnswer, setSelectedAnswer] = useState(null);



function markAnswer(index) {

  setSelectedAnswer(index);
  
}



    
  useEffect(() => {

    if(questions?.results?.length > 0) {

      const questions_answers = questions.results.map((question) => {
      const correctAnswer = decodeHtmlEntities(question.correct_answer);
        const incorrectAnswers = question.incorrect_answers.map((ans) => decodeHtmlEntities(ans))
      
        return { 
        question: decodeHtmlEntities(question.question), 
        correctAnswer: correctAnswer,
        incorrectAnswers: incorrectAnswers,
        allAnswers: [correctAnswer, ...incorrectAnswers], 
        
      };
      })
        
    setQandA(questions_answers)
    }

  },[questions])

    

    return(
      <>
     
        { loading
        ? <h2> Loading...</h2>
        : <div className="questions-page">
      { QandA.map((qa, index) => (
        <div key={index} id="question">
          <h1>{qa.question}</h1>
          <ul id="questions-list">
           
            {qa.allAnswers.map((answer, i) => (
              <li  onClick={() => markAnswer(i)} key={i}>{answer}</li>
            ))}
          </ul>
          <div className="line-break"></div>
        </div>
      )) }
      <footer className='footer-section'>
      <p className='result'> You scored {result} / 5 correct answers</p>
      <button>Check answers</button>
      </footer>
    </div> }
    </>

    )
}

export default Questions