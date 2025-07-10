export default function Progress({i, numQuestion , points , maxPossiblePoints , answer}) {
  return (
    <header className="progress">
        <progress max={numQuestion} value={i + Number(answer !== null)} />
        <p> Questions <strong>{i +  1}</strong>  / {numQuestion}</p>
        <p> Points <strong>{points}</strong> / {maxPossiblePoints} </p>
    </header>
  )
}
