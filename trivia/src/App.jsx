import { useEffect, useState } from 'react'
import IntroPage from '../components/IntroPage'
import Questions from '../components/Questions'
import { fetchData } from './api'
import './App.css'

function App() {

const [isDisplayed, setIsDisplayed] = useState(false);
const [questions, setQuestions] = useState(null);
const [errorMessagge, setErrorMessage] = useState(null);
const [loading, setLoading] = useState(true);




useEffect(() => {

  fetchData("https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple")
  .then(data => setQuestions(data))
  .catch(error => setErrorMessage(error.message))
  .finally(() => setLoading(false));
 
},[])

  return (
    <>
      {isDisplayed ? <Questions loading={loading} errorMessagge={errorMessagge} questions={questions} /> : <IntroPage  setIsDisplayed={setIsDisplayed}/>}
    </>
  )
}

export default App
