


function ToggleNight({ setIsNightToogled }) {

return( 
    
    <button  onClick={() => setIsNightToogled(prev => !prev)}  className="toggleBtn"> Day/Night </button> 
   
)


}

export default ToggleNight;