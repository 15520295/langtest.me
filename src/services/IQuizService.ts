import IQuestion, { QuestionType } from "../entity/Question";

export default interface IQuizService{
    getQuestion(): IQuestion[],
    reset(): void,
    initQuickTest(numberOfQuestion: number, difficultLevel: number, timer: number): Promise<void>,
    initTest(type: QuestionType, numberOfQuestion: number, difficultLevel: number, timer: number): Promise<void>
    initLastTest(): Promise<void>,
    getMode(): number
    initTestVocabulary(questions: IQuestion[]): Promise<void>
}