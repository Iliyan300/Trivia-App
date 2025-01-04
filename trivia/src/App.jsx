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
const [reloadKey, setReloadKey] = useState(0);
const [finalResult, setFinalResult] = useState(0);
const [isAllSelected, setIsAllSelected] = useState(false);
const [selectedAnswers, setSelectedAnswers] = useState({});

console.log(reloadKey)

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

 useEffect(() => {
  if(isDisplayed) {
    console.log("fetching activated")
  const timeout = setTimeout(() => {
   fetchQuestions();
}, 2000);
  
return () => clearTimeout(timeout);
  } else {
    console.log("fetching not activated")
  }
 },[reloadKey])



function handlePlayGame() {
  
  setIsDisplayed(prevState => !prevState);
  setReloadKey((prevState => prevState + 1));

}

function handleRestartGame() {
  setLoading(true);
  setFinalResult(0);
  setQuestionsModified([]);
  setIsAllSelected(false);
  setSelectedAnswers({});
  setReloadKey((prevState => prevState + 1));
}

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
      handleRestartGame={handleRestartGame}
      finalResult={finalResult}
      setFinalResult={setFinalResult}
      isAllSelected={isAllSelected}
      setIsAllSelected={setIsAllSelected}
      selectedAnswers={selectedAnswers}
      setSelectedAnswers={setSelectedAnswers}
      /> 
      
      : <IntroPage  
     handlePlayGame={handlePlayGame}
      isDarkToogled={isDarkToogled}
      setDarkMode={setIsDarkToogled}
      />}
   </section>
  )
}

export default App
