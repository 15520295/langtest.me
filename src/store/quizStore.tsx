import {Container} from 'unstated';
import Question from '../entity/Question';
import QuestionDataPart5 from '../data/QuestionDataPart5';

export interface quizStoreInterface {
    questionList: Question[],
    correctedAnswer: number,
    uncorrectedAnswer: number,
    selectedAnswer: Map<string, number>, //Array with id and selected answer
    currentQuestion: number
}

export interface currentQuestionInterface {
    question: Question,
    selectedAnswer?: number
}

export default class QuizStore extends Container<quizStoreInterface>{
    constructor(){
        super();
        this.state = {
            questionList: [],
            correctedAnswer: 0,
            uncorrectedAnswer: 0,
            selectedAnswer: new Map<string, number>(),
            currentQuestion: 0
        }
    }

    //TODO: Add order init method
    init() : void{
        this.reset();
        this.setState({
            questionList: QuestionDataPart5
        });
    }

    reset() : void{
        this.setState({
            questionList: [],
            correctedAnswer: 0,
            uncorrectedAnswer: 0,
            selectedAnswer:  new Map<string, number>(),
            currentQuestion: 0
        })
    }

    nextQuestion() : void{
        this.setState({
            currentQuestion: (this.state.currentQuestion + 1) % this.state.questionList.length
        })
    } 
    
    prevQuestion() : void{
        this.setState({
            currentQuestion: (this.state.currentQuestion + this.state.questionList.length - 1) % this.state.questionList.length
        })
    }

    answerQuestion(answer: number) : void{
        var currentQuestion = this.state.questionList[this.state.currentQuestion];
        var selectedAnswer : Map<string, number> = this.state.selectedAnswer;
        selectedAnswer.set(currentQuestion.id, answer);

        if(answer === currentQuestion.correctAnswer){
            this.setState({correctedAnswer: this.state.correctedAnswer + 1});
        }
        else
        {
            this.setState({uncorrectedAnswer: this.state.uncorrectedAnswer + 1});
        }
    }

    isOver() : boolean  {
        return this.state.questionList.length === this.state.selectedAnswer.size;
    }

    getCurrentQuestionInfo() : currentQuestionInterface {
        var info: currentQuestionInterface;
        info.question = this.state.questionList[this.state.currentQuestion];
        info.selectedAnswer = this.state.selectedAnswer.get(info.question.id);

        return info;
    }
}