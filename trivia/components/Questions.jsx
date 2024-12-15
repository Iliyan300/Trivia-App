
function Questions({ loading, questions, errorMessage }) {
    

    
    const allAnswers = [];
    for(let i = 0; i < questions.results.length; i++) {
        
        let question = questions.results[i].question;
        let correctAnswer = questions.results[i].correct_answer;
        let incorrect_answers = questions.results[i].incorrect_answers;
        allAnswers.push({question, correctAnswer, incorrect_answers})
        
    }

   
    
  const everyQandA = allAnswers.map((qa) => (
    
    <div id="question">
               <h2>{qa.question}</h2> 
               <ul id="questions-list">
                <li>{qa.correctAnswer}</li>
                <li>{qa.incorrect_answers[0]}</li>
                <li>{qa.incorrect_answers[1]}</li>
                <li>{qa.incorrect_answers[2]}</li>
               </ul>
               <div className="line-break"></div>
            </div>
  ) )
    

    return(
        <div className="questions-page">
            <h1>Questions</h1>
            {everyQandA}
        </div>
    )
}

export default Questions