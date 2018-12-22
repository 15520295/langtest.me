import IQuizService from './IQuizService'
import IQuestion, { QuestionType } from '../entity/Question';
import QuestionDataPart1 from '../data/QuestionDataPart1';
import QuestionDataPart2 from '../data/QuestionDataPart2';
import QuestionDataPart3 from '../data/QuestionDataPart3';
import QuestionDataPart4 from '../data/QuestionDataPart4';
import QuestionDataPart5 from '../data/QuestionDataPart5';
import QuestionDataPart7 from '../data/QuestionDataPart7';
import QuestionDataPart6 from '../data/QuestionDataPart6';


//For this app, we assume that 

class QuizService implements IQuizService{
    _questionList : IQuestion[] = null;
    _srcQuestionList: IQuestion[] = null;
    _lastMode: number = 0;
    _lastDifficult: number = 0;
    _lastTimer: number = 0;
    _lastNumberOfQuestion: number = 0;

    readonly _typePercent: number[] = [3, 12.5, 19.5, 15, 15, 8, 27];
    readonly _chanceOfHigher1Difficult:  number = 30;
    readonly _chanceOfHigher2Difficult: number = 5;
    readonly _chanceOfHigher1Lower: number = 20;
    readonly _chanceOfHigher2Lower: number = 5;
    readonly _dataQuestion  : IQuestion[][] = [
        QuestionDataPart1.slice(),
        QuestionDataPart2.slice(),
        QuestionDataPart3.slice(),
        QuestionDataPart4.slice(),
        QuestionDataPart5.slice(),
        QuestionDataPart6.slice(),
        QuestionDataPart7.slice()
    ];

    getQuestion(): IQuestion[] {
        return this._questionList;
    }    
    reset(): void {
        this._questionList = null;
    }
    //Calculator the number of question for each type by percent
    //Because of the rounding, the total number of question may not true, so we trim down or scale random type of question
    //Then scan for the number of question of each type, the number of difficult level may increase by one two but not over
    async initQuickTest(numberOfQuestion: number = 5, difficultLevel: number = 3, timer: number): Promise<void> {
        this._lastTimer = timer;
        this._lastMode = 0;
        this._lastDifficult = difficultLevel;
        this._lastNumberOfQuestion = numberOfQuestion;

        this.reset();

        var numberOfQuestionType: Array<number> = new Array();
        for(let i = 0; i < 7; i++){
            numberOfQuestionType.push(Math.ceil(numberOfQuestion * this._typePercent[i] / 100));
        }

        //Let crawling the question
        var questionListPart : IQuestion[][] = new Array();
        questionListPart[0] = this.crawlingQuestion(QuestionType.part1, numberOfQuestionType[0], difficultLevel);
        questionListPart[1] = this.crawlingQuestion(QuestionType.part2, numberOfQuestionType[1], difficultLevel);
        questionListPart[2] = this.crawlingQuestion(QuestionType.part3, numberOfQuestionType[2], difficultLevel);
        questionListPart[3] = this.crawlingQuestion(QuestionType.part4, numberOfQuestionType[3], difficultLevel);
        questionListPart[4] = this.crawlingQuestion(QuestionType.part5, numberOfQuestionType[4], difficultLevel);
        questionListPart[5] = this.crawlingQuestion(QuestionType.part6, numberOfQuestionType[5], difficultLevel);
        questionListPart[6] = this.crawlingQuestion(QuestionType.part7, numberOfQuestionType[6], difficultLevel);

        //Let trim the question so that it can fix the number of question
        const sumQuestion = function(questionList: IQuestion[][]) : number{
            let sum : number = 0;
            for(let i = 0; i < questionList.length; i++){
                sum += questionList[i].length
            }
            return sum;
        }
        var sum: number = sumQuestion(questionListPart);
        if(sum > numberOfQuestion){
            while(sum > numberOfQuestion){
                let randomType = Math.floor(Math.random() * 6);
                questionListPart[randomType].pop();
                sum = sumQuestion(questionListPart);
            }
        } else {
            //just add part5 cause it easy to do 
            // let i = 0
            // let questionList: IQuestion[] = this._dataQuestion[4];
            // while(sum < numberOfQuestion){
            //     questionListPart[4].push(questionList[i]);
            //     i++;
            //     sum = sumQuestion(questionListPart);
            // }
        }


        //So concat the question and return them
        var resQuestionList : IQuestion[] = new Array();
        for(let i = 0; i < 7; i++){
            resQuestionList =  resQuestionList.concat(questionListPart[i]);
        }

        this._questionList = resQuestionList;
    }
    async initTest(type: QuestionType, numberOfQuestion: number, difficultLevel: number, timer: number): Promise<void> {
        this._lastTimer = timer;
        switch(type){
            case QuestionType.part1: 
                this._lastMode = 1;
                break;
            case QuestionType.part2: 
                this._lastMode = 2;
                break;
            case QuestionType.part3: 
                this._lastMode = 3;
                break;
            case QuestionType.part4: 
                this._lastMode = 4;
                break;
            case QuestionType.part5: 
                this._lastMode = 5;
                break;
            case QuestionType.part6: 
                this._lastMode = 6;
                break;
            case QuestionType.part7: 
                this._lastMode = 7;
                break;
        }
        this._lastDifficult = difficultLevel;
        this._lastNumberOfQuestion = numberOfQuestion;

        //Let crawling the question
        var resQuestionList : IQuestion[] = this.crawlingQuestion(type, numberOfQuestion, difficultLevel);


        //Let trim the question so that it can fix the number of question
        if(resQuestionList.length > numberOfQuestion){
            while(resQuestionList.length > numberOfQuestion){
                resQuestionList.pop();
            }
        } else {
            //just add part5 cause it easy to do 

        }

        this._questionList = resQuestionList;
    }

