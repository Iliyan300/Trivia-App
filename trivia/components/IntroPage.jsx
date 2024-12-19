import ToggleNight from "./toggleNight"
import { useState } from "react";

function IntroPage({ setIsDisplayed, setIsNightToogled, isNightToogled }) {


return(
    
    <section className={`intro-section ${isNightToogled ? "night" : "day"}`}>
    <div className="toggle-night">
    <ToggleNight setIsNightToogled={setIsNightToogled} />
    </div>
    <div className="intro-page" >
        <h1 id="intro-title">Quizzical</h1>
        <p id="intro-info">Click on the start button to test your knowledge!</p>
        <button onClick={() => setIsDisplayed(prev => !prev)}>Start Quiz</button>
    </div>
    </section>
    
)

}

export default IntroPage