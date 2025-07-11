import './App.css'
import MainContent from './components/MainContent'
import Header from './components/Header';
import Error from './components/Error';
import Loader from './components/Loader';
import StartScreen from './components/StartScreen';
import Questions from './components/Questions';
import {useEffect, useReducer } from 'react';
import axios from 'axios';
import NextButton from './components/NextButton';
import Progress from './Progress';
import FinishScreen from './components/FinishScreen';
import Footer from './components/Footer';
import Timer from './components/Timer';
const initialState ={
  questions : [],
  status : "loading",
  index : 0,
  answer : null,
  points : 0,
  highscore : 0,
  secondsRemaining : null
}
const SEC_PER_QUESTION = 30;
function reducer(state,action){
  switch(action.type){
    case "dataRecived":
      return {
        ...state , questions : action.payload , status : "ready"
      }
      case "dataFailed":
        return {
          ...state , status : "error"
        }
      case "start":
        return {
          ...state , status :"active", secondsRemaining : state.questions.length * SEC_PER_QUESTION
        }
      case "newAnswer":
        const question = state.questions.at(state.index)
        return {
          ...state , answer : action.payload , points : action.payload === question.correctOption ? state.points + question.points : state.points
        }
      case "nextQuestion":
        return {
          ...state , index : state.index + 1 , answer : null
        }
        case "finished" :
          return {
            ...state , status : "finished" , highscore : state.points > state.highscore ? state.points : state.highscore
          }
        case "reset":
          return {
            ...state , status : "ready" , index : 0 , answer : null , points : 0,  secondsRemaining : 5 , highscore : state.highscore 
          }
      case "tick": {
      const isFinished = state.secondsRemaining === 1;
      const newHighscore = state.points > state.highscore ? state.points : state.highscore;

      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: isFinished ? "finished" : state.status,
        highscore: isFinished ? newHighscore : state.highscore
      };
}
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer , initialState)
  const {questions , status , index , answer , points , highscore , secondsRemaining} = state
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((prev , curr) => prev + curr.points , 0)
useEffect(()=>{
  async function fetchData(){
    try {
      const res = await axios.get(`${import.meta.env.BASE_URL}questions.json`)
      const data = await res.data
      dispatch({type:"dataRecived", payload : data})
      console.log("Fetched questions: ", data)
      
    } catch (error) {
      dispatch({type : "dataFailed"})
    }
  }
  fetchData()
},[])

  return (
    <div className="app">
    <Header/>
    <MainContent>
     {status === "loading" && <Loader/> }
     {status === "error" && <Error/>}
     {status === "ready" && <StartScreen numQuestions={numQuestions} dispatch = {dispatch}/>}
     {status === "active" &&<>
     <Progress i = {index} numQuestion = {numQuestions} points =  {points}  maxPossiblePoints = {maxPossiblePoints}  answer={answer}/>
      <Questions  question = {questions[index]} dispatch = {dispatch} answer ={answer}  /> 
     <Footer >
       <Timer secondsRemaining = {secondsRemaining} dispatch={dispatch} />
       <NextButton dispatch = {dispatch}  answer = {answer} numQuestions={numQuestions} index={index} />
     </Footer>
      </>
     }
     {status === "finished" && <FinishScreen  maxPossiblePoints={maxPossiblePoints} points={points} highscore = {highscore}  dispatch = {dispatch} /> }
    </MainContent>
    </div>
  )
}

export default App
