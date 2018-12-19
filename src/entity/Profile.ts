import { number } from "prop-types";

export default interface IProfile{
    name: String,
    avatar: number,  //Since require return integer soo
    correctAnswer : number,
    incorrectAnswer : number ,
    totalQuestion : number
    rank : number,
    timeSpent : number,
};