    initLastTest(): Promise<void> {
        switch(this._lastMode){
            case 0:
                return this.initQuickTest(this._lastNumberOfQuestion, this._lastDifficult, this._lastTimer);
            case 1:
                return this.initTest(QuestionType.part1 ,this._lastNumberOfQuestion, this._lastDifficult, this._lastTimer);
            case 2:
                return this.initTest(QuestionType.part2 ,this._lastNumberOfQuestion, this._lastDifficult, this._lastTimer);
            case 3:
                return this.initTest(QuestionType.part3 ,this._lastNumberOfQuestion, this._lastDifficult, this._lastTimer);
            case 4:
                return this.initTest(QuestionType.part4 ,this._lastNumberOfQuestion, this._lastDifficult, this._lastTimer);
            case 5:
                return this.initTest(QuestionType.part5 ,this._lastNumberOfQuestion, this._lastDifficult, this._lastTimer);
            case 6:
                return this.initTest(QuestionType.part6 ,this._lastNumberOfQuestion, this._lastDifficult, this._lastTimer);
            case 7:
                return this.initTest(QuestionType.part7 ,this._lastNumberOfQuestion, this._lastDifficult, this._lastTimer);
        }
        return new Promise<void>(null);
    }

    getMode(): number {
        return this._lastMode;
    }


    private crawlingQuestion(type: QuestionType, numberOfQuestion: number, difficult: number): IQuestion[] {
        switch(type){
            case QuestionType.part1:
                this._srcQuestionList = this._dataQuestion[0];
                break;
            case QuestionType.part2:
                this._srcQuestionList = this._dataQuestion[1];
                break;
            case QuestionType.part3:
                this._srcQuestionList = this._dataQuestion[2];
                break;
            case QuestionType.part4:
                this._srcQuestionList = this._dataQuestion[3];
                break;
            case QuestionType.part5:
                this._srcQuestionList = this._dataQuestion[4];
                break;
            case QuestionType.part6:
                this._srcQuestionList = this._dataQuestion[5];
                break;
            case QuestionType.part7:
                this._srcQuestionList = this._dataQuestion[6];
                break;
        }

        var resQuestionList : IQuestion[] = new Array();
        //Suffer question 
        this._srcQuestionList = this.shuffle(this._srcQuestionList);
        //Loop throught question until enough
        for(let i = 0; i < this._srcQuestionList.length; i++){
            const question = this._srcQuestionList[i];
            if(question === null || question.difficultLevel === null){
                this.addQuestionToArray(resQuestionList, question);
                continue;
            }
            let difficultDifferent: number = question.difficultLevel - difficult;
            switch(difficultDifferent){
                case 2:
                    if(Math.random() * 100 < this._chanceOfHigher2Difficult){
                        this.addQuestionToArray(resQuestionList, question);
                    }
                    break;
                case 1:
                    if(Math.random() * 100 < this._chanceOfHigher2Difficult){
                        this.addQuestionToArray(resQuestionList, question);
                    }
                    break;
                case 0:
                    this.addQuestionToArray(resQuestionList, question);
                case -1:
                    if(Math.random() * 100 < this._chanceOfHigher2Difficult){
                        this.addQuestionToArray(resQuestionList, question);
                    }
                    break;
                case -2:
                    if(Math.random() * 100 < this._chanceOfHigher2Difficult){
                        this.addQuestionToArray(resQuestionList, question);
                    }
                break;
            }

            if(resQuestionList.length >= numberOfQuestion){
                break;
            }
        }
        return resQuestionList;
    }

    async initTestVocabulary(questions: IQuestion[]): Promise<void> {
        this._questionList = questions;
    }

    //Since some question may come together, it better to take all of them to
    private addQuestionToArray(questionList: IQuestion[], question: IQuestion){
        if(this.contain(questionList, question.id)){
            return;
        }

        if(question.comeWith){
            question.comeWith.forEach((id, _) => {
                if(!this.contain(questionList, id)){
                    const questionToAdd : IQuestion = this._srcQuestionList.find((value, _, __) => value && value.id === id);
                    if (questionToAdd){
                        questionList.push(questionToAdd);
                    }
                }
            })
        } else {
            questionList.push(question);            
        }
    }

    private contain(questionList: IQuestion[], question_id: string) : boolean {
            //Check whether we already have the question in the question List yet !
            for(var i = 0; i < questionList.length; i++) {
                if (questionList[i].id === question_id) {
                    return true;
                }
            }
            return false;
    }

    private shuffle(a : IQuestion[]) : IQuestion[] {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }
}

const sharedQuizService = new QuizService();
export default sharedQuizService;