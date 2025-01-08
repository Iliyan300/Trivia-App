
function Skeleton({ isDarkToogled }) {



return(
   
   <div id="question">
        <ul className={`questions-list ${isDarkToogled ?  "darkSkeleton" : ""}`}>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        </div>
)

}


export default Skeleton