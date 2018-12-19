import {Container} from 'unstated';
import IQuestion from '../entity/Question';
import { AnswerState } from '../screen/QuestionScreen/AnswerButton';
import IQuizService from '../services/IQuizService';
import sharedQuizService from '../services/QuizService';

export interface quizStoreInterface {
    questionList: IQuestion[],
    correctedAnswer: number,
    uncorrectedAnswer: number,
    selectedAnswer: Map<string, number>, //Array with id and selected answer
    currentQuestion: number,
    doingTimer: number
}

export default class QuizStore extends Container<quizStoreInterface>{
    _quizService: IQuizService = null;
    constructor(quizService?: IQuizService){
        super();

        if(quizService){
            this._quizService = quizService;
        } else {
            this._quizService = sharedQuizService;
        }

        this.state = {
            questionList: [],
            correctedAnswer: 0,
            uncorrectedAnswer: 0,
            selectedAnswer: new Map<string, number>(),
            currentQuestion: 0,
            doingTimer: 0
        }

    }

    async init() : Promise<void>{
        this.reset();
        await this.setState({
            questionList: this._quizService.getQuestion()
        });
    }

    async reset() : Promise<void>{
        await this.setState({
            questionList: [],
            correctedAnswer: 0,
            uncorrectedAnswer: 0,
            selectedAnswer:  new Map<string, number>(),
            currentQuestion: 0,
            doingTimer: 0
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

    setTimer(timer: number){
        this.setState({
            doingTimer: timer
        });
    }
}