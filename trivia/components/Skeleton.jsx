
function Skeleton({ isDarkToogled }) {



return(
   
   <div id="question">
      <h1 className="skeleton-text">...</h1>
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