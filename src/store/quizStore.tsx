import {Container} from 'unstated';
import IQuestion from '../entity/Question';
import QuestionDataPart1 from '../data/QuestionDataPart1';
import QuestionDataPart2 from '../data/QuestionDataPart2';
import QuestionDataPart5 from '../data/QuestionDataPart5';
import QuestionDataPart4 from '../data/QuestionDataPart4';
import QuestionDataPart3 from '../data/QuestionDataPart3';
import QuestionDataPart7 from '../data/QuestionDataPart7';
import { AnswerState } from '../screen/QuestionScreen/AnswerButton';
import IQuizService from '../services/IQuizService';

export interface quizStoreInterface {
    questionList: IQuestion[],
    correctedAnswer: number,
    uncorrectedAnswer: number,
    selectedAnswer: Map<string, number>, //Array with id and selected answer
    currentQuestion: number
}

export default class QuizStore extends Container<quizStoreInterface>{
    _quizService: IQuizService = null;
    constructor(){
        super();
        this.state = {
            questionList: QuestionDataPart1.concat(QuestionDataPart2).concat(QuestionDataPart3).concat(QuestionDataPart4).concat(QuestionDataPart5).concat(QuestionDataPart7),
            correctedAnswer: 0,
            uncorrectedAnswer: 0,
            selectedAnswer: new Map<string, number>(),
            currentQuestion: 0
        }

    }

    //TODO: Add order init method
    async init() : Promise<void>{
        this.reset();
        await this.setState({
            questionList: QuestionDataPart1
        });
    }

    async reset() : Promise<void>{
        await this.setState({
            questionList: [],
            correctedAnswer: 0,
            uncorrectedAnswer: 0,
            selectedAnswer:  new Map<string, number>(),
            currentQuestion: 0
        })
    }

    async nextQuestion() : Promise<void>{
        await this.setState({
            currentQuestion: (this.state.currentQuestion + 1) % this.state.questionList.length
        })
    } 
    
    async prevQuestion() : Promise<void>{
        await this.setState({
            currentQuestion: (this.state.currentQuestion + this.state.questionList.length - 1) % this.state.questionList.length
        })
    }

    answerQuestion(answer: number) : boolean{
        if(this.isCurrentQuestionAnswered()){
            return false;
        }
        var currentQuestion = this.state.questionList[this.state.currentQuestion];
        var selectedAnswer : Map<string, number> = this.state.selectedAnswer;
        selectedAnswer.set(currentQuestion.id, answer);

        if(answer === currentQuestion.correctAnswer){
            this.setState({correctedAnswer: this.state.correctedAnswer + 1});
            return true;
        }
        else
        {
            this.setState({uncorrectedAnswer: this.state.uncorrectedAnswer + 1});
            return false;
        }
    }

    isOver() : boolean  {
        return this.state.questionList.length === this.state.selectedAnswer.size;
    }

    getCurrentQuestionInfo() : IQuestion {
        return this.state.questionList[this.state.currentQuestion];
    }

    getCurrentQuestionNumber(): number {
        return this.state.currentQuestion;
    }

    getTotalQuestionNumber(): number {
        return this.state.questionList.length;
    }

    isCurrentQuestionAnswered() : boolean {
        return this.state.selectedAnswer.has(this.getCurrentQuestionInfo().id);
    }

    getCurrentAnswerState(): AnswerState[] {
        var answerState: AnswerState[] = [AnswerState.normal, AnswerState.normal, AnswerState.normal, AnswerState.normal]
        var question: IQuestion = this.getCurrentQuestionInfo();
        if(this.isCurrentQuestionAnswered()){
            answerState[this.state.selectedAnswer.get(question.id)] = AnswerState.uncorrected;
            answerState[question.correctAnswer] = AnswerState.corrected;
        }

        return answerState;
    }
}