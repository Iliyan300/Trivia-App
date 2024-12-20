

function IntroPage({ setIsDisplayed, setDarkMode, isDarkToogled }) {

    const isDarkTheme = {
        color: isDarkToogled ? "#fff" : "#293264",
    }
    
    const isDarkThemeBtns = {
        color: isDarkToogled ? "#fff" : "",
        backgroundColor: isDarkToogled ? "#a6b3ee96" : "",
    }
    

return(
    
    <section className="intro-section">
        <button style={isDarkThemeBtns} onClick={() => setDarkMode(prev => !prev)}> {isDarkToogled ? "Day" : "Night"} </button>
    <div className="intro-page" >
        <h1 id="intro-title" style={isDarkTheme} >Quizzical</h1>
        <p id="intro-info" style={isDarkTheme}>Click on the start button to test your knowledge!</p>
        <button style={isDarkThemeBtns} onClick={() => setIsDisplayed(prev => !prev)}>Start Quiz</button>
    </div>
    </section>
    
)

}

export default IntroPage