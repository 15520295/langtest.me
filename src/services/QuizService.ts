import IQuizService from './IQuizService'
import IQuestion, { QuestionType } from '../entity/Question';
import { number } from 'prop-types';
import QuestionDataPart1 from '../data/QuestionDataPart1';
import QuestionDataPart2 from '../data/QuestionDataPart2';
import QuestionDataPart3 from '../data/QuestionDataPart3';
import QuestionDataPart4 from '../data/QuestionDataPart4';
import QuestionDataPart5 from '../data/QuestionDataPart5';
import QuestionDataPart7 from '../data/QuestionDataPart7';


//For this app, we assume that 

class QuizService implements IQuizService{
    _questionList : IQuestion[] = null;
    readonly _typePercent: number[] = [3, 12.5, 19.5, 15, 15, 8, 27];
    readonly _chanceOfHigher1Difficult: 30;
    readonly _chanceOfHigher2Difficult: 5;
    readonly _chanceOfHigher1Lower: 20;
    readonly _chanceOfHigher2Lower: 5;
    
    getQuestion(): IQuestion[] {
        return this._questionList;
    }    
    reset(): void {
        this._questionList = null;
    }
    //Calculator the number of question for each type by percent
    //Because of the rounding, the total number of question may not true, so we trim down or scale random type of question
    //Then scan for the number of question of each type, the number of difficult level may increase by one two but not over
    initQuickTest(numberOfQuestion: number = 20, difficultLevel: number): void {
        this.reset();

        let numberOfQuestionType: number[];
        for(let i = 0; i < 7; i++){
            numberOfQuestionType[i] = Math.floor(numberOfQuestion * this._typePercent[i])
        }

        let sum: number;
        while((sum = numberOfQuestionType.reduce((a, b) => a + b, 0)) !== numberOfQuestion){
            let randomType = Math.floor(Math.random() * 6);
            if(sum > numberOfQuestion){
                numberOfQuestionType[randomType] = numberOfQuestionType[randomType] - 1;
            } else {
                numberOfQuestionType[randomType] = numberOfQuestionType[randomType] + 1;
            }
        }

        //Let crawling the question
    }
    initTest(type: QuestionType, numberOfQuestion: number, difficultLevel: number): void {
        throw new Error("Method not implemented.");
    }

    private crawlingQuesion(type: QuestionType, numberOfQuestion: number, difficult: number): IQuestion[] {
        let questionList: IQuestion[];
        switch(type){
            case QuestionType.part1:
                questionList = QuestionDataPart1.slice();
                break;
            case QuestionType.part2:
                questionList = QuestionDataPart2.slice();
                break;
            case QuestionType.part3:
                questionList = QuestionDataPart3.slice();
                break;
            case QuestionType.part4:
                questionList = QuestionDataPart4.slice();
                break;
            case QuestionType.part5:
                questionList = QuestionDataPart5.slice();
                break;
            case QuestionType.part6:
                questionList = QuestionDataPart5.slice();
                break;
            case QuestionType.part7:
                questionList = QuestionDataPart7.slice();
                break;
        }
    }
}

export default new QuizService();