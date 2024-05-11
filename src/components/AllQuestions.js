import React, { useContext, useEffect, useState, useRef } from "react";
import questionContext from "../context/question/QuestionContext";
import { useNavigate } from "react-router-dom";

const AllQuestions = () => {
  let Navigate = useNavigate()

  const context = useContext(questionContext);
  const { question, getQuestions } = context;
  const [selectedOptions, setSelectedOptions] = useState({});
  const [showQuiz, setShowQuiz] = useState(false);
  var marks = 0
  var time=question.length*60
  const [timeout, setTimer] = useState(time)
  // var time = 3
  const handleChange = (e) => {
    const questionId = e.target.id;
    const optionValue = e.target.value;

    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [questionId]: optionValue, 
    }));
  };

  useEffect(() => {
    getQuestions();
  }, []);

  const calculateResult = (e) => {
    e.preventDefault();

    Object.keys(selectedOptions).forEach((key) => {
      let value = selectedOptions[key];
      let correctAns = question.find((q) => q._id === key).CorrectAns;
      if (value === correctAns) {
        marks++;
      }
    });

    Navigate('/result', { state: marks });
  };
  
    const Over = ()=>{
      // const timeout=time
      if(question.length>0){
        setTimeout(() => {
          ref.current.click()
          // console.log(typeof(timeout))
        }, timeout*500);
      }
    }
  
const ref = useRef(null)
  return (
    <>
      <h1>Questions for Quiz:</h1>
      {!showQuiz&&<button type="button" className="btn btn-primary" onClick={()=>{return (
        setShowQuiz(true), Over()
      )}}>Start Quiz</button>}
      {showQuiz&&<div className="container">
        <h3>Your Time to Solve this quiz is : {time/2} sec </h3>
        {question.length > 0 ? (
          question.map((question, index) => {
            if (question !== undefined) {
              return (
                <div className="container my-4 border border-secondary p-3" key={index}>
                  <p> <b>
                    Question {index + 1}: {question.Question}
                  </b>
                  </p>
                  {Object.values(question.Options).map((option, optionIndex) => (
                    <div className="form-check" key={optionIndex}>
                      <input
                        className="form-check-input"
                        type="radio"
                        value={option}
                        name={`question-${question._id}`}
                        id={question._id}
                        onChange={handleChange}
                      />
                      <label className="form-check-label" htmlFor={question._id}>
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              );
            }
            return null;
          })
        ) : (
          <p>No questions to solve!</p>
        )}
        {question.length > 0 && (
          <button type="button" className="btn btn-primary my-3" ref={ref} onClick={calculateResult}>Finish</button>
        )}
      </div>
}

    </>
  );
};

export default AllQuestions;
