export default function NextButton({ dispatch, answer , numQuestions , index}) {
 if(index < numQuestions - 1)
 {
   return <>
    {answer != null && <button className='btn btn-ui' onClick={ ()=> dispatch({type : "nextQuestion"}) } >
      Next Question
    </button>}
  </>
}
 if(index === numQuestions - 1)
 {
   return <>
    {answer != null && <button className='btn btn-ui' onClick={ ()=> dispatch({type : "finished"}) } >
      Finish Quiz
    </button>}
  </>
}
 }
