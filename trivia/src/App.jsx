import { useEffect, useState } from 'react'
import IntroPage from '../components/IntroPage'
import Questions from '../components/Questions'
import { decodeHtmlEntities } from '../src/decodeHtml'
import { fetchData } from './api'
import './App.css'

function App() {

const [isDisplayed, setIsDisplayed] = useState(false);
const [questions, setQuestions] = useState(null);
const [errorMessage, setErrorMessage] = useState(null);
const [loading, setLoading] = useState(true);
const [questionsModified, setQuestionsModified] = useState([]);
const [isDarkToogled, setIsDarkToogled] = useState(false);




useEffect(() => {
  
 const fetchQuestions = async () => {

  try{
    setLoading(true);
    const data = await fetchData("https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple");
    setQuestions(data);
  } catch(error) {
    setErrorMessage(error.message);
  } finally {
    setLoading(false);
  }
 };

 const timeout = setTimeout(() => {

  fetchQuestions();

 }, 2000);

 return () => clearTimeout(timeout);


},[])

function shuffleAnswers(array) {

  const shuffled = [...array];
  for(let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled
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
      allAnswers: shuffleAnswers([correctAnswer, ...incorrectAnswers]), 
      selectedAnswer: "",
    };
    })
      
    setQuestionsModified(questions_answers)
  }

},[questions])


function updateAnswer(answer, currentQuestion) {

setQuestionsModified( prevState => 
prevState.map((questionObject) => {

 return questionObject.question === currentQuestion 
 ? {...questionObject, selectedAnswer: answer } 
 : questionObject

})
)





}


  return (
   
    <section className={`main-wrapper ${isDarkToogled ? "nightTheme" : "dayTheme"}`}>
      {isDisplayed 
      
      ? <Questions 
      loading={loading} 
      questions={questionsModified} 
      updateAnswer={updateAnswer} 
      isDarkToogled={isDarkToogled}
      setDarkMode={setIsDarkToogled}
      errorMessage={errorMessage}
      /> 
      
      : <IntroPage  
      isDarkToogled={isDarkToogled}
      setDarkMode={setIsDarkToogled}
      setIsDisplayed={setIsDisplayed} 
      />}
   </section>
  )
}

export default App
