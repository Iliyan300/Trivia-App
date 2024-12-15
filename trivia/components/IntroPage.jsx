
function IntroPage({ setIsDisplayed }) {

return(
    <div className="intro-page">
        <h1>Quizzical</h1>
        <p>Some description here</p>
        <button onClick={() => setIsDisplayed(prev => !prev)}>Start Quiz</button>
    </div>
)

}

export default IntroPage