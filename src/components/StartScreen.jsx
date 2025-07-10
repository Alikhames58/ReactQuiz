import React from 'react';

export default function StartScreen({ numQuestions, dispatch }) {
  return (
    <div className="start-screen">
      <h2>🎯 Ready to test your React skills?</h2>
      <h3>📘 You'll face {numQuestions} carefully selected questions to truly challenge your knowledge.</h3>
      <button className="btn btn-ui" onClick={() => dispatch({ type: 'start' })}>
        Start the Challenge 💡
      </button>
    </div>
  );
}
