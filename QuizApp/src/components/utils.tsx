export const ShuffleAnswersArray = (array : any[]) => 
[...array].sort(()=>Math.random() - 0.5);
