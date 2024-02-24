// import React from "react";
import { Wrapper,ButtonWrapper } from "../styles/QuestionBox.styles.ts";
import { Answers } from "./App";
type QuestionVars = {
    question : string;
    options : string[];
    questionNumber : number;
    totalQuestions : number;
    callback : (e : React.MouseEvent<HTMLButtonElement>)=>void ;
    userAnswer : Answers | undefined;
}

const QuestionBox : React.FC<QuestionVars> = ({question,options,userAnswer,questionNumber, callback, totalQuestions}) => 
(
    
    <Wrapper>
        <p>
            Question : {questionNumber} / {totalQuestions}
        </p>
        <p dangerouslySetInnerHTML={{__html : question}}/>
        <div >
            {options.map(answer => (
                <ButtonWrapper key = {answer} correct = {userAnswer?.correctAnswer === answer} userClicked = {userAnswer?.answer === answer}>
                    <button disabled= {!!userAnswer} onClick={callback} value={answer}>
                        <span dangerouslySetInnerHTML={{__html :answer}}/>
                    </button>
                </ButtonWrapper>
            ))}
        </div>
    </Wrapper>
    
);

export default QuestionBox;