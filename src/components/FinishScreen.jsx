export default function FinishScreen({points, maxPossiblePoints , highscore , dispatch}) {
    const percentage = (points / maxPossiblePoints) * 100
    let emoji 
   let title;
if (percentage === 100) {
  emoji = "🥳";
  title = "Perfect Score!";
} else if (percentage >= 80) {
  emoji = "😎";
  title = "Awesome Job!";
} else if (percentage >= 50) {
  emoji = "🙂";
  title = "Nice Try!";
} else {
  emoji = "😢";
  title = "Keep Practicing!";
}

  return (
      <>
    <div className="result-card">
  <h2>{emoji} {title}</h2>
  <p>
    You scored <strong>{points}</strong> out of <strong>{maxPossiblePoints}</strong> (
    {Math.ceil(percentage)}%)
  </p>
  <p className="hightscore">(Hightscore : {highscore} Points)</p>
  <button className="btn" onClick={()=> dispatch({type: "reset"})}>Restart Quizz</button>
</div>
</>
  )
}
