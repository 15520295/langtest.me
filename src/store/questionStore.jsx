import {Container} from 'unstated';
import {QuestionData} from '../data/QuestionData';
export  default class questionStore extends Container{
    state = {
        questionList: QuestionData,
        correctAnswer: 0,
        incorrectAnswer: 0,
        currentAnswer: 0,
    }
}