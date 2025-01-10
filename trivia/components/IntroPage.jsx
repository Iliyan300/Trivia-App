import { darkThemeIcon, dayThemeIcon } from "./darkThemeIcons.jsx"

function IntroPage({ setDarkMode, isDarkToogled, handlePlayGame }) {

    const isDarkTheme = {
        color: isDarkToogled ? "#fff" : "#293264",
    }
    
    const isDarkThemeBtns = {
        color: isDarkToogled ? "#fff" : "",
        backgroundColor: isDarkToogled ? "#a6b3ee96" : "",
    }



return(
    
    <section className="intro-section">
        <div className="dark-mode-btn"> 
        <button style={isDarkThemeBtns} onClick={() => setDarkMode(prev => !prev)}> {isDarkToogled ? dayThemeIcon : darkThemeIcon} </button>
        </div>
    <div className="intro-page" >
        <h1 id="intro-title" style={isDarkTheme} >Quizzical</h1>
        <p id="intro-info" style={isDarkTheme}>Click on the start button to test your knowledge!</p>
        <button id="start-btn" style={isDarkThemeBtns} onClick={() => handlePlayGame()}>Start Quiz</button>
        
    </div>
    </section>
    
)

}

export default IntroPage