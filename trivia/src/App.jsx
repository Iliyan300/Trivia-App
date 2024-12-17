import { useEffect, useState } from 'react'
import IntroPage from '../components/IntroPage'
import Questions from '../components/Questions'
import { decodeHtmlEntities } from '../src/decodeHtml'
import { fetchData } from './api'
import './App.css'

function App() {

const [isDisplayed, setIsDisplayed] = useState(false);
const [questions, setQuestions] = useState(null);
const [errorMessagge, setErrorMessage] = useState(null);
const [loading, setLoading] = useState(true);
const [questionsModified, setQuestionsModified] = useState([]);

useEffect(() => {
  
  fetchData("https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple")
  .then(data => setQuestions(data))
  .catch(error => setErrorMessage(error.message))
  .finally(() => setLoading(false))

},[])



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
      selectedAnswer: "",
    };
    })
      
    setQuestionsModified(questions_answers)
  }

},[questions])


function updateAnswer(answer, currentQuestion) {
  
setQuestionsModified(
questionsModified.map((questionObject) => {

 return questionObject.question === currentQuestion 
 ? {...questionObject, selectedAnswer: answer } 
 : questionObject

})
)


  
}


  return (
    <>
      {isDisplayed 
      
      ? <Questions 
      loading={loading} 
      questions={questionsModified} 
      updateAnswer={updateAnswer} /> 
      
      : <IntroPage  
      setIsDisplayed={setIsDisplayed}/>}
    </>
  )
}

export default App
