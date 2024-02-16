import { ShuffleAnswersArray } from "./utils";

export type QuestionDetails = {
    category : string;
    correctAnswer : string;
    difficulty : string;
    incorrectAnswers : string[];
    question : string;
    type : string;
}

export type AllAnswers = QuestionDetails & {answers : string[]};

export enum Difficulty{
    EASY = 'easy',
    MEDIUM = 'medium',
    HARD = 'hard'
};

export const fetchQuestions = async (amount : number, difficulty : Difficulty) =>{
    const response = await fetch(`https://the-trivia-api.com/api/questions?limit=${amount}&difficulty=${difficulty}&type=multiple`);
    const data = await response.json();
    return data.map((question : QuestionDetails) => (
        {
        ...question,
        answers: ShuffleAnswersArray([...question.incorrectAnswers,question.correctAnswer])
        }
    ))
};