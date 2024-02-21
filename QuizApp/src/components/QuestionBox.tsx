// import React from "react";

type QuestionVars = {
    question : string;
    options : string[];
    userAnswer : any;
    questionNumber : number;
    totalQuestions : number;
    callback : any;
}

const QuestionBox : React.FC<QuestionVars> = ({question,options,userAnswer,questionNumber, callback, totalQuestions}) => 
(
    
    <div>
        <p>
            Question : {questionNumber} / {totalQuestions}
        </p>
        <p dangerouslySetInnerHTML={{__html : question}}/>
        <div >
            {options.map(answer => (
                <div key = {answer}>
                    <button disabled= {userAnswer} onClick={callback} value={answer}>
                        <span dangerouslySetInnerHTML={{__html :answer}}/>
                    </button>
                </div>
            ))}
        </div>
    </div>
    
);

export default QuestionBox;