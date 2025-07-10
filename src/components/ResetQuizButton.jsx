import React from 'react'

export default function ResetQuizButton({dispatch}) {
  return (
    <button className='btn' onClick={()=>dispatch({type : "reset"})}>Restart Quizz</button>
  )
}
